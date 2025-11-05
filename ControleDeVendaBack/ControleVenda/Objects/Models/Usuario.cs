using System.ComponentModel.DataAnnotations.Schema;

namespace ControleVenda.Objects.Models
{
    [Table("usuario")]
    public class Usuario
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("nome")]
        public string Nome { get; set; }
        [Column("senha")]
        public string Senha { get; set; }
        [Column("email")]
        public string Email { get; set; }
        [Column("ativo")]
        public bool Ativo { get; set; }

        public Usuario() { }

        public Usuario(int id, string nome, string senha, string email, bool ativo)
        {
            Id = id;
            Nome = nome;
            Senha = senha;
            Email = email;
            Ativo = ativo;
        }
    }
}
