import 'reflect-metadata'
import dotenv from 'dotenv'
dotenv.config()
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import 'express-async-errors'
import routes from './routes'
import AppError from '@shared/errors/AppError'
import '@shared/typeorm'

const PORT = 4000
const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)

app.use((error: Error, request: Request, response: Response, nextFunction: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

app.listen(PORT, () => {
  console.log(`Running at: http://localhost:${PORT}`)
})


