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
    public class ParcelaController : ControllerBase
    {
        private readonly IParcelaService _parcelaService;
        private readonly Response _response;

        public ParcelaController(IParcelaService parcelaService)
        {
            _parcelaService = parcelaService;
            _response = new Response();
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var parcelas = await _parcelaService.GetAll();
            _response.Code = ResponseEnum.Success;
            _response.Message = "Lista de parcelas obtida com sucesso!";
            _response.Data = parcelas;
            return Ok(_response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var parcela = await _parcelaService.GetById(id);
                _response.Code = ResponseEnum.Success;
                _response.Message = $"Parcela {parcela.Id} encontrada com sucesso!";
                _response.Data = parcela;
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
                _response.Message = "Erro ao buscar parcela: " + ex.Message;
                return StatusCode(500, _response);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(ParcelaDTO dto)
        {
            try
            {
                ParcelaDTO.Validate(dto);
                dto.Id = 0;
                await _parcelaService.Create(dto);

                _response.Code = ResponseEnum.Success;
                _response.Message = "Parcela cadastrada com sucesso!";
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
                _response.Message = "Erro ao cadastrar parcela: " + ex.Message;
                _response.Data = dto;
                return StatusCode(500, _response);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, ParcelaDTO dto)
        {
            try
            {
                ParcelaDTO.Validate(dto);
                await _parcelaService.Update(dto, id);

                _response.Code = ResponseEnum.Success;
                _response.Message = "Parcela atualizada com sucesso!";
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
                _response.Message = "Erro ao atualizar parcela: " + ex.Message;
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
                await _parcelaService.Delete(id);
                _response.Code = ResponseEnum.Success;
                _response.Message = "Parcela removida com sucesso!";
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
                _response.Message = "Erro ao remover parcela: " + ex.Message;
                return StatusCode(500, _response);
            }
        }
    }
}