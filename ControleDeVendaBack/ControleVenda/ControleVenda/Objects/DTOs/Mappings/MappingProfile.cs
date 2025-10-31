using AutoMapper;
using ControleVenda.Objects.DTOs.Entities;
using ControleVenda.Objects.Models;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Security.Cryptography.Xml;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ControleVenda.Objects.DTOs.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ClienteDTO, Cliente>().ReverseMap();

        }
    }
}