import { Router } from "express";
import { createCustomersController } from "../controllers/customers/createCustomers.controller";
import listCustomersController from "../controllers/customers/listCustomers.controller";
import { updateCustomerController } from "../controllers/customers/updateCustomer.controller";
import { authAdmMiddleware } from "../middlewares/authAdm.middleware";
import { verifyAuthToken } from "../middlewares/verifyAuthToken.middleware";

const routes = Router();

const customersRoutes = () => {
	routes.post("/", verifyAuthToken, authAdmMiddleware, createCustomersController);
	routes.get("/", verifyAuthToken, authAdmMiddleware, listCustomersController);
	routes.patch("/:cpf", verifyAuthToken, authAdmMiddleware, updateCustomerController);

	return routes;
};

export default customersRoutes;
