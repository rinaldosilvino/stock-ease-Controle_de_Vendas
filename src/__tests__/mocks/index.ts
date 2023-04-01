import { ICustomersRequest } from "../../interfaces/customers";
import { ILoginEmployeeRequest } from "../../interfaces/login";
import { IOrdersRequest } from "../../interfaces/orders";

export const mockedUser = {
  name: "rodrigo",
  password: "1234",
  is_adm: false,
};

export const mockedAdm = {
  name: "admin",
  password: "1234",
  is_adm: true,
};

export const userAdmLogin: ILoginEmployeeRequest = {
  name: "admin",
  password: "1234",
};

export const userLogin: ILoginEmployeeRequest = {
  name: "rodrigo",
  password: "1234",
};

export const mockedCustomer: ICustomersRequest = {
  cpf: "00000",
  name: "Cliente Padrão",
};

export const mockedPayment = {
  type: "Dinheiro",
};

export const mockedProduct = {
  name: "Produto A",
  price: 2.99,
  quantity: 30,
};

export const mockedOrder: IOrdersRequest = {
  customer_id: "00000",
  employee_id: 0,
  payment: "Dinheiro",
  products: [],
  total: 9.99,
};
