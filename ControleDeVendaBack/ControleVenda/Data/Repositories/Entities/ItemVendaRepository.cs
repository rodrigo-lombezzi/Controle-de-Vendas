using ControleVenda.WebAPI.Data.Interfaces;
using ControleVenda.WebAPI.Objects.Models;

namespace ControleVenda.Data.Repositories
{
    public class ItemVendaRepository : GenericRepository<ItemVenda>, IItemVendaRepository
    {
        private readonly AppDbContext _context;

        public ItemVendaRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }
    }
}