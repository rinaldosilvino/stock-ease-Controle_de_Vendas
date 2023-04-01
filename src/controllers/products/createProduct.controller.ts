import { Response, Request } from "express";
import { IProductRequest } from "../../interfaces/products";
import { createProductService } from "../../services/products/createProduct.service";

export const createProductController = async (req: Request, res: Response) => {
	const product: IProductRequest = req.body;
	const result = await createProductService(product);

	return res.status(201).json(result);
};
