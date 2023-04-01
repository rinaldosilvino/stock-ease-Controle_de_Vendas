import { Response, Request } from "express";
import { listAllProductsService } from "../../services/products/listAllProducts.service";

export const listAllProductsController = async (req: Request, res: Response) => {
	const products = await listAllProductsService();

	return res.status(200).json({ products: products });
};
