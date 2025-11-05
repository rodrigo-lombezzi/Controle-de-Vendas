using ControleVenda.WebAPI.Objects.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace ControleVenda.Objects.Models
{
    [Table("parcela")]
    public class Parcela
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("valorPago")]
        public double? ValorPago { get; set; }
        [Column("valorTotal")]
        public double ValorTotal { get; set; }
        [Column("dataVencimento")]
        public DateOnly DataVencimento { get; set; }
        [Column("dataPagamento")]
        public DateOnly? DataPagamento { get; set; }
        public TipoPagamento Pagamento { get; set; }
        public int VendaId { get; set; }
        public Venda Venda { get; set; }

        public Parcela() { }

        public Parcela(int id, double valorPago, double valorTotal, DateOnly dataVencimento, DateOnly dataPagamento, TipoPagamento pagamento)
        {
            Id = id;
            ValorPago = valorPago;
            ValorTotal = valorTotal;
            DataVencimento = dataVencimento;
            DataPagamento = dataPagamento;
            Pagamento = pagamento;
        }

    }
}
