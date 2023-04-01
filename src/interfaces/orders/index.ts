export interface IProduct {
  id: number;
  count: number;
}

export interface IOrdersRequest {
  employee_id: number;
  customer_id: string;
  payment: string;
  products: IProduct[];
  total: number;
}
