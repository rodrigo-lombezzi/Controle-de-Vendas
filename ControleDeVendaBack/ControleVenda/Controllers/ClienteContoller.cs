using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using LumenSys.WebAPI.Objects.DTOs.Entities;
using LumenSys.WebAPI.Services.Interfaces;
using LumenSys.WebAPI.Objects.Contract;
using LumenSys.Objects.Enums;
using ControleVenda.Authentication;
using ControleVenda.Objects.DTOs;
using ControleVenda.Services.Interfaces;

namespace LumenSys.WebAPI.Controllers
{
    [Authorize(Roles = "ADMINISTRATOR,MANAGER,EMPLOYEE")]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ClientController : ControllerBase
    {
        private readonly IClienteService _clienteService;
        private readonly Response _response;

        public ClientController(IClienteService clientService)
        {
            _clienteService = clientService;
            _response = new Response();
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var clientes = await _clienteService.GetAll();
            _response.Code = ResponseEnum.Success;
            _response.Message = "Lista de clientes obtida com sucesso!";
            _response.Data = clientes;
            return Ok(_response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var cliente = await _clienteService.GetById(id);
                _response.Code = ResponseEnum.Success;
                _response.Message = $"Cliente {cliente.Name} encontrado com sucesso!";
                _response.Data = cliente;
                return Ok(_response);
            }
            catch (ArgumentNullException ex)
            {
                _response.Code = ResponseEnum.NotFound;
                _response.Message = ex.Message;
                _response.Data = null;
                return NotFound(_response);
            }
            catch (Exception ex)
            {
                _response.Code = ResponseEnum.Error;
                _response.Message = "Erro ao buscar cliente: " + ex.Message;
                _response.Data = null;
                return StatusCode(500, _response);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(ClienteDTO dto)
        {
            try
            {
                ClienteDTO.Validate(dto);
                dto.Id = 0;
                await _clienteService.Create(dto);

                _response.Code = ResponseEnum.Success;
                _response.Message = "Cliente cadastrado com sucesso!";
                _response.Data = dto;
                return Ok(_response);
            }
            catch (ArgumentException ex)
            {
                _response.Code = ResponseEnum.Invalid;
                _response.Message = ex.Message;
                _response.Data = dto;
                return BadRequest(_response);
            }
            catch (InvalidOperationException ex)
            {
                _response.Code = ResponseEnum.Conflict;
                _response.Message = ex.Message;
                _response.Data = dto;
                return Conflict(_response);
            }
            catch (Exception ex)
            {
                _response.Code = ResponseEnum.Error;
                _response.Message = "Erro ao cadastrar cliente: " + ex.Message;
                _response.Data = dto;
                return StatusCode(500, _response);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, ClienteDTO dto)
        {
            try
            {
                ClienteDTO.Validate(dto);
                await _clienteService.Update(dto, id);

                _response.Code = ResponseEnum.Success;
                _response.Message = "Cliente atualizado com sucesso!";
                _response.Data = dto;
                return Ok(_response);
            }
            catch (ArgumentNullException ex)
            {
                _response.Code = ResponseEnum.NotFound;
                _response.Message = ex.Message;
                _response.Data = dto;
                return NotFound(_response);
            }
            catch (ArgumentException ex)
            {
                _response.Code = ResponseEnum.Invalid;
                _response.Message = ex.Message;
                _response.Data = dto;
                return BadRequest(_response);
            }
            catch (InvalidOperationException ex)
            {
                _response.Code = ResponseEnum.Conflict;
                _response.Message = ex.Message;
                _response.Data = dto;
                return Conflict(_response);
            }
            catch (Exception ex)
            {
                _response.Code = ResponseEnum.Error;
                _response.Message = "Erro ao atualizar cliente: " + ex.Message;
                _response.Data = dto;
                return StatusCode(500, _response);
            }
        }
        [Authorize(Roles = "ADMINISTRADOR")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _clienteService.Delete(id);
                _response.Code = ResponseEnum.Success;
                _response.Message = "Cliente removido com sucesso!";
                _response.Data = null;
                return Ok(_response);
            }
            catch (ArgumentNullException ex)
            {
                _response.Code = ResponseEnum.NotFound;
                _response.Message = ex.Message;
                _response.Data = null;
                return NotFound(_response);
            }
            catch (Exception ex)
            {
                _response.Code = ResponseEnum.Error;
                _response.Message = "Erro ao remover cliente: " + ex.Message;
                _response.Data = null;
                return StatusCode(500, _response);
            }
        }
    }
}