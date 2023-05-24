import express from "express";
import "./config/common";
import {paymentRouter} from "./routes/payment.router";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json())
app.use("/payment", paymentRouter);

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
