import { Request, Response } from "express";
import { listOneProductService } from "../../services/products/listOneProduct.service";

export const listOneProductController = async (req: Request, res: Response) => {
	const id = req.params.id;

	const product = await listOneProductService(Number(id));

	return res.json(product);
};
