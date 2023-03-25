using API.DTOs;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;


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
        public async Task<ActionResult<List<ProductToReturnDTO>>> GetProducts()
        {
            var spec = new ProductsWithTypesAndBrandsSpecification();
            var products = await this.prodRepo.ListAsync(spec);

            return products.Select(product => new ProductToReturnDTO {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                PictureUrl = product.PictureUrl, 
                Price = product.Price,
                ProductBrand = product.ProductBrand.Name,
                ProductType = product.ProductType.Name
            }).ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductToReturnDTO>> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);
            
            var product = await prodRepo.GetEntityWithSpec(spec);

            return new ProductToReturnDTO {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                PictureUrl = product.PictureUrl, 
                Price = product.Price,
                ProductBrand = product.ProductBrand.Name,
                ProductType = product.ProductType.Name
            };
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