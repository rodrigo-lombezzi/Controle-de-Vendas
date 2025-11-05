using ControleVenda.Objects.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleVenda.Data.Builders
{
    public class UsuarioBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Usuario>().HasKey(u => u.Id);

            modelBuilder.Entity<Usuario>()
                .Property(u => u.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Usuario>()
                .Property(u => u.Nome)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Usuario>()
                .Property(u => u.Senha)
                .IsRequired()
                .HasMaxLength(255);
            modelBuilder.Entity<Usuario>()
                .Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(11);

            modelBuilder.Entity<Usuario>()
                .Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(150);

            modelBuilder.Entity<Usuario>()
                .Property(u => u.Ativo)
                .IsRequired();

            modelBuilder.Entity<Usuario>().HasData(
                new Usuario
                {
                    Id = 1,
                    Nome = "teste",
                    Senha = "12345678", 
                    Email = "teste@gmail.com",
                    Telefone = "17998988898",
                    Ativo = true
                },
                new Usuario
                {
                    Id = 2,
                    Nome = "venda",
                    Senha = "12345678",
                    Email = "venda@gmail.com",
                    Telefone = "11998988878",
                    Ativo = true
                }
            );
        }
    }
}