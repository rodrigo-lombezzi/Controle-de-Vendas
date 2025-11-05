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
    public class ItemVendaController : ControllerBase
    {
        private readonly IItemVendaService _itemVendaService;
        private readonly Response _response;

        public ItemVendaController(IItemVendaService itemVendaService)
        {
            _itemVendaService = itemVendaService;
            _response = new Response();
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var itens = await _itemVendaService.GetAll();
            _response.Code = ResponseEnum.Success;
            _response.Message = "Lista de itens de venda obtida com sucesso!";
            _response.Data = itens;
            return Ok(_response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var item = await _itemVendaService.GetById(id);
                _response.Code = ResponseEnum.Success;
                _response.Message = $"Item de venda {item.Id} encontrado com sucesso!";
                _response.Data = item;
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
                _response.Message = "Erro ao buscar item de venda: " + ex.Message;
                _response.Data = null;
                return StatusCode(500, _response);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(ItemVendaDTO dto)
        {
            try
            {
                ItemVendaDTO.Validate(dto);
                dto.Id = 0;
                await _itemVendaService.Create(dto);

                _response.Code = ResponseEnum.Success;
                _response.Message = "Item de venda cadastrado com sucesso!";
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
                _response.Message = "Erro ao cadastrar item de venda: " + ex.Message;
                _response.Data = dto;
                return StatusCode(500, _response);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, ItemVendaDTO dto)
        {
            try
            {
                ItemVendaDTO.Validate(dto);
                await _itemVendaService.Update(dto, id);

                _response.Code = ResponseEnum.Success;
                _response.Message = "Item de venda atualizado com sucesso!";
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
                _response.Message = "Erro ao atualizar item de venda: " + ex.Message;
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
                await _itemVendaService.Delete(id);
                _response.Code = ResponseEnum.Success;
                _response.Message = "Item de venda removido com sucesso!";
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
                _response.Message = "Erro ao remover item de venda: " + ex.Message;
                _response.Data = null;
                return StatusCode(500, _response);
            }
        }
    }
}