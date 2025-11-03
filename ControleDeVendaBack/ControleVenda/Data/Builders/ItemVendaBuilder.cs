using ControleVenda.Objects.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ControleVenda.Data.Builders
{
    public class ItemVendaBuilder : IEntityTypeConfiguration<ItemVenda>
    {
        public void Configure(EntityTypeBuilder<ItemVenda> builder)
        {
            builder.ToTable("itemVenda");

            builder.HasKey(iv => iv.Id);

            builder.Property(iv => iv.Id)
                   .HasColumnName("id")
                   .ValueGeneratedOnAdd();

            builder.Property(iv => iv.QtdProduto)
                   .HasColumnName("qtdProduto")
                   .IsRequired();

            builder.Property(iv => iv.SubTotal)
                   .HasColumnName("subTotal")
                   .IsRequired()
                   .HasPrecision(18, 2); // Para precisão em valores monetários

            // Dados iniciais (Seed)
            builder.HasData(
                new ItemVenda
                {
                    Id = 1,
                    QtdProduto = 2,
                    SubTotal = 59.98
                },
                new ItemVenda
                {
                    Id = 2,
                    QtdProduto = 1,
                    SubTotal = 29.99
                }
            );
        }
    }
}
