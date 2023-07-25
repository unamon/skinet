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
    deliveryMethod: any
    orderItems: OrderItem[]
    subtotal: number
    status: number
    paymentIntentId: any
    id: number
  }
    
  export interface OrderItem {
    itemOrdered: ItemOrdered
    price: number
    quantity: number
    id: number
  }
  
  export interface ItemOrdered {
    productItemId: number
    productName: string
    pictureUrl: string
  }
  