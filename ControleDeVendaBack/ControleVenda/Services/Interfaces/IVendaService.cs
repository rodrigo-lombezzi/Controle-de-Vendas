using ControleVenda.Objects.DTOs.Entities;
using ControleVenda.Objects.Models;
using ControleVenda.Services.Entities;

namespace ControleVenda.Services.Interfaces
{
    public interface IVendaService : IGenericService<Venda, VendaDTO>
    {
        Task CancelarVenda(int id);

    }
}