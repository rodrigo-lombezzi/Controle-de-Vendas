using AutoMapper;
using ControleVenda.Data.Interfaces;
using ControleVenda.Objects.DTOs.Entities;
using ControleVenda.Objects.Models;
using ControleVenda.Services.Interfaces;

namespace ControleVenda.Services.Entities
{
    public class ParcelaService : GenericService<Parcela, ParcelaDTO>, IParcelaService
    {
        private readonly IParcelaRepository _parcelaRepository;
        private readonly IMapper _mapper;

        public ParcelaService(IParcelaRepository repository, IMapper mapper) : base(repository, mapper)
        {
            _parcelaRepository = repository;
            _mapper = mapper;
        }

        public override async Task<ParcelaDTO> GetById(int id)
        {
            var parcela = await _parcelaRepository.GetById(id);
            if (parcela == null)
                throw new ArgumentNullException($"Parcela com o ID {id} não foi encontrada.");

            return _mapper.Map<ParcelaDTO>(parcela);
        }

        public override async Task Create(ParcelaDTO parcelaDto)
        {
            if (parcelaDto == null)
                throw new ArgumentNullException("Parcela não pode ser nula.");

            if (parcelaDto.ValorTotal <= 0)
                throw new ArgumentException("O valor total da parcela deve ser maior que zero.");

            if (parcelaDto.DataVencimento == default)
                throw new ArgumentException("A data de vencimento é obrigatória.");

            await base.Create(parcelaDto);
        }

        public override async Task Update(ParcelaDTO parcelaDto, int id)
        {
            if (parcelaDto == null)
                throw new ArgumentNullException("Parcela não pode ser nula.");

            if (parcelaDto.Id != id)
                throw new ArgumentException("O ID da parcela deve corresponder ao ID informado.");

            if (parcelaDto.ValorTotal <= 0)
                throw new ArgumentException("O valor total da parcela deve ser maior que zero.");

            if (parcelaDto.DataVencimento == default)
                throw new ArgumentException("A data de vencimento é obrigatória.");

            await base.Update(parcelaDto, id);
        }

        public override async Task Delete(int id)
        {
            var parcela = await _parcelaRepository.GetById(id);
            if (parcela == null)
                throw new ArgumentNullException($"Parcela com o ID {id} não foi encontrada.");

            await base.Delete(id);
        }
    }
}