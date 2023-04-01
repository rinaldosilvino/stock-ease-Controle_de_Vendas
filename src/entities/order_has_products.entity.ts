import {
  AfterInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Products } from './products.entity';
import { Orders } from './orders.entity';
import { AppDataSource } from '../data-source';

@Entity('order_has_products')
export class Order_has_products {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ type: 'int' })
  count: number;

  @ManyToOne(() => Orders, (order) => order.order_has_products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  orders: Orders;

  @ManyToOne(() => Products, (product) => product.order_has_products, {
    eager: true,
  })
  @JoinColumn({ name: 'product_id' })
  product: Products;

  @AfterInsert()
  async updateInventory() {
    const productRepository = AppDataSource.getRepository(Products);

    this.product.quantity -= this.count;

    await productRepository.save(this.product);
  }
}
