using API.DTOs;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
        public class ProductsController : BaseApiController
    {
        private readonly IGenericRepository<Product> prodRepo;
        private readonly IGenericRepository<ProductBrand> prodBrandRepo;
        private readonly IGenericRepository<ProductType> prodTypeRepo;
        private readonly IGenericRepository<ProductCategory> prodCatRepo;
        private readonly IMapper mapper;

        public ProductsController(IGenericRepository<Product> prodRepo,
                                  IGenericRepository<ProductBrand> prodBrandRepo,
                                  IGenericRepository<ProductType> prodTypeRepo,
                                  IGenericRepository<ProductCategory> prodCatRepo,
                                  IMapper mapper)
        {
            this.prodRepo = prodRepo;
            this.prodBrandRepo = prodBrandRepo;
            this.prodTypeRepo = prodTypeRepo;
            this.prodCatRepo = prodCatRepo;
            this.mapper = mapper;
        }

        public ProductsController()
        {
        }

        [Cached(600)]
        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDTO>>> GetProducts(
            [FromQuery]ProductSpecParams prodParams)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(prodParams);
            var countSpec = new ProductWithFiltersForCountSpecification(prodParams);

            var totalItems = await prodRepo.CountAsync(countSpec);
            var products = await this.prodRepo.ListAsync(spec);

            var data = mapper
            .Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDTO>>(products);

            return Ok(new Pagination<ProductToReturnDTO>(prodParams.PageIndex, prodParams.PageSize, totalItems, data));
        }

        [Cached(600)]
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDTO>> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);
            
            var product = await prodRepo.GetEntityWithSpec(spec);

            if (product == null) return NotFound(new ApiResponse(404));

            return mapper.Map<Product, ProductToReturnDTO>(product);
        }

        [Cached(600)]
        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands(){
            return Ok(await prodBrandRepo.ListAllAsync());
        }
        
        [Cached(600)]
        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes(){
            return Ok(await prodTypeRepo.ListAllAsync());
        }

        public async Task<ActionResult> GetProductCategories()
        {
            return Ok(await prodCatRepo.ListAllAsync());
            
        }
    }
}