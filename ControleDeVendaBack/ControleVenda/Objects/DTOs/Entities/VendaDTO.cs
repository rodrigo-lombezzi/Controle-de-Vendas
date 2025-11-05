using ControleVenda.WebAPI.Objects.Enums;

namespace ControleVenda.Objects.DTOs.Entities
{
    public class VendaDTO
    {
        public int Id { get; set; }
        public double ValorTotal { get; set; }
        public DateTime DataHora { get; set; }
        public StatusVenda Status { get; set; }
        public int ClienteId { get; set; }
        public int UsuarioId { get; set; }

        public List<ItemVendaDTO> ItensVenda { get; set; } = new();
        public List<ParcelaDTO> Parcelas { get; set; } = new();


        public static void Validate(VendaDTO dto)
        {
            if (dto == null)
                throw new ArgumentNullException(nameof(dto), "Venda inválida.");

            if (dto.ValorTotal <= 0)
                throw new ArgumentException("Valor total da venda deve ser maior que zero.");

            if (dto.DataHora == default)
                throw new ArgumentException("Data e hora da venda são obrigatórias.");

            if (!Enum.IsDefined(typeof(StatusVenda), dto.Status))
                throw new ArgumentException("Status da venda inválido.");
        }
    }
}