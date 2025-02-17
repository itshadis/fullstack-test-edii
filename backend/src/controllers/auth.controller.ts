import { Request, Response } from 'express'
import { checkPassword, hashing } from '../utils/hashing'
import { signJWT, verifyJWT } from '../utils/jwt'
import { v4 as uuidv4 } from 'uuid'
import { createUser, findUserByEmail } from '../services/auth.service'

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { nama, email, password } = req.body

    if (!nama || !email || !password) {
      return res.status(400).json({ error: "Semua field harus diisi" });
    }

    const value = {
      id: uuidv4(),
      nama,
      email,
      password: `${hashing(password)}`,
      role: 'user'
    }

    createUser(value)
    return res.status(201).send({
      status: true,
      statusCode: 201,
      message: 'Create user success'
    })
  } catch (error) {
    console.log('Err', error)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error
    })
  }
}

export const createSession = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user: any = await findUserByEmail(email)
    const isValid = checkPassword(password, user.password)

    if (!isValid) {
      return res.status(401).send({
        status: false,
        statusCode: 401,
        message: 'Invalid email or password'
      })
    }

    const accessToken = signJWT({ ...user }, { expiresIn: '1d' })
    const refreshToken = signJWT({ ...user }, { expiresIn: '1y' })
    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: 'Login Success',
      data: { accessToken, refreshToken }
    })
  } catch (error: any) {
    console.log('Err', error)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.message
    })
  }
}