import { Request, Response } from "express";
import { deleteOrderService } from "../../services/orders/deleteOrder.service";

export const deleteOrderController = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteOrderService(id);

  return res.status(204).json();
};
