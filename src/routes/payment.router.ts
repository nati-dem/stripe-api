import express, { Request, Response } from "express";
import stripeService from '../service/stripe-service';
import {PaymentRequest} from '../models/payment-request';
import dotenv from "dotenv";
import _ from 'lodash';
dotenv.config();

export const paymentRouter = express.Router();

paymentRouter.post("/checkout", async (req: Request, res: Response) => {
    const checkoutRequest: PaymentRequest = req.body;
    
    if(_.isEmpty(checkoutRequest.price) || _.isEmpty(checkoutRequest.quantity)) {
        res.status(400).json({ error: 'Invalid request' })
    } else {
        try {
            const session = await stripeService.createSession(checkoutRequest);
            res.json({ url: session.url });
          } catch (e: any) {
            res.status(500).json({ error: e.message })
          }
    }
});

paymentRouter.get("/success", async (_req: Request, res: Response) => {
    res.status(200).send("Payment Success");
});

paymentRouter.get("/cancel", async (_req: Request, res: Response) => {
    res.status(200).send("Payment Cancelled");
});
