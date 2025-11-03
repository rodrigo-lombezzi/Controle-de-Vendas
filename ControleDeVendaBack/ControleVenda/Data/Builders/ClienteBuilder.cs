using ControleVenda.Objects.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ControleVenda.Data.Builders
{
    public class ClienteBuilder : IEntityTypeConfiguration<Cliente>
    {
        public void Configure(EntityTypeBuilder<Cliente> builder)
        {
            builder.ToTable("cliente");

            builder.HasKey(c => c.Id);

            builder.Property(c => c.Id)
                   .HasColumnName("id")
                   .ValueGeneratedOnAdd();

            builder.Property(c => c.Nome)
                   .HasColumnName("nome")
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(c => c.Cpf)
                   .HasColumnName("cpf")
                   .IsRequired()
                   .HasMaxLength(11);

            builder.Property(c => c.Email)
                   .HasColumnName("email")
                   .HasMaxLength(100);

            builder.Property(c => c.Telefone)
                   .HasColumnName("telefone")
                   .HasMaxLength(15);

            builder.Property(c => c.Endereco)
                   .HasColumnName("endereco")
                   .HasMaxLength(150);

            // Dados iniciais 
            builder.HasData(
                new Cliente
                {
                    Id = 1,
                    Nome = "Matt",
                    Cpf = "24929517664",
                    Email = "Matt@gmail.com",
                    Telefone = "7932798495",
                    Endereco = "Rua 20, 123 - Butão"
                },
                new Cliente
                {
                    Id = 2,
                    Nome = "TomSka",
                    Cpf = "60491529260",
                    Email = "tomska@gmail.com",
                    Telefone = "8555383582",
                    Endereco = "Edds Road, 27 - Green Street"
                }
            );
        }
    }
}
