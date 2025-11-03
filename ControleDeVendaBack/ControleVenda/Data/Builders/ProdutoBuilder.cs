using ControleVenda.Objects.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ControleVenda.Data.Builders
{
    public class ProdutoBuilder : IEntityTypeConfiguration<Produto>
    {
        public void Configure(EntityTypeBuilder<Produto> builder)
        {
            builder.ToTable("produto");

            builder.HasKey(p => p.Id);

            builder.Property(p => p.Id)
                   .HasColumnName("id")
                   .ValueGeneratedOnAdd();

            builder.Property(p => p.Nome)
                   .HasColumnName("nome")
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(p => p.Descricao)
                   .HasColumnName("descricao")
                   .HasMaxLength(255);

            builder.Property(p => p.ValorUnitario)
                   .HasColumnName("valorUnitario")
                   .HasPrecision(18, 2)
                   .IsRequired();

            builder.Property(p => p.Quantidade)
                   .HasColumnName("quantidade")
                   .IsRequired();

            builder.Property(p => p.Ativo)
                   .HasColumnName("ativo")
                   .IsRequired();

            // (Opcional) Dados iniciais (Seed)
            builder.HasData(
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
