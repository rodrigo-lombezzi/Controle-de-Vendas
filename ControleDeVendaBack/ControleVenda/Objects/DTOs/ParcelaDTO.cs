namespace ControleVenda.Objects.DTOs
{
    public class ParcelaDTO
    {
        public int Id { get; set; }
        public double ValorPago { get; set; }
        public double ValorTotal { get; set; }
        public DateOnly DataVencimento { get; set; }
        public DateOnly DataPagamento { get; set; }

    }
}

