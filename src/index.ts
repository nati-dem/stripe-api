import express from "express";
import dotenv from "dotenv";
import {paymentRouter} from "./routes/payment.router";

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json())
app.use("/payment", paymentRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${port}`);
});
