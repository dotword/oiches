import jwt from 'jsonwebtoken';
import generateErrorUtil from '../utils/generateErrorsUtil.js';
import { JWT_SECRET } from '../../env.js';

const authUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      generateErrorUtil('Se esperaba un token por el encabezado', 401);
    }

    let tokenInfo;

    try {
      tokenInfo = jwt.verify(authorization, JWT_SECRET);
    } catch (err) {
      console.log(err);
      throw generateErrorUtil('Credenciales invalidas', 401);
    }

    // Extraer el ID y el rol del usuario del token desencriptado
    const { id, roles } = tokenInfo;

    // Crear la propiedad "user" en el objeto "request" con el ID y el rol
    req.user = { id, roles };

    next();
  } catch (err) {
    next(err);
  }
};

export default authUser;