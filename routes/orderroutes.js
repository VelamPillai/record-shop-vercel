// step 1 : app is not available ,so we can use express.Router() function to re-route

import express from "express";

import {
  getOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
  createOrder,
} from "../controller/ordercontroller.js";
import { isAdminOrder } from "../middleware/isAdminOrder.js";
import verifyToken from "../middleware/verifyToken.js";

const route = express.Router();

//route GET
route.get("/", verifyToken, isAdminOrder, getOrders);

//get single order //Route GET '/orders/:id'
route.get("/:id", verifyToken, isAdminOrder, getSingleOrder);

//route post '/orders'
route.post("/", verifyToken, createOrder);

//route patch '/orders/:id'
route.patch("/:id", verifyToken, updateOrder);

//route delete '/orders/:id'
route.delete("/:id", verifyToken, deleteOrder);

export default route;
