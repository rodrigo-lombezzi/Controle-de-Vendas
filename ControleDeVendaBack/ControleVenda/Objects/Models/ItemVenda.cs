using System.ComponentModel.DataAnnotations.Schema;

namespace ControleVenda.Objects.Models
{
    [Table("itemVenda")]
    public class ItemVenda
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("qtdProduto")]
        public int QtdProduto { get; set; }
        [Column("subTotal")]
        public double SubTotal { get; set; }

        public ItemVenda() { }

        public ItemVenda(int id, int qtdProduto, double subTotal)
        {
            Id = id;
            QtdProduto = qtdProduto;
            SubTotal = subTotal;
        }
    }
}
