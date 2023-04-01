import { Request, Response } from "express";
import listCustomersService from "../../services/customers/listCustomers.service";


const listCustomersController = async (req: Request, res: Response) => {

        const customersList = await listCustomersService()

        return res.status(200).json(customersList)

}

export default listCustomersController