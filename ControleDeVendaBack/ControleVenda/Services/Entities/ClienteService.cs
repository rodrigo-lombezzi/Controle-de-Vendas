using AutoMapper;
using ControleVenda.Data.Interfaces;
using ControleVenda.Objects.DTOs.Entities;
using ControleVenda.Objects.Models;
using ControleVenda.Services.Interfaces;
using ControleVenda.Services.Utils;

namespace ControleVenda.Services.Entities
{
    public class ClienteService : GenericService<Cliente, ClienteDTO>, IClienteService 
    {
        private readonly IClienteRepository _clienteRepository;
        private readonly IMapper _mapper;

        public ClienteService(IClienteRepository repository, IMapper mapper) : base(repository, mapper)
        {
            _clienteRepository = repository;
            _mapper = mapper;
        }

        public override async Task<ClienteDTO> GetById(int id)
        {
            var client = await _clienteRepository.GetById(id);
            if (client == null)
                throw new ArgumentNullException($"Cliente com o ID {id} n�o foi encontrado.");

            return _mapper.Map<ClienteDTO>(client);
        }

        public override async Task Create(ClienteDTO clientDto)
        {
            if (clientDto == null)
                throw new ArgumentNullException("Cliente n�o pode ser nulo.");

            if (await CheckDuplicate(c => c.Cpf, clientDto.Cpf, 0))
                throw new InvalidOperationException("J� existe um cliente com esse CPF.");

            if (await CheckDuplicate(c => c.Email, clientDto.Email, 0))
                throw new InvalidOperationException("J� existe um cliente com esse e-mail.");

            if (!CpfCnpjValidator.IsValid(clientDto.Cpf))
                throw new ArgumentException("CPF inv�lido.");

            await base.Create(clientDto);
        }

        public override async Task Update(ClienteDTO clientDto, int id)
        {
            if (clientDto == null)
                throw new ArgumentNullException("Cliente n�o pode ser nulo.");

            if (clientDto.Id != id)
                throw new ArgumentException("O ID do cliente deve corresponder ao ID informado.");

            if (await CheckDuplicate(c => c.Cpf, clientDto.Cpf, id))
                throw new InvalidOperationException("J� existe um cliente com esse CPF.");

            if (await CheckDuplicate(c => c.Email, clientDto.Email, id))
                throw new InvalidOperationException("J� existe um cliente com esse e-mail.");

            if (!CpfCnpjValidator.IsValid(clientDto.Cpf))
                throw new ArgumentException("CPF inv�lido.");

            await base.Update(clientDto, id);
        }

        public override async Task Delete(int id)
        {
            var client = await _clienteRepository.GetById(id);
            if (client == null)
                throw new ArgumentNullException($"Cliente com o ID {id} n�o foi encontrado.");

            await base.Delete(id);
        }

        private async Task<bool> CheckDuplicate(Func<Cliente, string?> selector, string? valor, int idIgnorar)
        {
            var clientes = await _clienteRepository.Get();
            return clientes.Any(c =>
                c.Id != idIgnorar &&
                !string.IsNullOrWhiteSpace(selector(c)) &&
                StringUtils.CompareString(selector(c)!, valor)
            );
        }
    }
}