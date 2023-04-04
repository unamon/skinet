using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductWithFiltersForCountSpecification : BaseSpecification<Product>
    {
        public ProductWithFiltersForCountSpecification(
            ProductSpecParams prodParams)
        : base( x => 
            (!prodParams.BrandId.HasValue || x.ProductBrandId == prodParams.BrandId) &&
            (!prodParams.TypeId.HasValue  || x.ProductTypeId == prodParams.TypeId)
        )
        {
        }
    }
}