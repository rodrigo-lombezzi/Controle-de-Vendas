using System.ComponentModel.DataAnnotations.Schema;

namespace ControleVenda.Objects.Models
{
    [Table("produto")]
    public class Produto
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("nome")]
        public string Nome { get; set; }
        [Column("descricao")]
        public string Descricao { get; set; }
        [Column("valorUnitario")]
        public double ValorUnitario { get; set; }
        [Column("quantidade")]
        public int Quantidade { get; set; }
        [Column("ativo")]
        public bool Ativo { get; set; }
        public ICollection<ItemVenda> ItensVenda { get; set; }

        public Produto() { }

        public Produto(int id, string nome, string descricao, double valorUnitario, int quantidade, bool ativo)
        {
            Id = id;
            Nome = nome;
            Descricao = descricao;
            ValorUnitario = valorUnitario;
            Quantidade = quantidade;
            Ativo = ativo;
        }
  
    }
}
