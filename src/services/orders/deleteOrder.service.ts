import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { Orders } from "../../entities/orders.entity";

export const deleteOrderService = async (id: string) => {
  const orderRepository = AppDataSource.getRepository(Orders);
  const order = await orderRepository.findOneBy({ id });

  if (!order) throw new AppError(400, "Order does not exists.");

  await orderRepository.delete({ id });

  return;
};
