import { AppDataSource } from "../../data-source";
import { Customers } from "../../entities/customers.entity";
import { Employees } from "../../entities/employees.entity";
import { Orders } from "../../entities/orders.entity";
import { Order_has_products } from "../../entities/order_has_products.entity";

import { Products } from "../../entities/products.entity";
import { AppError } from "../../errors/appError";
import { IOrdersRequest } from "../../interfaces/orders";

export const createOrderService = async ({
  customer_id,
  employee_id,
  payment,
  products,
  total,
}: IOrdersRequest) => {
  const orderRepository = AppDataSource.getRepository(Orders);
  const productRepository = AppDataSource.getRepository(Products);
  const orderProductRepository = AppDataSource.getRepository(Order_has_products);
  const employeeRepository = AppDataSource.getRepository(Employees);
  const customerRepository = AppDataSource.getRepository(Customers);

  if (products.length === 0) {
    throw new AppError(400, "Can't sell without products");
  }

  const employee = await employeeRepository.findOneBy({ id: employee_id });

  if (!employee) {
    throw new AppError(404, "Employee not found");
  }

  const customer = await customerRepository.findOneBy({ cpf: customer_id });

  if (!customer) {
    throw new AppError(404, "Customer not found");
  }

  if (!payment) {
    throw new AppError(404, "Payment not found");
  }

  const newOrder = orderRepository.create({
    employees: employee,
    customers: customer,
    payment: payment,
    total,
  });

  await orderRepository.save(newOrder);
  const orderProduct: Order_has_products[] = [];

  for (let i = 0; i < products.length; i++) {
    const productToAdd = await productRepository.findOneBy({
      id: products[i].id,
      isActive: true,
    });

    if (!productToAdd) {
      await orderRepository.delete(newOrder.id);
      throw new AppError(404, `Product ${products[i].id} not found`);
    }

    if (productToAdd.quantity <= 0 || productToAdd.quantity < products[i].count) {
      await orderRepository.delete(newOrder.id);
      throw new AppError(400, "Insufficient quantity");
    }

    const newOrderProduct = orderProductRepository.create({
      orders: newOrder,
      count: products[i].count,
      product: productToAdd,
    });

    orderProduct.push(newOrderProduct);
  }

  await orderProductRepository.save(orderProduct);

  const order = await orderRepository.findOne({
    where: {
      id: newOrder.id,
    },
    select: {
      employees: {
        id: true,
        name: true,
        isAdm: true,
      },
    },
    relations: {
      employees: true,
    },
  });

  return order;
};
