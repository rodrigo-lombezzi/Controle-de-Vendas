using System.ComponentModel.DataAnnotations.Schema;

namespace ControleVenda.Objects.Models
{
    [Table("cliente")]
    public class Cliente
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("nome")]
        public string Nome { get; set; }
        [Column("cpf")]
        public string Cpf { get; set; }
        [Column("email")]
        public string Email { get; set; }
        [Column("telefone")]
        public string Telefone { get; set; }
        [Column("endereco")]
        public string Endereco { get; set; }

        public Cliente () { }

        public Cliente (int id, string nome, string cpf, string email, string telefone, string endereco) 
        {
            Id = id;
            Nome = nome;
            Cpf = cpf;
            Email = email;
            Telefone = telefone;
            Endereco = endereco;
        }
    }
}
