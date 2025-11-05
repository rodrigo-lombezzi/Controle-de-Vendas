using ControleVenda.Authentication;
using ControleVenda.Data.Interfaces;
using ControleVenda.Objects.Models;
using LumenSys.WebAPI.Data.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ControleVenda.Data.Repositories
{
    public class UsuarioRepository : GenericRepository<Usuario>, IUsuarioRepository
    {
        private readonly AppDBContext _context;

        public UsuarioRepository(AppDBContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Usuario> Login(Login login)
        {
            return await _context.Usuarios.AsNoTracking().FirstOrDefaultAsync(u => u.Email == login.Email && u.Senha == login.Senha);
        }
        public async Task<Usuario> GetByEmail(string email)
        {
            return await _context.Usuarios.AsNoTracking().FirstOrDefaultAsync(u => u.Email == email);
        }
    }
}