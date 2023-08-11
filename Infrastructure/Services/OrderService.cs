using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IBasketRepository basketRepo;
        private readonly IUnitOfWork unitOfWork;

        public OrderService(IGenericRepository<Order> orderRepo, IGenericRepository<DeliveryMethod> dmRepo,
        IGenericRepository<Product> prodRepo, IBasketRepository basketRepo, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
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
                    var productItem = await unitOfWork.Repository<Product>().GetByIdAsync(item.Id);
                    var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name,
                        productItem.PictureUrl);
                    var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
                    items.Add(orderItem);
                }
            // get delivery method from repo
            var deliveryMethod = await unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);
            // calc subtotal
            var subtotal = items.Sum(item => item.Price * item.Quantity);
            //check if order exists
            var spec = new OrderByPaymentIntentIdSpecification(basket.PaymentIntentId);
            var order = await unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
            if (order != null) { 
                order.ShipToAddress = shippingAddress;
                order.DeliveryMethod = deliveryMethod;
                order.Subtotal = subtotal; 
                unitOfWork.Repository<Order>().Update(order);
            } else {
            // create order
            order = new Order(buyerEmail, shippingAddress, deliveryMethod, items, subtotal, basket.PaymentIntentId);
            unitOfWork.Repository<Order>().Add(order);
            }
            
            // save to DB
            var result = await unitOfWork.Complete();
            if(result <= 0) return null;
            
            // return the order
            return order;
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            return await unitOfWork.Repository<DeliveryMethod>().ListAllAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(id, buyerEmail);

            return await unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(buyerEmail);

            return await unitOfWork.Repository<Order>().ListAsync(spec);
        }
    }
}