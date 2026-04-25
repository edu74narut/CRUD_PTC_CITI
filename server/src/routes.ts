import express from "express";
import {  countOfPares, createProduct, deleteProduct, getByMarca, getByTamanho, readAllProducts, updateProduct } from "./controllers/UserController";


const routes = express.Router();

routes.post("/shoes", createProduct);
routes.get("/shoes", readAllProducts);
routes.patch("/shoes/:id", updateProduct);
routes.delete("/shoes/:id", deleteProduct);
routes.get("/shoes/:tamanho", getByTamanho);
routes.get("/shoes/:marca", getByMarca);
routes.get("/total/sapatos", countOfPares);



export default routes;
