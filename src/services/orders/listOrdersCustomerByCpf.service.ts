import { AppDataSource } from "../../data-source";
import { Customers } from "../../entities/customers.entity";
import { Orders } from "../../entities/orders.entity";
import { Order_has_products } from "../../entities/order_has_products.entity";
import { AppError } from "../../errors/appError";

const listOrdersCustomerByCpfService = async (customer_cpf: string) => {
  const customerRepository = AppDataSource.getRepository(Customers);
  const orderProductRepository = AppDataSource.getRepository(Order_has_products);
  const orderRepository = AppDataSource.getRepository(Orders);

  const customer = await customerRepository.findOneBy({ cpf: customer_cpf });

  if (!customer) {
    throw new AppError(404, "Customer not found");
  }

  const listOrder = await orderRepository.find({
    where: {
      customers: {
        cpf: customer_cpf,
      },
    },
  });

  return listOrder;
};

export default listOrdersCustomerByCpfService;
