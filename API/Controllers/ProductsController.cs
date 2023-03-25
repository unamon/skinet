using API.DTOs;
using AutoMapper;
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
        private readonly IMapper mapper;

        public ProductsController(IGenericRepository<Product> prodRepo,
                                  IGenericRepository<ProductBrand> prodBrandRepo,
                                  IGenericRepository<ProductType> prodTypeRepo,
                                  IMapper mapper)
        {
            this.prodRepo = prodRepo;
            this.prodBrandRepo = prodBrandRepo;
            this.prodTypeRepo = prodTypeRepo;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProductToReturnDTO>>> GetProducts()
        {
            var spec = new ProductsWithTypesAndBrandsSpecification();
            var products = await this.prodRepo.ListAsync(spec);

            return Ok(mapper
            .Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDTO>>(products));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductToReturnDTO>> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);
            
            var product = await prodRepo.GetEntityWithSpec(spec);

            return mapper.Map<Product, ProductToReturnDTO>(product);
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