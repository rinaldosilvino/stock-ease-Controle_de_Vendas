import { Router } from "express";
import { createProductController } from "../controllers/products/createProduct.controller";
import { listOneProductController } from "../controllers/products/listOneProduct.controller";
import { deleteProductController } from "../controllers/products/deleteProduct.controller";
import { authAdmMiddleware } from "../middlewares/authAdm.middleware";
import { verifyAuthToken } from "../middlewares/verifyAuthToken.middleware";
import { updateProductController } from "../controllers/products/updateProduct.controller";
import { listAllProductsController } from "../controllers/products/listAllProducts.controller";

const routes = Router();

const productsRoutes = () => {
	routes.get("/", verifyAuthToken, listAllProductsController);
	routes.get("/:id", verifyAuthToken, listOneProductController);
	routes.post("/", verifyAuthToken, authAdmMiddleware, createProductController);
	routes.patch("/:id", verifyAuthToken, authAdmMiddleware, updateProductController);
	routes.delete("/:id", verifyAuthToken, authAdmMiddleware, deleteProductController);

	return routes;
};

export default productsRoutes;
