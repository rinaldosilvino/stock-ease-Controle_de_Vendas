import { Request, Response } from "express";
import { updateProductService } from "../../services/products/updateProduct.service";

export const updateProductController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const productUpdates = req.body;

  const updatedProduct = await updateProductService(Number(id), productUpdates);

  return res.status(201).json(updatedProduct);
};
