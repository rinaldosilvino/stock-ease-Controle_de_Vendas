import { AppDataSource } from "../../data-source";
import { Products } from "../../entities/products.entity";
import { AppError } from "../../errors/appError";

export const listAllProductsService = async () => {
	const products = await AppDataSource.getRepository(Products).find();

	if (!products) {
		throw new AppError(404, "No products found.");
	}

	return products;
};
