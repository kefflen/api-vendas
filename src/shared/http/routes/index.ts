import productsRouter from '@modules/products/routes/products.routes'
import { assert } from 'console'
import { Router } from 'express'

const routes = Router()

routes.get('/', (req, res) => {
  return res.json({message: 'hello dev'})
})
routes.use('/products', productsRouter)


export default routes
