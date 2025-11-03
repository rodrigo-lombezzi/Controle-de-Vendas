using ControleVenda.WebAPI.Data.Interfaces;
using ControleVenda.WebAPI.Objects.Models;

namespace ControleVenda.Data.Repositories
{
    public class ParcelaRepository : GenericRepository<Parcela>, IParcelaRepository
    {
        private readonly AppDbContext _context;

        public ParcelaRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }
    }
}