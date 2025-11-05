using ControleVenda.Authentication;
using ControleVenda.Objects.DTOs.Entities;
using ControleVenda.Objects.Models;
using ControleVenda.Services.Entities;

namespace ControleVenda.Services.Interfaces
{
    public interface IUsuarioService : IGenericService<Usuario, UsuarioDTO>
    {
        Task<UsuarioDTO> GetByEmail(string email);
        Task<UsuarioDTO> Login(Login login);
    }
}