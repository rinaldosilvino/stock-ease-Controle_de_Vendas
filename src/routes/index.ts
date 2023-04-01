import { Express } from 'express';
import productsRoutes from './products.routes';
import usersRoutes from './users.routes';
import loginRoutes from './login.routes';
import ordersRoutes from './orders.routes';
import customersRoutes from './customers.routes';

export const appRoutes = (app: Express) => {
  app.use('/products', productsRoutes());
  app.use('/users', usersRoutes());
  app.use('/login', loginRoutes());
  app.use('/orders', ordersRoutes());
  app.use('/customers', customersRoutes())
};
