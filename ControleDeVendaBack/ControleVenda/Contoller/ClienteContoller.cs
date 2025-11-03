using AutoMapper;
using Ecommerce.Objetcs.DTOs.Entities;
using Ecommerce.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly IPedidoService _pedidoService;
        private readonly IMapper _mapper;

        public ClienteController(IPedidoService pedidoService, IMapper mapper)
        {
            _pedidoService = pedidoService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var pedidosDTO = await _pedidoService.GetAll();
            return Ok(pedidosDTO);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var pedido = await _pedidoService.GetById(id);
            if (pedido == null) return NotFound();

            return Ok(pedido);
        }
        [HttpPost]
        public async Task<IActionResult> Create(PedidoDTO pedidoDTO)
        {
            if (pedidoDTO == null) return BadRequest();

            await _pedidoService.Create(pedidoDTO);

            return CreatedAtAction(nameof(GetById), new { id = pedidoDTO.Id }, pedidoDTO);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, PedidoDTO pedidoDTO)
        {
            var existente = await _pedidoService.GetById(id);
            if (existente == null) return NotFound();

            await _pedidoService.Update(pedidoDTO);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Remove(int id)
        {
            var existente = await _pedidoService.GetById(id);
            if (existente == null) return NotFound();

            await _pedidoService.Remove(new PedidoDTO { Id = id });

            return NoContent();
        }

    }
}