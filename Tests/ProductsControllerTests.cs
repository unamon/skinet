using API.Controllers;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace Tests;

public class ProductsControllerTests
{
    [Fact]
    public async void GetCategoriesReturn200()
    {
        var prodController = new ProductsController();
        var response = (OkObjectResult)await prodController.GetProductCategories();

        response.StatusCode.Should().Be(200);
    }

    [Fact]
    public void GetCategoriesInvokesRepository()
    {
        // Given
    
        // When
    
        // Then
    }
}