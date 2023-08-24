using API.Controllers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace Tests;

public class ProductsControllerTests : IDisposable
{
    private Mock<IGenericRepository<ProductCategory>> _prodCategoryRepoMock;
    private Mock<IGenericRepository<Product>> _prodRepoMock;
    private Mock<IGenericRepository<ProductBrand>> _prodBrandRepoMock;
    private Mock<IGenericRepository<ProductType>> _prodTypeRepoMock;
    private Mock<IMapper> _mapper;

    public ProductsControllerTests()
    {
        _prodCategoryRepoMock = new Mock<IGenericRepository<ProductCategory>>();
        _prodRepoMock = new Mock<IGenericRepository<Product>>();
        _prodBrandRepoMock = new Mock<IGenericRepository<ProductBrand>>();
        _prodTypeRepoMock = new Mock<IGenericRepository<ProductType>>();
        _mapper = new Mock<IMapper>();
    }

    public void Dispose()
    {
        
    }

    [Fact]
    public async void GetCategoriesReturn200()
    {
        var prodController = new ProductsController();
        var response = (OkObjectResult)await prodController.GetProductCategories();

        response.StatusCode.Should().Be(200);
    }

    [Fact]
    public async void GetCategoriesInvokesRepository()
    {
        // Given
        var prodCategoryRepoMock = new Mock<IGenericRepository<ProductCategory>>();
        prodCategoryRepoMock.Setup(repo => repo.ListAllAsync()).ReturnsAsync(new List<ProductCategory>());

        var prodController = new ProductsController( _prodRepoMock.Object, 
                                                    _prodBrandRepoMock.Object, 
                                                    _prodTypeRepoMock.Object, 
                                                    prodCategoryRepoMock.Object,
                                                    _mapper.Object );

        // When

        var response = await prodController.GetProductCategories();

        // Then

        prodCategoryRepoMock.Verify(repo => repo.ListAllAsync(), Times.Once());
    }

    
}