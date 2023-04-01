import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Customers } from "./customers.entity";
import { Employees } from "./employees.entity";
import { Order_has_products } from "./order_has_products.entity";

@Entity("orders")
export class Orders {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  total: number;

  @Column()
  payment: string;

  @OneToMany(() => Order_has_products, (order_has_products) => order_has_products.orders, {
    eager: true,
  })
  order_has_products: Order_has_products[];

  @ManyToOne(() => Customers, (customers) => customers.order, { eager: true })
  @JoinColumn({ name: "customer_id" })
  customers: Customers;

  @ManyToOne(() => Employees, (employees) => employees.orders)
  @JoinColumn({ name: "employee_id" })
  employees: Employees;
}
