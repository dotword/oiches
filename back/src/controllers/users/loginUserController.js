import getPool from "../../database/getPool.js"
import { compare } from "bcrypt"
import pkg from 'jsonwebtoken'
import { JWT_SECRET } from '../../../env.js'
export const loginUserController = async (req,res,next) =>{
  try {
    const pool = await getPool()
    const { email, password } = req.body
    const [[user]] = await pool.query('SELECT * FROM usuarios WHERE email LIKE ?', [email])
    if (!user) {
      throw {
        status: 400,
        message: 'Credenciales inválidas email',
        code: 'BAD REQUEST'
      }
    }
    if ([email, password].includes('' || undefined)) {
      const error = new Error('Todos los campos son requeridos')
      error.status = 400
      throw error
    }
    const isValidPassword = await compare(password, user.password)
    if (!isValidPassword) {
      throw {
        status: 400,
        message: 'Credenciales invalidas password',
        code: 'Bad Request'
      }
    }
    const token = pkg.sign({
      id: user.id,
      username: user.username,
      avatar: user.avatar
    },
    JWT_SECRET,
    {
      expiresIn: '7d'
    }
    )
    return res.status(200).json({
      ok: true,
      token
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}