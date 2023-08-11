import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { Basket } from 'src/app/models/basket';
import { Address } from 'src/app/models/user';
import { NavigationExtras, Router } from '@angular/router';
import { Stripe, StripeCardCvcElement, StripeCardExpiryElement, StripeCardNumberElement, loadStripe } from '@stripe/stripe-js';
import { firstValueFrom } from 'rxjs';
import { OrderToCreate } from 'src/app/models/order';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit{
  @Input() checkoutForm?: FormGroup;
  @ViewChild('cardNumber') cardNumberElement?: ElementRef;
  @ViewChild('cardExpiry') cardExpiryElement?: ElementRef;
  @ViewChild('cardCvc') cardCvcElement?: ElementRef;
  stripe: Stripe | null = null; 
  cardNumber?: StripeCardNumberElement;
  cardExpiry?: StripeCardExpiryElement;
  cardCvc?: StripeCardCvcElement;
  cardErrors: any; 
  loading = false; 

  constructor(private basketService: BasketService, private checkoutService: CheckoutService,
    private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    loadStripe("pk_test_51Nb8QJIDCbj4Tbu8iQsBaTtnGhznxQkqDiTkXRPXNihg4y96ysAJNDWJiOu7ChboAU9CpAS6vOnhJ1ruPlbFhyuZ00FgvzORiR")
      .then(stripe => {
        this.stripe = stripe
        const elements = stripe?.elements();
        if(elements) { 
          this.cardNumber = elements.create('cardNumber')
          this.cardNumber.mount(this.cardNumberElement?.nativeElement);
          this.cardNumber.on("change", event => { 
            if (event.error) this.cardErrors = event.error.message;
            else this.cardErrors = null;
          });

          this.cardExpiry = elements.create('cardExpiry')
          this.cardExpiry.mount(this.cardExpiryElement?.nativeElement);
          this.cardExpiry.on("change", event => { 
            if (event.error) this.cardErrors = event.error.message;
            else this.cardErrors = null;
          });

          this.cardCvc = elements.create('cardCvc')
          this.cardCvc.mount(this.cardCvcElement?.nativeElement);
          this.cardCvc.on("change", event => { 
            if (event.error) this.cardErrors = event.error.message;
            else this.cardErrors = null;
          });
        }
      })
  }

  async submitOrder() {
    this.loading = true;
    const basket = this.basketService.getCurrentBasketValue();
    try {
      const createdOrder = await this.createOrder(basket);
      const paymentResult = await this.confirmPaymentWithStripe(basket);
      if (paymentResult.paymentIntent) { 
        this.basketService.deleteLocalBasket();
        const navigationExtras: NavigationExtras = { state: createdOrder};
        this.router.navigate(['checkout/success'], navigationExtras);
      } else { 
        this.toastr.error(paymentResult.error.message)
      }

    } catch (error: any) {
      console.log(error);
      this.toastr.error(error.message);
    } finally { 
      this.loading = false; 
    }

  
  }
  private async confirmPaymentWithStripe(basket: Basket | null) {
    if (!basket) throw new Error('Basket is null');
    const result = this.stripe?.confirmCardPayment(basket.clientSecret!, {
      payment_method: { 
        card: this.cardNumber!,
        billing_details: { 
          name: this.checkoutForm?.get('paymentForm')?.get('nameOnCard')?.value
        }
      }
    })
    if (!result) throw new Error('Problem attempting payment with Stripe');
    return result
  }
  private async createOrder(basket: Basket | null) {
    if (!basket) throw new Error('Basket is null');
    
    const orderToCreate = this.getOrderToCreate(basket);
    return firstValueFrom(this.checkoutService.createOrder(orderToCreate))
  }

  private getOrderToCreate(basket: Basket): OrderToCreate {
    const deliveryMethodId = this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value;
    const shipToAddress = this.checkoutForm?.get('addressForm')?.value as Address;

    if (!deliveryMethodId || !shipToAddress) throw new Error("Problem in basket: OrderToCreate");
    return {
      BasketId: basket.id,
      DeliveryMethodId: deliveryMethodId,
      ShipToAddress: shipToAddress,
    }

  }
}
