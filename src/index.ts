import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${port}`);
});
