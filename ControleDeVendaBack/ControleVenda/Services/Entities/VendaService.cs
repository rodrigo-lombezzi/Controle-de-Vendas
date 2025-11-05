using AutoMapper;
using ControleVenda.Data.Interfaces;
using ControleVenda.Objects.DTOs.Entities;
using ControleVenda.Objects.Models;
using ControleVenda.Services.Entities;
using ControleVenda.Services.Interfaces;
using ControleVenda.WebAPI.Objects.Enums;

public class VendaService : GenericService<Venda, VendaDTO>, IVendaService
{
    private readonly IVendaRepository _vendaRepository;
    private readonly IProdutoRepository _produtoRepository;
    private readonly IMapper _mapper;

    public VendaService(IVendaRepository vendaRepo, IProdutoRepository produtoRepo, IMapper mapper)
        : base(vendaRepo, mapper)
    {
        _vendaRepository = vendaRepo;
        _produtoRepository = produtoRepo;
        _mapper = mapper;
    }

    public override async Task Create(VendaDTO vendaDto)
    {
        if (vendaDto == null)
            throw new ArgumentNullException("Venda não pode ser nula.");

        if (vendaDto.DataHora == default)
            throw new ArgumentException("A data e hora da venda são obrigatórias.");

        double valorTotal = 0;

        foreach (var itemDto in vendaDto.ItensVenda)
        {
            var produto = await _produtoRepository.GetById(itemDto.ProdutoId);
            if (produto == null)
                throw new ArgumentException($"Produto com ID {itemDto.ProdutoId} não encontrado.");

            if (produto.Quantidade < itemDto.QtdProduto)
                throw new InvalidOperationException($"Estoque insuficiente para o produto {produto.Nome}.");

            itemDto.SubTotal = itemDto.QtdProduto * produto.ValorUnitario;
            valorTotal += itemDto.SubTotal;

            produto.Quantidade -= itemDto.QtdProduto;
            await _produtoRepository.Update(produto);
        }

        vendaDto.ValorTotal = valorTotal;
        vendaDto.Status = StatusVenda.FINALIZADO;

        await base.Create(vendaDto);
    }

    public override async Task Delete(int id)
    {
        var venda = await _vendaRepository.GetById(id);
        if (venda == null)
            throw new ArgumentNullException($"Venda com o ID {id} não foi encontrada.");

        foreach (var item in venda.ItensVenda)
        {
            var produto = await _produtoRepository.GetById(item.ProdutoId);
            if (produto != null)
            {
                produto.Quantidade += item.QtdProduto;
                await _produtoRepository.Update(produto);
            }
        }

        await base.Delete(id);
    }

    public async Task CancelarVenda(int id)
    {
        var venda = await _vendaRepository.GetById(id);
        if (venda == null)
            throw new ArgumentNullException($"Venda com o ID {id} não foi encontrada.");

        if (venda.Status == StatusVenda.CANCELADO)
            throw new InvalidOperationException("Venda já está cancelada.");

        foreach (var item in venda.ItensVenda)
        {
            var produto = await _produtoRepository.GetById(item.ProdutoId);
            if (produto != null)
            {
                produto.Quantidade += item.QtdProduto;
                await _produtoRepository.Update(produto);
            }
        }

        venda.Status = StatusVenda.CANCELADO;
        await _vendaRepository.Update(venda);
    }

    public override async Task<VendaDTO> GetById(int id)
    {
        var venda = await _vendaRepository.GetById(id);
        if (venda == null)
            throw new ArgumentNullException($"Venda com o ID {id} não foi encontrada.");

        return _mapper.Map<VendaDTO>(venda);
    }
}