import express from "express";
import { AddNewCoupon } from "../controllers/couponsController.js";

const couponsRouter = express.Router();

couponsRouter.post('/', AddNewCoupon);
// cartRouter.get('/', ItemByEmail);
// cartRouter.get('/:id', ItemById);
// cartRouter.delete("/:id", deleteItem);

export default couponsRouter;
