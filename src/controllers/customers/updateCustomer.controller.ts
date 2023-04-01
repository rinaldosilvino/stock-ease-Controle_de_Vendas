import { Request, Response } from "express";
import { updateCustomerService } from "../../services/customers/updateCustomer.service";

export const updateCustomerController=async (req: Request, res: Response) => {

        const id = req.params.cpf;
        const { name } = req.body;
    
        const updatedUser = await updateCustomerService(id, { name });
    
        return res.status(200).json(updatedUser);
    
}