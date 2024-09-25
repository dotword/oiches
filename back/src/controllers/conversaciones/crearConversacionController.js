import { crearConversacionService } from "../../services/conversaciones/crearConversacionService.js";


const crearConversacionController = async (req, res, next) => {
  try {
    // Extraer datos
    const { id } = req.user;
    console.log(req.user);
    const { idUsuarioDestino } = req.body;

    // Crear conversación
    const conversacion = await crearConversacionService(id, idUsuarioDestino);

    // Enviar respuesta
    res.send({
      status: 'ok',
      message: 'Conversación creada',
      data: conversacion,
    });
  } catch (error) {
    next(error);
  }
}

export default crearConversacionController;