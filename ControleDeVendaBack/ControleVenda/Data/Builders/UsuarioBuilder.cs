using ControleVenda.Objects.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ControleVenda.Data.Builders
{
    public class UsuarioBuilder : IEntityTypeConfiguration<Usuario>
    {
        public void Configure(EntityTypeBuilder<Usuario> builder)
        {
            builder.ToTable("usuario");

            builder.HasKey(u => u.Id);

            builder.Property(u => u.Id)
                   .HasColumnName("id")
                   .ValueGeneratedOnAdd();

            builder.Property(u => u.Nome)
                   .HasColumnName("nome")
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(u => u.Senha)
                   .HasColumnName("senha")
                   .IsRequired()
                   .HasMaxLength(255);

            builder.Property(u => u.Email)
                   .HasColumnName("email")
                   .IsRequired()
                   .HasMaxLength(150);

            builder.Property(u => u.Ativo)
                   .HasColumnName("ativo")
                   .IsRequired();

            // (Opcional) Seed Data
            builder.HasData(
                new Usuario
                {
                    Id = 1,
                    Nome = "teste",
                    Senha = "123", // ⚠️ Idealmente armazenar hash, não texto puro
                    Email = "teste@gmail.com",
                    Ativo = true
                },
                new Usuario
                {
                    Id = 2,
                    Nome = "venda",
                    Senha = "123",
                    Email = "venda@gmail.com",
                    Ativo = true
                }
            );
        }
    }
}
