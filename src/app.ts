import express, { Application, json, Request, Response } from "express";
import {
  createProduct,
  delProduct,
  listAllProducts,
  listProductId,
  updateProduct,
} from "./logic";
import { filterProductBySection, idChecked, nameChecked } from "./middlewares";

const app: Application = express();
app.use(json());

app.post("/products", nameChecked, createProduct);
app.get("/products", filterProductBySection, listAllProducts);
app.get("/products/:id", idChecked,listProductId);
app.patch("/products/:id",idChecked, updateProduct);
app.delete("/products/:id",idChecked, delProduct);

const PORT: number = 3000;
const runningMsg: string = `Server running on Port ${PORT}`;

app.listen(PORT, () => {
  console.log(runningMsg);
});
