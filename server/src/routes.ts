// Aqui configuramos as rotas que serão utilizadas, cada uma é definida por uma função.
import express from "express";
import {  countOfPares, createProduct, deleteProduct, getByMarca, getByTamanho, readAllProducts, updateProduct } from "./controllers/UserController";


const routes = express.Router();

routes.post("/shoes", createProduct);
routes.get("/shoes", readAllProducts);
routes.patch("/shoes/:id", updateProduct);
routes.delete("/shoes/:id", deleteProduct);
// Teria como eu deixar a url mais parecida? fazer ele ser sensível ao dado?
routes.get("/shoes/tamanho/:tamanho", getByTamanho);
routes.get("/shoes/marca/:marca", getByMarca);
routes.get("/total/sapatos", countOfPares);



export default routes;
