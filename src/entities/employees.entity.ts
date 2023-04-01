import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Orders } from "./orders.entity";

@Entity("employees")
export class Employees {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ name: "is_adm", default: false })
  isAdm: boolean;

  @Column({ name: "is_active", default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => Orders, (order) => order.employees)
  orders: Orders[];
}
