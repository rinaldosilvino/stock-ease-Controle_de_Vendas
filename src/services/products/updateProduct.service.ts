import { AppDataSource } from "../../data-source";
import { Products } from "../../entities/products.entity";
import { AppError } from "../../errors/appError";
import { IProductRequest } from "../../interfaces/products";

export const updateProductService = async (id: number, productsUpdates: IProductRequest): Promise<Products> => {
  const productsRepository = AppDataSource.getRepository(Products);

  const findProduct = await productsRepository.findOneBy({ id: id });

  if (!findProduct) {
    throw new AppError(404, "Product not found");
  }

  const { name, price, quantity, photo, is_active } = productsUpdates;

  await productsRepository.update(id, {
    name: name ? name : findProduct.name,
    price: price ? price : findProduct.price,
    quantity: quantity ? quantity : findProduct.quantity,
    isActive: is_active ? is_active : findProduct.isActive,
  });

  const updatedProduct = await productsRepository.findOneBy({ id: id });

  return updatedProduct!;
};
