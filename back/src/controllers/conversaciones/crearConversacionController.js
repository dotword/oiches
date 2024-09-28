import { crearConversacionService } from "../../services/conversaciones/crearConversacionService.js";


const crearConversacionController = async (req, res, next) => {
  try {
    const { id } = req.user;  // ID del usuario logueado
    const { idUsuarioDestino } = req.body;

    // Crear conversación
    const conversacion = await crearConversacionService(id, idUsuarioDestino);

    console.log("Conversación creada:", conversacion);

    // Enviar respuesta
    res.send({
      status: 'ok',
      message: 'Conversación creada',
      data: conversacion,  // Aquí enviamos la conversación completa
    });
  } catch (error) {
    next(error);
  }
};


export default crearConversacionController;