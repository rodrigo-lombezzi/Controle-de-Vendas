using ControleVenda.Data.Interfaces;
using ControleVenda.Objects.Models;
using LumenSys.WebAPI.Data.Repositories;

namespace ControleVenda.Data.Repositories
{
    public class ParcelaRepository : GenericRepository<Parcela>, IParcelaRepository
    {
        private readonly AppDBContext _context;

        public ParcelaRepository(AppDBContext context) : base(context)
        {
            _context = context;
        }
    }
}