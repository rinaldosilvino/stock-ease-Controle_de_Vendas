import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { Products } from "../../entities/products.entity";
import { IProductRequest } from "../../interfaces/products";

export const createProductService = async (product: IProductRequest) => {
  const productRepository = AppDataSource.getRepository(Products);

  const productExists = await productRepository.findOneBy({ name: product.name });

  if (productExists) {
    throw new AppError(400, "Product already exists.");
  }

  if (!product.name) {
    throw new AppError(400, "Name is required.");
  }

  const newProduct = new Products();
  newProduct.name = product.name;
  newProduct.price = product.price;
  newProduct.quantity = product.quantity;
  newProduct.isActive = product.is_active;

  productRepository.create(newProduct);
  await productRepository.save(newProduct);

  return newProduct;
};
