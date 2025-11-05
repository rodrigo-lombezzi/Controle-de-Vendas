using ControleVenda.Services.Utils;
using ControleVenda.WebAPI.Objects.Enums;

namespace ControleVenda.Objects.DTOs.Entities
{
    public class UsuarioDTO
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Senha { get; set; }
        public string Email { get; set; }
        public string Telefone { get; set; }
        public bool Ativo { get; set; }
        public CargoUsuario Cargo { get; set; }

        public static void Validate(UsuarioDTO dto)
        {
            if (dto == null)
                throw new ArgumentNullException("Usuário inválido.");

            if (string.IsNullOrWhiteSpace(dto.Nome))
                throw new ArgumentException("Nome é obrigatório.");

            if (string.IsNullOrWhiteSpace(dto.Senha) || dto.Senha.Length < 8)
                throw new ArgumentException("Senha é obrigatória e deve conter no mínimo 8 caracteres.");

            if (!OperatorUltilitie.CheckValidPhone(dto.Telefone))
                throw new ArgumentException("Telefone inválido.");

            if (string.IsNullOrWhiteSpace(dto.Email) || OperatorUltilitie.CheckValidEmail(dto.Email) != 1)
                throw new ArgumentException("E-mail é obrigatório e deve ser válido.");
        }
    }
}