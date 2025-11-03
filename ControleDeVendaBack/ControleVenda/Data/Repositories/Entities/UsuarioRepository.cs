using ControleVenda.WebAPI.Data.Interfaces;
using ControleVenda.WebAPI.Objects.Models;

namespace ControleVenda.Data.Repositories
{
    public class UsuarioRepository : GenericRepository<Usuario>, IUsuarioRepository
    {
        private readonly AppDbContext _context;

        public UsuarioRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }
    }
}