import express from "express";
import "./config/common";
import {logger} from "./config/logger";
import {paymentRouter} from "./routes/payment.router";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json())
app.use("/payment", paymentRouter);

app.listen(port, () => {
    logger.info(`Server started at http://localhost:${port}`);
});
