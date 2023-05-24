import express, { Request, Response } from "express";
import {stripeService} from '../service/stripe-service';
import {PaymentRequest, ErrorMessage} from '../models';
import {logger} from "../config/logger";
import "../config/common";
import _ from 'lodash';

export const paymentRouter = express.Router();

paymentRouter.post("/checkout", async (req: Request, res: Response) => {
    const checkoutRequest: PaymentRequest = req.body;
    const loggerCtx = {
        logTrackingId: req.headers['log-tracking-id'],
        method: "paymentRouter/checkout"
      };

    if(!_.isFinite(checkoutRequest.price) || !_.isFinite(checkoutRequest.quantity)) {
        logger.child(loggerCtx)
            .error(ErrorMessage.INVALID_REQUEST);
        res.status(400)
            .json({ error: ErrorMessage.INVALID_REQUEST });
    } else {
        try {
            const session = await stripeService.createSession(checkoutRequest);
            res.json({ url: session.url });
          } catch (e: any) {
            logger.child(loggerCtx)
                .error(e.message);
            res.status(500)
                .json({ error: e.message })
          }
    }
});

paymentRouter.get("/success", async (_req: Request, res: Response) => {
    res.status(200).send("Payment Success");
});

paymentRouter.get("/cancel", async (_req: Request, res: Response) => {
    res.status(200).send("Payment Cancelled");
});
