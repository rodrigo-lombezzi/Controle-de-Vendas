using ControleVenda.Objects.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleVenda.Data.Builders
{
    public class VendaBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Venda>().HasKey(v => v.Id);

            modelBuilder.Entity<Venda>()
                .Property(v => v.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Venda>()
                .Property(v => v.ValorTotal)
                .HasPrecision(18, 2)
                .IsRequired();

            modelBuilder.Entity<Venda>()
                .Property(v => v.DataHora)
                .IsRequired();

            modelBuilder.Entity<Venda>().HasData(
                new Venda
                {
                    Id = 1,
                    ValorTotal = 1299.90,
                    DataHora = new DateTime(2025, 11, 1, 15, 30, 0)
                },
                new Venda
                {
                    Id = 2,
                    ValorTotal = 259.50,
                    DataHora = new DateTime(2025, 11, 2, 10, 45, 0)
                }
            );
        }
    }
}