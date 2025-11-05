using AutoMapper;
using ControleVenda.Authentication;
using ControleVenda.Data.Interfaces;
using ControleVenda.Objects.DTOs.Entities;
using ControleVenda.Objects.Models;
using ControleVenda.Services.Interfaces;
using ControleVenda.Services.Utils;

namespace ControleVenda.Services.Entities
{
    public class UsuarioService : GenericService<Usuario, UsuarioDTO>, IUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IMapper _mapper;

        public UsuarioService(IUsuarioRepository repository, IMapper mapper)
            : base(repository, mapper)
        {
            _usuarioRepository = repository;
            _mapper = mapper;
        }

        public override async Task<UsuarioDTO> GetById(int id)
        {
            var usuario = await _usuarioRepository.GetById(id);
            if (usuario == null)
                throw new ArgumentNullException($"Usuário com o ID {id} não foi encontrado.");

            return _mapper.Map<UsuarioDTO>(usuario);
        }

        public override async Task Create(UsuarioDTO usuarioDto)
        {
            if (usuarioDto == null)
                throw new ArgumentNullException("O usuário não pode ser nulo.");

            if (await CheckDuplicate(u => u.Email, usuarioDto.Email, 0))
                throw new InvalidOperationException("E-mail já está em uso.");

            if (await CheckDuplicate(u => u.Telefone, usuarioDto.Telefone, 0))
                throw new InvalidOperationException("Telefone já está em uso.");

            usuarioDto.Senha = OperatorUltilitie.GenerateHash(usuarioDto.Senha);
            await base.Create(usuarioDto);
        }

        public override async Task Update(UsuarioDTO usuarioDto, int id)
        {
            if (usuarioDto == null)
                throw new ArgumentNullException("O usuário não pode ser nulo.");

            if (usuarioDto.Id != id)
                throw new ArgumentException("O ID do usuário deve corresponder ao ID informado.");

            if (await CheckDuplicate(u => u.Email, usuarioDto.Email, id))
                throw new InvalidOperationException("E-mail já está em uso.");

            if (await CheckDuplicate(u => u.Telefone, usuarioDto.Telefone, id))
                throw new InvalidOperationException("Telefone já está em uso.");;


            usuarioDto.Senha = OperatorUltilitie.GenerateHash(usuarioDto.Senha);
            await base.Update(usuarioDto, id);
        }

        public override async Task Delete(int id)
        {
            var usuario = await _usuarioRepository.GetById(id);
            if (usuario == null)
                throw new ArgumentNullException($"Usuário com o ID {id} não foi encontrado.");

            await base.Delete(id);
        }

        private async Task<bool> CheckDuplicate(Func<Usuario, string?> selector, string? valor, int idIgnorar)
        {
            var usuarios = await _usuarioRepository.Get();
            return usuarios.Any(u =>
                u.Id != idIgnorar &&
                !string.IsNullOrWhiteSpace(selector(u)) &&
                StringUtils.CompareString(selector(u)!, valor)
            );
        }

        public async Task<UsuarioDTO> GetByEmail(string email)
        {
            var usuario = await _usuarioRepository.GetByEmail(email);
            if (usuario == null)
                throw new InvalidOperationException("Não existe nenhum usuário com o e-mail informado.");

            usuario.Senha = "";
            return _mapper.Map<UsuarioDTO>(usuario);
        }

        public async Task<UsuarioDTO> Login(Login login)
        {
            if (login == null)
                throw new ArgumentNullException("Dados de login não podem ser nulos.");

            var usuario = await _usuarioRepository.GetByEmail(login.Email);
            if (usuario == null)
                throw new InvalidOperationException("E-mail ou senha inválidos!");

            if (!string.Equals(usuario.Senha, login.Password, StringComparison.Ordinal))
                throw new InvalidOperationException("E-mail ou senha inválidos.");

            usuario.Senha = "";
            return _mapper.Map<UsuarioDTO>(usuario);
        }
    }
}