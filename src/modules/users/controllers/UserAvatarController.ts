import AppError from '@shared/errors/AppError'
import { Request, Response } from 'express'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService()
    if (!request.file) throw new AppError('Need to pass a valid image', 400)
    
    const user = updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    })

    return response.json(user)
  }
}