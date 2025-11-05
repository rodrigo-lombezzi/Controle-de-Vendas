using ControleVenda.Data.Interfaces;
using ControleVenda.Objects.Models;
using LumenSys.WebAPI.Data.Repositories;

namespace ControleVenda.Data.Repositories
{
    public class Vendaepository : GenericRepository<Venda>, IVendaRepository
    {
        private readonly AppDBContext _context;

        public VendaRepository(AppDBContext context) : base(context)
        {
            _context = context;
        }
    }
}