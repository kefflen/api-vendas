import AppError from '@shared/errors/AppError'
import { compare } from 'bcryptjs'
import { getCustomRepository } from 'typeorm'
import User from '../typeorm/entities/user'
import UsersRepository from '../typeorm/repositories/UserRepository'
import { sign } from 'jsonwebtoken'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository)
    const user = await usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const passwordConfirmed = await compare(password, user.password)

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401)
    }
    const authsecrets = process.env.AUTHSECRETS
    if (!authsecrets) throw new Error("Authsecrets key on enviroment variables not founded")
    
    const token = sign({}, authsecrets, {subject: user.id, expiresIn: '1d'})
    return { user, token}
  }
}

export default CreateSessionsService