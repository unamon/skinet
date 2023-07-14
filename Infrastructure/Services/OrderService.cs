using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IGenericRepository<Order> orderRepo;
        private readonly IGenericRepository<DeliveryMethod> dmRepo;
        private readonly IGenericRepository<Product> prodRepo;
        private readonly IBasketRepository basketRepo;

        public OrderService(IGenericRepository<Order> orderRepo, IGenericRepository<DeliveryMethod> dmRepo,
        IGenericRepository<Product> prodRepo, IBasketRepository basketRepo)
        {
            this.orderRepo = orderRepo;
            this.dmRepo = dmRepo;
            this.prodRepo = prodRepo;
            this.basketRepo = basketRepo;
        }

        public async Task<Order> CreateOrderASync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress)
        {
            // get basket from the repo
            var basket = await basketRepo.GetBasketAsync(basketId);
            // get items from product repo
            var items = new List<OrderItem>();
                foreach(var item in basket.Items)
                {
                    var productItem = await prodRepo.GetByIdAsync(item.Id);
                    var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name,
                        productItem.PictureUrl);
                    var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
                    items.Add(orderItem);
                }
            // get delivery method from repo
            var deliveryMethod = await dmRepo.GetByIdAsync(deliveryMethodId);
            // calc subtotal
            var subtotal = items.Sum(item => item.Price * item.Quantity);
            // create order
            var order = new Order(buyerEmail, shippingAddress, deliveryMethod, items, subtotal);
            // TODO: save to DB
            
            // return the order
            return order;
        }

        public Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            throw new NotImplementedException();
        }

        public Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            throw new NotImplementedException();
        }
    }
}