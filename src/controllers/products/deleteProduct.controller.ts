import { Request, Response } from "express";
import { deleteProductService } from "../../services/products/deleteProduct.service";

export const deleteProductController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	const result = await deleteProductService(id);

	return res.status(200).send(result);
};
