import { Address } from "./user"

export interface OrderToCreate {
    BasketId: string;
    DeliveryMethodId: number;
    ShipToAddress: Address;
}

export interface Order {
    buyerEmail: string
    orderDate: string
    shipToAddress: Address
    shippingPrice: number
    deliveryMethod: any
    orderItems: OrderItem[]
    subtotal: number
    total: number
    status: number
    paymentIntentId: any
    id: number
  }
    
  export interface OrderItem {
    price: number
    quantity: number
    productId: number
    productName: string
    pictureUrl: string
  }
  
  
  