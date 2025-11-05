using ControleVenda.Data.Interfaces;
using ControleVenda.Objects.Models;
using LumenSys.WebAPI.Data.Repositories;

namespace ControleVenda.Data.Repositories
{
    public class ProdutoRepository : GenericRepository<Produto>, IProdutoRepository
    {
        private readonly AppDBContext _context;

        public ProdutoRepository(AppDBContext context) : base(context)
        {
            _context = context;
        }
    }
}