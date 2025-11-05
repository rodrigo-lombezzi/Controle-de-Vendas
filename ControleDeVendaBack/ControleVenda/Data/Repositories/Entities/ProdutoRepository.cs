using ControleVenda.Data.Interfaces;
using ControleVenda.Objects.Models;

namespace ControleVenda.Data.Repositories
{
    public class ProdutoRepository : IGenericRepository<Produto>, IProdutoRepository
    {
        private readonly AppDBContext _context;

        public ProdutoRepository(AppDBContext context) : base(context)
        {
            _context = context;
        }
    }
}