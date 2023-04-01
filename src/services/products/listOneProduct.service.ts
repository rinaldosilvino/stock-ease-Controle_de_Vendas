import { AppDataSource } from "../../data-source"
import { Products } from "../../entities/products.entity"
import { AppError } from "../../errors/appError"


export const listOneProductService = async(id:number) => {

    const productRepository = AppDataSource.getRepository(Products)

    const product = await productRepository.findOneBy({ id })

    if(!product){
        throw new AppError(404, 'Product not found')
    }

    return product

}
