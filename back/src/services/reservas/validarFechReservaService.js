import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const validarFechaReservaService = (fecha) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normaliza la hora
    const reservaFecha = new Date(fecha);
    reservaFecha.setHours(0, 0, 0, 0);

    // Fecha máxima permitida (hoy + 2 años)
    const maxFecha = new Date();
    maxFecha.setFullYear(today.getFullYear() + 2);
    maxFecha.setHours(0, 0, 0, 0);

    if (reservaFecha <= today) {
        throw generateErrorsUtil(
            'No se puede reservar una fecha anterior o igual a hoy.',
            404
        );
    }

    if (reservaFecha > maxFecha) {
        throw generateErrorsUtil(
            'No se puede reservar una fecha más allá de 2 años.',
            404
        );
    }
};

export default validarFechaReservaService;
