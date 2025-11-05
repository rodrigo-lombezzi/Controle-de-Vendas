using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ControleVenda.Authentication;
using ControleVenda.Services.Interfaces;
using ControleVenda.Objects.DTOs.Entities;

namespace ControleVenda.WebAPI.Controllers
{
    [Authorize(Roles = "ADMINISTRADOR,GERENTE,VENDEDOR")]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class VendaController : ControllerBase
    {
        private readonly IVendaService _vendaService;
        private readonly Response _response;

        public VendaController(IVendaService vendaService)
        {
            _vendaService = vendaService;
            _response = new Response();
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var vendas = await _vendaService.GetAll();
            _response.Code = ResponseEnum.Success;
            _response.Message = "Lista de vendas obtida com sucesso!";
            _response.Data = vendas;
            return Ok(_response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var venda = await _vendaService.GetById(id);
                _response.Code = ResponseEnum.Success;
                _response.Message = $"Venda {venda.Id} encontrada com sucesso!";
                _response.Data = venda;
                return Ok(_response);
            }
            catch (ArgumentNullException ex)
            {
                _response.Code = ResponseEnum.NotFound;
                _response.Message = ex.Message;
                return NotFound(_response);
            }
            catch (Exception ex)
            {
                _response.Code = ResponseEnum.Error;
                _response.Message = "Erro ao buscar venda: " + ex.Message;
                return StatusCode(500, _response);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(VendaDTO dto)
        {
            try
            {
                VendaDTO.Validate(dto);
                dto.Id = 0;
                await _vendaService.Create(dto);

                _response.Code = ResponseEnum.Success;
                _response.Message = "Venda cadastrada com sucesso!";
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
                _response.Message = "Erro ao cadastrar venda: " + ex.Message;
                _response.Data = dto;
                return StatusCode(500, _response);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, VendaDTO dto)
        {
            try
            {
                VendaDTO.Validate(dto);
                await _vendaService.Update(dto, id);

                _response.Code = ResponseEnum.Success;
                _response.Message = "Venda atualizada com sucesso!";
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
                _response.Message = "Erro ao atualizar venda: " + ex.Message;
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
                await _vendaService.Delete(id);
                _response.Code = ResponseEnum.Success;
                _response.Message = "Venda removida com sucesso!";
                return Ok(_response);
            }
            catch (ArgumentNullException ex)
            {
                _response.Code = ResponseEnum.NotFound;
                _response.Message = ex.Message;
                return NotFound(_response);
            }
            catch (Exception ex)
            {
                _response.Code = ResponseEnum.Error;
                _response.Message = "Erro ao remover venda: " + ex.Message;
                return StatusCode(500, _response);
            }
        }
    }
}