import { Request, Response } from "express";
import listOrdersCustomerByCpfService from "../../services/orders/listOrdersCustomerByCpf.service";

const listOrdersCustomerByCpfController = async (req: Request, res: Response) => {
  const { id: customer_cpf } = req.params;

  const listOrdersCustomerByCpf = await listOrdersCustomerByCpfService(customer_cpf);

  return res.status(200).json(listOrdersCustomerByCpf);
};

export default listOrdersCustomerByCpfController;
