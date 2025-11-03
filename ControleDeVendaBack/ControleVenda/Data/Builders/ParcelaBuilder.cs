using ControleVenda.Objects.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ControleVenda.Data.Builders
{
    public class ParcelaBuilder : IEntityTypeConfiguration<Parcela>
    {
        public void Configure(EntityTypeBuilder<Parcela> builder)
        {
            builder.ToTable("parcela");

            builder.HasKey(p => p.Id);

            builder.Property(p => p.Id)
                   .HasColumnName("id")
                   .ValueGeneratedOnAdd();

            builder.Property(p => p.ValorPago)
                   .HasColumnName("valorPago")
                   .HasPrecision(18, 2)
                   .IsRequired();

            builder.Property(p => p.ValorTotal)
                   .HasColumnName("valorTotal")
                   .HasPrecision(18, 2)
                   .IsRequired();

            builder.Property(p => p.DataVencimento)
                   .HasColumnName("dataVencimento")
                   .IsRequired();

            builder.Property(p => p.DataPagamento)
                   .HasColumnName("dataPagamento");

            // (Opcional) Dados iniciais — Seed
            builder.HasData(
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
