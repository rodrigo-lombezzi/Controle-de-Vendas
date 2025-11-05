using ControleVenda.Objects.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleVenda.Data.Builders
{
    public class ItemVendaBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ItemVenda>().HasKey(iv => iv.Id);

            modelBuilder.Entity<ItemVenda>()
                .Property(iv => iv.QtdProduto)
                .IsRequired();

            modelBuilder.Entity<ItemVenda>()
                .Property(iv => iv.SubTotal)
                .IsRequired()
                .HasPrecision(18, 2);

            modelBuilder.Entity<ItemVenda>().HasData(
                new ItemVenda
                {
                    Id = 1,
                    QtdProduto = 2,
                    SubTotal = 59.98,
                    ProdutoId = 1, 
                    VendaId = 1   
                },
                new ItemVenda
                {
                    Id = 2,
                    QtdProduto = 1,
                    SubTotal = 29.99,
                    ProdutoId = 2, 
                    VendaId = 2    
                }
            );
        }
    }
}