using ControleVenda.Authentication;
using ControleVenda.Objects.Models;

namespace ControleVenda.Data.Interfaces
{
    public interface IUsuarioRepository : IGenericRepository<Usuario>
    {
        Task<Usuario> GetByEmail(string email);
        Task<Usuario> Login(Login login);
    }
}