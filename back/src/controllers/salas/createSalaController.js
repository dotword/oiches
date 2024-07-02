import insertSalaService from '../../services/salas/insertSalaService.js';

// FALTA VALIDACION POR JOI
const createSalaController = async (req, res, next) => {
    try {
        const {
            nombre,
            provincia,
            capacidad,
            descripcion,
            precios,
            direccion,
            condiciones,
            equipamiento,
            email,
        } = req.body;

        const { id } = req.user;

        const salaId = await insertSalaService(
            id,
            nombre,
            provincia,
            capacidad,
            descripcion,
            precios,
            direccion,
            condiciones,
            equipamiento,
            email
        );

        res.send({
            satus: 'ok',
            data: {
                sala: {
                    id: salaId,
                    usuario_id: req.user.id,
                    nombre,
                    provincia,
                    capacidad,
                    descripcion,
                    precios,
                    direccion,
                    condiciones,
                    equipamiento,
                    email,
                    createdAt: new Date(),
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

export default createSalaController;
