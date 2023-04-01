import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { ICustomersRequest } from "../../interfaces/customers";
import { Customers } from "../../entities/customers.entity";

export const createCustomersService = async ({ cpf, name }: ICustomersRequest) => {
    const customersRepository = AppDataSource.getRepository(Customers);
    const customer = await customersRepository.findOneBy({ cpf });

	if (customer) {
		throw new AppError(400, "Customer already exists");
	}

    const newCustomer = new Customers();
    newCustomer.cpf = cpf;
    newCustomer.name = name;

    customersRepository.create(newCustomer);
    await customersRepository.save(newCustomer);

	return newCustomer;
};

	