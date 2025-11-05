using AutoMapper;
using ControleVenda.Data.Interfaces;
using ControleVenda.Objects.DTOs.Entities;
using ControleVenda.Objects.Models;
using ControleVenda.Services.Entities;
using ControleVenda.Services.Interfaces;

public class ItemVendaService : GenericService<ItemVenda, ItemVendaDTO>, IItemVendaService
{
    private readonly IItemVendaRepository _itemVendaRepository;
    private readonly IProdutoRepository _produtoRepository;
    private readonly IMapper _mapper;

    public ItemVendaService(IItemVendaRepository itemRepo, IProdutoRepository produtoRepo, IMapper mapper)
        : base(itemRepo, mapper)
    {
        _itemVendaRepository = itemRepo;
        _produtoRepository = produtoRepo;
        _mapper = mapper;
    }

    public override async Task Create(ItemVendaDTO itemDto)
    {
        if (itemDto == null)
            throw new ArgumentNullException("ItemVenda não pode ser nulo.");

        if (itemDto.QtdProduto <= 0)
            throw new ArgumentException("A quantidade do produto deve ser maior que zero.");

        var produto = await _produtoRepository.GetById(itemDto.ProdutoId);
        if (produto == null)
            throw new ArgumentException("Produto não encontrado.");

        itemDto.SubTotal = itemDto.QtdProduto * produto.ValorUnitario;

        await base.Create(itemDto);
    }

    public override async Task Update(ItemVendaDTO itemDto, int id)
    {
        if (itemDto == null)
            throw new ArgumentNullException("ItemVenda não pode ser nulo.");

        if (itemDto.Id != id)
            throw new ArgumentException("O ID do item deve corresponder ao ID informado.");

        if (itemDto.QtdProduto <= 0)
            throw new ArgumentException("A quantidade do produto deve ser maior que zero.");

        var produto = await _produtoRepository.GetById(itemDto.ProdutoId);
        if (produto == null)
            throw new ArgumentException("Produto não encontrado.");

        itemDto.SubTotal = itemDto.QtdProduto * produto.ValorUnitario;

        await base.Update(itemDto, id);
    }

    public override async Task Delete(int id)
    {
        var item = await _itemVendaRepository.GetById(id);
        if (item == null)
            throw new ArgumentNullException($"ItemVenda com o ID {id} não foi encontrado.");

        await base.Delete(id);
    }

    public override async Task<ItemVendaDTO> GetById(int id)
    {
        var item = await _itemVendaRepository.GetById(id);
        if (item == null)
            throw new ArgumentNullException($"ItemVenda com o ID {id} não foi encontrado.");

        return _mapper.Map<ItemVendaDTO>(item);
    }
}