using ControleVenda.Objects.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleVenda.Data.Builders
{
    public class ClienteBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
         
            modelBuilder.Entity<Cliente>().HasKey(c => c.Id);

            modelBuilder.Entity<Cliente>()
                .Property(c => c.Id);


            modelBuilder.Entity<Cliente>()
                .Property(c => c.Nome)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Cliente>()
                .Property(c => c.Cpf)
                .IsRequired()
                .HasMaxLength(11);

            modelBuilder.Entity<Cliente>()
                .Property(c => c.Email)
                .HasMaxLength(100);

            modelBuilder.Entity<Cliente>()
                .Property(c => c.Telefone)
                .HasMaxLength(15);

            modelBuilder.Entity<Cliente>()
                .Property(c => c.Endereco)
                .HasMaxLength(150);

            modelBuilder.Entity<Cliente>().HasData(
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