import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import UsersController from '../controllers/UsersController'
import isAuthenticated from '@shared/http/middlewares/isAuthenticated'
import uploadConfig from '@config/upload'
import userAvatarController from '../controllers/UserAvatarController'
import multer from 'multer'
const usersRouter = Router()
const usersController = new UsersController()

usersRouter.get('/', isAuthenticated, usersController.index)
const upload = multer(uploadConfig);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
)

usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  new userAvatarController().update,
);

export default usersRouter