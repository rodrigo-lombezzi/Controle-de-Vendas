using ControleVenda.Objects.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleVenda.Data.Builders
{
    public class ProdutoBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Produto>().HasKey(p => p.Id);

            modelBuilder.Entity<Produto>()
                .Property(p => p.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Produto>()
                .Property(p => p.Nome)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Produto>()
                .Property(p => p.Descricao)
                .HasMaxLength(255);

            modelBuilder.Entity<Produto>()
                .Property(p => p.ValorUnitario)
                .HasPrecision(18, 2)
                .IsRequired();

            modelBuilder.Entity<Produto>()
                .Property(p => p.Quantidade)
                .IsRequired();

            modelBuilder.Entity<Produto>()
                .Property(p => p.Ativo)
                .IsRequired();

            modelBuilder.Entity<Produto>().HasData(
                new Produto
                {
                    Id = 1,
                    Nome = "Notebook Dell Inspiron",
                    Descricao = "Notebook Dell Inspiron 15 com Intel i7 e 16GB RAM",
                    ValorUnitario = 4999.99,
                    Quantidade = 10,
                    Ativo = true
                },
                new Produto
                {
                    Id = 2,
                    Nome = "Mouse Logitech M170",
                    Descricao = "Mouse sem fio Logitech M170, conexão USB",
                    ValorUnitario = 99.90,
                    Quantidade = 50,
                    Ativo = true
                },
                new Produto
                {
                    Id = 3,
                    Nome = "Teclado Mecânico Redragon Kumara",
                    Descricao = "Teclado gamer mecânico ABNT2 com iluminação RGB",
                    ValorUnitario = 299.90,
                    Quantidade = 25,
                    Ativo = true
                }
            );
        }
    }
}