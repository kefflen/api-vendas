import productsRouter from '@modules/products/routes/products.routes'
import usersRouter from '@modules/users/routes/users.routes'
import { Router } from 'express'

const routes = Router()

routes.get('/', (req, res) => {
  return res.json({message: 'hello dev'})
})
routes.use('/products', productsRouter)
routes.use('/users', usersRouter);

export default routes
