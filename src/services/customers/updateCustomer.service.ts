import { AppDataSource } from "../../data-source";
import { Customers } from "../../entities/customers.entity";
import { AppError } from "../../errors/appError";
import { ICustomersRequest, IUpdateCustomersRequest } from "../../interfaces/customers";


export const updateCustomerService = async (customerId: string, { name }: IUpdateCustomersRequest):Promise<ICustomersRequest> => {

	const customerRepository = AppDataSource.getRepository(Customers);
	const findcustomer = await customerRepository.findOneBy({ cpf: customerId });

	if (!findcustomer) {
		throw new AppError(404, "Can't found customer");
	}

	await customerRepository.update(customerId, {
		name: name? name: findcustomer.name
	});

	const customer = await customerRepository.findOneBy({ cpf: customerId });
	const { cpf,name: customerName } = customer!;

	return { cpf, name};
};