import crearMensajeService from "../../services/mensajes/crearMensajeService.js";


const crearMensajeController = async (req, res,next) => {
  try {
    // Extraer datos
    
    const { id } = req.user;
    console.log(id,'id');

    const { idConversacion, texto,idDestinatario } = req.body;
    // Crear mensaje
    const mensaje = await crearMensajeService(id, idConversacion, texto, idDestinatario);
    // Enviar respuesta
    res.send({
      status: 'ok',
      message: 'Mensaje creado',
      data: mensaje
    });
  } catch (error) {
    next(error);
  }
}
export default crearMensajeController;