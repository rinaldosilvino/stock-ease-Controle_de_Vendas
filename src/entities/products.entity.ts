import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order_has_products } from './order_has_products.entity';

@Entity('products')
export class Products {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @OneToMany(
    () => Order_has_products,
    (order_has_products) => order_has_products.product
  )
  order_has_products: Order_has_products[];
}
