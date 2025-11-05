using ControleVenda.Authentication;
using ControleVenda.Objects.DTOs.Entities;
using ControleVenda.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ControleVenda.Controllers
{
    [Route("api/usuario")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;
        private readonly Response _response;

        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
            _response = new Response();
        }

        [Authorize(Roles = "ADMINISTRADOR,GERENTE")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var usuarios = await _usuarioService.GetAll();
            _response.Code = ResponseEnum.Success;
            _response.Data = usuarios;
            _response.Message = "Lista de usuários.";
            return Ok(_response);
        }

        [Authorize(Roles = "ADMINISTRADOR,GERENTE")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var usuario = await _usuarioService.GetById(id);
                _response.Code = ResponseEnum.Success;
                _response.Message = $"Usuário {usuario.Nome} encontrado com sucesso!";
                _response.Data = usuario;
                return Ok(_response);
            }
            catch (ArgumentNullException ex)
            {
                _response.Code = ResponseEnum.NotFound;
                _response.Message = ex.Message;
                return NotFound(_response);
            }
            catch
            {
                _response.Code = ResponseEnum.Error;
                _response.Message = "Erro ao buscar o usuário.";
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UsuarioDTO usuarioDto)
        {
            try
            {
                usuarioDto.Id = 0;
                UsuarioDTO.Validate(usuarioDto);
                await _usuarioService.Create(usuarioDto);

                _response.Code = ResponseEnum.Success;
                _response.Message = "Usuário criado com sucesso!";
                _response.Data = usuarioDto;
                return Ok(_response);
            }
            catch (ArgumentNullException ex)
            {
                _response.Code = ResponseEnum.Invalid;
                _response.Message = ex.Message;
                _response.Data = usuarioDto;
                return BadRequest(_response);
            }
            catch (ArgumentException ex)
            {
                _response.Code = ResponseEnum.Invalid;
                _response.Message = ex.Message;
                _response.Data = usuarioDto;
                return BadRequest(_response);
            }
            catch (InvalidOperationException ex)
            {
                _response.Code = ResponseEnum.Conflict;
                _response.Message = ex.Message;
                _response.Data = usuarioDto;
                return Conflict(_response);
            }
            catch
            {
                _response.Code = ResponseEnum.Error;
                _response.Message = "Erro ao cadastrar o usuário.";
                _response.Data = usuarioDto;
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Login login)
        {
            try
            {
                var usuarioDto = await _usuarioService.Login(login);
                var token = new Token().GenerateToken(usuarioDto);

                _response.Code = ResponseEnum.Success;
                _response.Message = "Login realizado com sucesso!";
                _response.Data = new { Token = token, Usuario = usuarioDto };
                return Ok(_response);
            }
            catch (ArgumentException ex)
            {
                _response.Code = ResponseEnum.Invalid;
                _response.Message = ex.Message;
                return BadRequest(_response);
            }
            catch (InvalidOperationException ex)
            {
                _response.Code = ResponseEnum.Unauthorized;
                _response.Message = ex.Message;
                return Unauthorized(_response);
            }
            catch
            {
                _response.Code = ResponseEnum.Error;
                _response.Message = "Erro inesperado ao tentar realizar o login.";
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [Authorize(Roles = "ADMINISTRADOR,GERENTE,VENDEDOR")]
        [HttpPut]
        public async Task<IActionResult> Put(int id, [FromBody] UsuarioDTO usuarioDto)
        {
            try
            {
                UsuarioDTO.Validate(usuarioDto);
                await _usuarioService.Update(usuarioDto, id);

                _response.Code = ResponseEnum.Success;
                _response.Message = "Usuário atualizado com sucesso!";
                _response.Data = usuarioDto;
                return Ok(_response);
            }
            catch (ArgumentNullException ex)
            {
                _response.Code = ResponseEnum.NotFound;
                _response.Message = ex.Message;
                _response.Data = usuarioDto;
                return NotFound(_response);
            }
            catch (ArgumentException ex)
            {
                _response.Code = ResponseEnum.Invalid;
                _response.Message = ex.Message;
                _response.Data = usuarioDto;
                return BadRequest(_response);
            }
            catch (InvalidOperationException ex)
            {
                _response.Code = ResponseEnum.Conflict;
                _response.Message = ex.Message;
                _response.Data = usuarioDto;
                return Conflict(_response);
            }
            catch
            {
                _response.Code = ResponseEnum.Error;
                _response.Message = "Erro ao atualizar o usuário.";
                _response.Data = usuarioDto;
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [Authorize(Roles = "ADMINISTRADOR")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _usuarioService.Delete(id);
                _response.Code = ResponseEnum.Success;
                _response.Message = "Usuário excluído com sucesso!";
                return Ok(_response);
            }
            catch (ArgumentNullException ex)
            {
                _response.Code = ResponseEnum.NotFound;
                _response.Message = ex.Message;
                return NotFound(_response);
            }
            catch
            {
                _response.Code = ResponseEnum.Error;
                _response.Message = "Erro ao excluir o usuário.";
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [Authorize(Roles = "ADMINISTRADOR,GERENTE")]
        [HttpGet("email")]
        public async Task<IActionResult> GetByEmail([FromQuery] string email)
        {
            try
            {
                var usuario = await _usuarioService.GetByEmail(email);
                _response.Code = ResponseEnum.Success;
                _response.Message = $"Usuário com e-mail {email} encontrado com sucesso!";
                _response.Data = usuario;
                return Ok(_response);
            }
            catch (ArgumentException ex)
            {
                _response.Code = ResponseEnum.Invalid;
                _response.Message = ex.Message;
                return BadRequest(_response);
            }
            catch (InvalidOperationException ex)
            {
                _response.Code = ResponseEnum.NotFound;
                _response.Message = ex.Message;
                return NotFound(_response);
            }
            catch
            {
                _response.Code = ResponseEnum.Error;
                _response.Message = "Erro ao buscar o usuário pelo e-mail.";
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }
    }
}