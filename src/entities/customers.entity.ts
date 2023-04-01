import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Orders } from './orders.entity';
@Entity('customers')
export class Customers {
  @PrimaryColumn()
  cpf: string;

  @Column({ length: 45 })
  name: string;

  @OneToMany(() => Orders, (order) => order.customers)
  order: Orders[];
}
