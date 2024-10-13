const joiErrorMessages = {
    'any.required': 'El campo "{#key}" es requerido',
    'string.base': 'El valor de "{#key}" debe ser una cadena',
    'string.alphanum':
        'El valor de "{#key}" solo puede contener caracteres alfanuméricos y ningún espacio',
    'string.empty': 'El campo "{#key}" no debe estar vacío',
    'string.uri': 'El campo "{#key}"  debe una URL válida',
    'number.base': 'El valor de "{#key}" debe ser un número',
    'number.max': 'El archivo no debe exceder los 3 MB',
    'object.base': 'Solo puedes subir un@ {#key} al mismo tiempo',
    'any.only': 'Solo se permiten fotos jpeg, png o webp',
    'string.email': 'Debe proporcionar un correo electrónico válido.',
    'string.pattern.base':
        'La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo de puntuación."',
    'string.min': 'El campo "{#key}" debe tener al menos {#limit} caracteres',
    'string.max': 'El campo "{#key}" no debe exceder los {#limit} caracteres',
    'object.unknown': 'No se permiten campos adicionales en este objeto',
    'data.base': 'El campo debe ser una fecha válida',
};

export default joiErrorMessages;
