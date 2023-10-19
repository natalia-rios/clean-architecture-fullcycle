import type ValidatorInterface from '../../@shared/validator/validator.interface'
import type Product from '../entity/product'
import ProductYupValidator from '../validator/product.yup.validator'

export default class ProductValidatorFactory {
  static create (): ValidatorInterface<Product> {
    return new ProductYupValidator()
  }
}
