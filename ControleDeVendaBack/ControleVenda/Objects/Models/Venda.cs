using ControleVenda.WebAPI.Objects.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace ControleVenda.Objects.Models
{
	[Table("venda")]
	public class Venda
	{
		[Column("id")]
		public int Id { get; set; }
		[Column("valorTotal")]
		public double ValorTotal { get; set; }
		[Column("dataHora")]
		public DateTime DataHora { get; set; }
		public StatusVenda Status { get; set; }
		public Venda() { }

        public ICollection<ItemVenda> ItensVenda { get; set; }
        public ICollection<Parcela> Parcelas { get; set; }

        public Venda(int id, double valorTotal, DateTime dataHora, StatusVenda status)
		{
			Id = id;
			ValorTotal = valorTotal;
			DataHora = dataHora;
			Status = status;
		}
	}
}
