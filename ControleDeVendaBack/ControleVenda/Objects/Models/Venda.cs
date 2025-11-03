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

		public Venda() { }

		public Venda(int id, double valorTotal, DateTime dataHora)
		{
			Id = id;
			ValorTotal = valorTotal;
			DataHora = dataHora;
		}
	}
}
