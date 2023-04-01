import { Router } from "express";

import listOrdersCustomerByCpfController from "../controllers/orders/listOrdersCustomerByCpf.controller";
import { createOrderController } from "../controllers/orders/createOrder.controller";
import { deleteOrderController } from "../controllers/orders/deleteOrder.controller";
import { listOrdersController } from "../controllers/orders/listOrders.controller";
import { verifyAuthToken } from "../middlewares/verifyAuthToken.middleware";
import { authAdmMiddleware } from "../middlewares/authAdm.middleware";

const routes = Router();

const ordersRoutes = () => {
  routes.post("", verifyAuthToken, createOrderController);
  routes.get("", verifyAuthToken, listOrdersController);
  routes.get("/customer/:id", verifyAuthToken, listOrdersCustomerByCpfController);
  routes.delete("/:id", verifyAuthToken, authAdmMiddleware, deleteOrderController);

  return routes;
};

export default ordersRoutes;
