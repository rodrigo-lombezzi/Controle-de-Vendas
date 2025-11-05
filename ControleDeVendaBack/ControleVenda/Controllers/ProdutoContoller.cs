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
    public class ProdutoController : ControllerBase
    {
        private readonly IProdutoService _produtoService;
        private readonly Response _response;

        public ProdutoController(IProdutoService produtoService)
        {
            _produtoService = produtoService;
            _response = new Response();
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var produtos = await _produtoService.GetAll();
            _response.Code = ResponseEnum.Success;
            _response.Message = "Lista de produtos obtida com sucesso!";
            _response.Data = produtos;
            return Ok(_response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var produto = await _produtoService.GetById(id);
                _response.Code = ResponseEnum.Success;
                _response.Message = $"Produto {produto.Nome} encontrado com sucesso!";
                _response.Data = produto;
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
                _response.Message = "Erro ao buscar produto: " + ex.Message;
                return StatusCode(500, _response);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(ProdutoDTO dto)
        {
            try
            {
                ProdutoDTO.Validate(dto);
                dto.Id = 0;
                await _produtoService.Create(dto);

                _response.Code = ResponseEnum.Success;
                _response.Message = "Produto cadastrado com sucesso!";
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
                _response.Message = "Erro ao cadastrar produto: " + ex.Message;
                _response.Data = dto;
                return StatusCode(500, _response);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, ProdutoDTO dto)
        {
            try
            {
                ProdutoDTO.Validate(dto);
                await _produtoService.Update(dto, id);

                _response.Code = ResponseEnum.Success;
                _response.Message = "Produto atualizado com sucesso!";
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
                _response.Message = "Erro ao atualizar produto: " + ex.Message;
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
                await _produtoService.Delete(id);
                _response.Code = ResponseEnum.Success;
                _response.Message = "Produto removido com sucesso!";
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
                _response.Message = "Erro ao remover produto: " + ex.Message;
                return StatusCode(500, _response);
            }
        }
    }
}