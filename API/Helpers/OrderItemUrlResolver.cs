using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using AutoMapper;
using Core.Entities.OrderAggregate;

namespace API.Helpers
{
    public class OrderItemUrlResolver : IValueResolver<OrderItem, OrderItemDto, string>
    {
        private readonly IConfiguration config;

        public OrderItemUrlResolver(IConfiguration config)
        {
            this.config = config;
        }

        public string Resolve(OrderItem source, OrderItemDto destination, string destMember, ResolutionContext context)
        {
            if(!string.IsNullOrEmpty(source.ItemOrdered.PictureUrl))
            {
                return config["ApiUrl"] + source.ItemOrdered.PictureUrl;
            }

            return null; 
            
        }
    }
}