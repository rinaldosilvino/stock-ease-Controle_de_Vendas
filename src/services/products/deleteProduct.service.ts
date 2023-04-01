import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { Products } from "../../entities/products.entity";

export const deleteProductService = async (id: number) => {
	const productRepository = AppDataSource.getRepository(Products);
	const product = await productRepository.findOneBy({ id });

	if (!product) throw new AppError(401, "Product does not exists.");
	if (product.isActive === false) throw new AppError(401, "Product already deleted.");

    await productRepository.update({ id }, { isActive: false });
    
    return true;
};
