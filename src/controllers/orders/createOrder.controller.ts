import { Request, Response } from "express";
import { createOrderService } from "../../services/orders/createOrder.service";

export const createOrderController = async (req: Request, res: Response) => {
  const { customer_id, payment, products, total } = req.body;
  const { id: employee_id } = req.user;

  const newOrder = await createOrderService({
    customer_id,
    employee_id,
    payment,
    products,
    total,
  });

  return res.status(201).json(newOrder);
};
