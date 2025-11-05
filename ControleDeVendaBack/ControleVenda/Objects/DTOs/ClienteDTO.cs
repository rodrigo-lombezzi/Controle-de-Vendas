using ControleVenda.Services.Utils;

namespace ControleVenda.Objects.DTOs
{
    public class ClienteDTO
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Cpf { get; set; }
        public string Email { get; set; }
        public string Telefone { get; set; }
        public string Endereco { get; set; }

        public static void Validate(ClienteDTO dto)
        {
            if (dto == null)
                throw new ArgumentNullException("Cliente inválido.");

            if (string.IsNullOrWhiteSpace(dto.Nome))
                throw new ArgumentException("Nome é obrigatório.");

            if (string.IsNullOrWhiteSpace(dto.Cpf))
                throw new ArgumentException("CPF é obrigatório.");

            dto.Cpf = dto.Cpf.ExtractNumbers();
            if (dto.Cpf.Length != 11)
                throw new ArgumentException("CPF deve conter 11 dígitos.");

            if (!OperatorUltilitie.CheckValidPhone(dto.Telefone))
                throw new ArgumentException("Telefone inválido.");

            if (string.IsNullOrWhiteSpace(dto.Email) || OperatorUltilitie.CheckValidEmail(dto.Email) != 1)
                throw new ArgumentException("E-mail é obrigatório e deve ser válido.");

            if (string.IsNullOrWhiteSpace(dto.Endereco))
                throw new ArgumentException("Rua é obrigatória.");

        }
    }
}

