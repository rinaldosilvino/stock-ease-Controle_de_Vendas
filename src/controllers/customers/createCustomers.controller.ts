import { Request, Response } from "express";
import { createCustomersService } from "../../services/customers/createCustomers.service";

export const createCustomersController = async (req: Request, res: Response) => {
    const { cpf, name } = req.body;

    const customer = await createCustomersService({ cpf, name });

    return res.status(201).json(customer);
};