import { Router } from 'express'
import { registerUser, createSession } from '../controllers/auth.controller'

const AuthRouter: Router = Router()

AuthRouter.post('/register', registerUser)
AuthRouter.post('/login', createSession)

export default AuthRouter