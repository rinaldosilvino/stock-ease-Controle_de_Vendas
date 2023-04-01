import { AppDataSource } from '../../data-source';
import { Orders } from '../../entities/orders.entity';

export const listOrdersService = async () => {
  const ordersRepository = AppDataSource.getRepository(Orders);

  const listOrders = await ordersRepository.find({
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

  return listOrders;
};

