import Stripe from 'stripe';
import {PaymentRequest} from '../models/payment-request';
import "../config/common";

class StripeService {

    stripe: Stripe;

    constructor(){
        this.stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY), {
            apiVersion: '2022-11-15',
            typescript: true
          });
    }

    createSession = async (checkoutReq: PaymentRequest) => {
        //todo needs fix!
        const priceInCents = checkoutReq.price * 100;
        return await this.stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [{
              price_data: {
                currency: "usd",
                product_data: {
                  name: checkoutReq.name,
                },
                unit_amount: priceInCents,
              },
              quantity: checkoutReq.quantity,
            }],
            success_url: `${process.env.PAYMENT_CLIENT_URL}/success`,
            cancel_url: `${process.env.PAYMENT_CLIENT_URL}/cancel`,
          });
    }

}

export const stripeService = new StripeService();
