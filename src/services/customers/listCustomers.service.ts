import { AppDataSource } from "../../data-source"
import { Customers } from "../../entities/customers.entity"



const listCustomersService = async () => {

    const customersRepository = AppDataSource.getRepository(Customers)

    const customersList = await customersRepository.find()

    return customersList

}

export default listCustomersService