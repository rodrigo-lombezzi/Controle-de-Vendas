using AutoMapper;
using ControleVenda.Data.Interfaces;
using ControleVenda.Objects.DTOs.Entities;
using ControleVenda.Objects.Models;
using ControleVenda.Services.Interfaces;
using ControleVenda.Services.Utils;

namespace ControleVenda.Services.Entities
{
    public class ProdutoService : GenericService<Produto, ProdutoDTO>, IProdutoService
    {
        private readonly IProdutoRepository _produtoRepository;
        private readonly IMapper _mapper;

        public ProdutoService(IProdutoRepository repository, IMapper mapper) : base(repository, mapper)
        {
            _produtoRepository = repository;
            _mapper = mapper;
        }

        public override async Task<ProdutoDTO> GetById(int id)
        {
            var produto = await _produtoRepository.GetById(id);
            if (produto == null)
                throw new ArgumentNullException($"Produto com o ID {id} não foi encontrado.");

            return _mapper.Map<ProdutoDTO>(produto);
        }

        public override async Task Create(ProdutoDTO produtoDto)
        {
            if (produtoDto == null)
                throw new ArgumentNullException("Produto não pode ser nulo.");

            if (await CheckDuplicate(p => p.Nome, produtoDto.Nome, 0))
                throw new InvalidOperationException("Já existe um produto com esse nome.");

            await base.Create(produtoDto);
        }

        public override async Task Update(ProdutoDTO produtoDto, int id)
        {
            if (produtoDto == null)
                throw new ArgumentNullException("Produto não pode ser nulo.");

            if (produtoDto.Id != id)
                throw new ArgumentException("O ID do produto deve corresponder ao ID informado.");

            if (await CheckDuplicate(p => p.Nome, produtoDto.Nome, id))
                throw new InvalidOperationException("Já existe um produto com esse nome.");

            await base.Update(produtoDto, id);
        }

        public override async Task Delete(int id)
        {
            var produto = await _produtoRepository.GetById(id);
            if (produto == null)
                throw new ArgumentNullException($"Produto com o ID {id} não foi encontrado.");

            await base.Delete(id);
        }

        private async Task<bool> CheckDuplicate(Func<Produto, string?> selector, string? valor, int idIgnorar)
        {
            var produtos = await _produtoRepository.Get();
            return produtos.Any(p =>
                p.Id != idIgnorar &&
                !string.IsNullOrWhiteSpace(selector(p)) &&
                StringUtils.CompareString(selector(p)!, valor)
            );
        }
    }
}