using ControleVenda.Data.Interfaces;
using ControleVenda.Objects.Models;
using LumenSys.WebAPI.Data.Repositories;

namespace ControleVenda.Data.Repositories
{
    public class ItemVendaRepository : GenericRepository<ItemVenda>, IItemVendaRepository
    {
        private readonly AppDBContext _context;

        public ItemVendaRepository(AppDBContext context) : base(context)
        {
            _context = context;
        }
    }
}