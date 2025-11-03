using ControleVenda.WebAPI.Data.Interfaces;
using ControleVenda.WebAPI.Objects.Models;

namespace ControleVenda.Data.Repositories
{
    public class Vendaepository : GenericRepository<Venda>, IVendaRepository
    {
        private readonly AppDbContext _context;

        public VendaRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }
    }
}