using ControleVenda.Objects.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleVenda.Data.Builders
{
    public class ParcelaBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Parcela>().HasKey(p => p.Id);

            modelBuilder.Entity<Parcela>()
                .Property(p => p.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Parcela>()
                .Property(p => p.ValorPago)
                .HasPrecision(18, 2)
                .IsRequired();

            modelBuilder.Entity<Parcela>()
                .Property(p => p.ValorTotal)
                .HasPrecision(18, 2)
                .IsRequired();

            modelBuilder.Entity<Parcela>()
                .Property(p => p.DataVencimento)
                .IsRequired();

            modelBuilder.Entity<Parcela>()
                .Property(p => p.DataPagamento);

            modelBuilder.Entity<Parcela>().HasData(
                new Parcela
                {
                    Id = 1,
                    ValorPago = 250.00,
                    ValorTotal = 500.00,
                    DataVencimento = new DateOnly(2025, 11, 15),
                    DataPagamento = new DateOnly(2025, 11, 10)
                },
                new Parcela
                {
                    Id = 2,
                    ValorPago = 0.00,
                    ValorTotal = 500.00,
                    DataVencimento = new DateOnly(2025, 12, 15),
                    DataPagamento = default
                }
            );
        }
    }
}