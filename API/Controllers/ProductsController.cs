using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IGenericRepository<Product> prodRepo;
        private readonly IGenericRepository<ProductBrand> prodBrandRepo;
        private readonly IGenericRepository<ProductType> prodTypeRepo;

        public ProductsController(IGenericRepository<Product> prodRepo,
                                  IGenericRepository<ProductBrand> prodBrandRepo,
                                  IGenericRepository<ProductType> prodTypeRepo)
        {
            this.prodRepo = prodRepo;
            this.prodBrandRepo = prodBrandRepo;
            this.prodTypeRepo = prodTypeRepo;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await prodRepo.ListAllAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            return await prodRepo.GetByIdAsync(id);
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands(){
            return Ok(await prodBrandRepo.ListAllAsync());
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes(){
            return Ok(await prodTypeRepo.ListAllAsync());
        }
    }
}