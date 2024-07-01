import { body } from "express-validator";

const validatorSalas = () => {

    return [
        
        body('nombre').trim().notEmpty().withMessage('El nombre no puede estar vacio'),
        
        body('direccion').trim().notEmpty().withMessage('La dirección no puede estar vacio'),

        body('email').trim().notEmpty().withMessage('El email no puede estar vacio')
    ]
}

export default validatorSalas;