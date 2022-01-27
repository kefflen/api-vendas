import AppError from "@shared/errors/AppError"
import { getCustomRepository } from "typeorm"
import Product from "../typeorm/entities/product"
import { ProductRepository } from "../typeorm/repositories/ProductRepository"

interface IRequest {
  name: string,
  price: number,
  quantity: number
}
export class CreateProductService {
  async execute(data: IRequest): Promise<Product> {
    let { name } = data
    const productRepository = getCustomRepository(ProductRepository)
    const productExists = await productRepository.findByName(name)

    if (productExists) throw new AppError('There is already one product with this name')
    const product = await productRepository.create(data)

    return product
  }
}