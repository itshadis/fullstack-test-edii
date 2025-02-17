import 'dotenv/config'  
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_KEY as string;

if (!JWT_SECRET) {
  throw new Error("JWT_KEY is not defined in environment variables");
}

export const signJWT = (payload: Object, options: jwt.SignOptions | undefined) => {
  return jwt.sign(payload, JWT_SECRET, {
    ...(options && options),
    algorithm: 'HS256'
  })
}

export const verifyJWT = (token: string) => {
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET)

    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === 'jwt is expired or not eligable to use',
      decoded: null
    }
  }
}