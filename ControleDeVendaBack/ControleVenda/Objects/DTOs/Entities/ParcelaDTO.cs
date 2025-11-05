using ControleVenda.WebAPI.Objects.Enums;

namespace ControleVenda.Objects.DTOs.Entities
{
    public class ParcelaDTO
    {
        public int Id { get; set; }
        public double? ValorPago { get; set; }
        public double ValorTotal { get; set; }
        public DateOnly DataVencimento { get; set; }
        public DateOnly? DataPagamento { get; set; }
        public TipoPagamento Pagamento { get; set; }
        public int VendaId { get; set; }
        public static void Validate(ParcelaDTO dto)
        {
            if (dto == null)
                throw new ArgumentNullException(nameof(dto), "Parcela inválida.");

            if (dto.ValorTotal <= 0)
                throw new ArgumentException("Valor total deve ser maior que zero.");

            if (dto.ValorPago < 0)
                throw new ArgumentException("Valor pago não pode ser negativo.");

            if (dto.DataVencimento > dto.DataPagamento)
                throw new ArgumentException("Data de pagamento não pode ser anterior à data de vencimento.");

            if (!Enum.IsDefined(typeof(TipoPagamento), dto.Pagamento))
                throw new ArgumentException("Tipo de pagamento inválido.");
        }
    }
}