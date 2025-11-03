using ControleVenda.Objects.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ControleVenda.Data.Builders
{
    public class VendaBuilder : IEntityTypeConfiguration<Venda>
    {
        public void Configure(EntityTypeBuilder<Venda> builder)
        {
            builder.ToTable("venda");

            builder.HasKey(v => v.Id);

            builder.Property(v => v.Id)
                   .HasColumnName("id")
                   .ValueGeneratedOnAdd();

            builder.Property(v => v.ValorTotal)
                   .HasColumnName("valorTotal")
                   .HasPrecision(18, 2)
                   .IsRequired();

            builder.Property(v => v.DataHora)
                   .HasColumnName("dataHora")
                   .IsRequired();

            // Seed data (opcional)
            builder.HasData(
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
