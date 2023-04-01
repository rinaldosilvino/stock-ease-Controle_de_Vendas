import { Request, Response } from "express";
import { listOrdersService } from "../../services/orders/listOrders.service";

export const listOrdersController = async (req: Request, res: Response) => {
	const listOrders = await listOrdersService();

	return res.status(200).json(listOrders);
};

