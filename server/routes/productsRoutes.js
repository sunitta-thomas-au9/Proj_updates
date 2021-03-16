import express from "express";
import { getProducts, addNew, getProductsByName, getProdsById } from "../controllers/productsController.js";

const productsRouter = express.Router();

productsRouter.post('/', addNew);
productsRouter.get('/', getProducts);
productsRouter.get('/:category', getProductsByName);
productsRouter.get('/:id', getProdsById);

export default productsRouter;
