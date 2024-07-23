import jwt from 'jsonwebtoken';
import generateErrorUtil from '../utils/generateErrorsUtil.js';
import { JWT_SECRET } from '../../env.js';

const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            throw generateErrorUtil(
                'Se esperaba un token por el encabezado',
                401
            );
        }

        let tokenInfo;

        try {
            tokenInfo = jwt.verify(token, JWT_SECRET);
        } catch (err) {
            throw generateErrorUtil('Credenciales invalidas', 401);
        }

        // Crear la propiedad "user" en el objeto "request" con el ID y el rol
        req.user = tokenInfo;

        next();
    } catch (err) {
        next(err);
    }
};

export default authUser;
