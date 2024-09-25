import getMensajesService from "../../services/mensajes/getMensajesService.js";
const getMensajesController = async (req, res,next) => {
try {
  // Extraer datos
  console.log(req.user);
  const { id } = req.user;
  const { idConversacion } = req.params;
  // Obtener mensajes
  const mensajes = await getMensajesService(id, idConversacion);
  // Enviar respuesta
  res.send({
    status: 'ok',
    data: mensajes,
  });
} catch (error) {
  next(error);
}
}

export default getMensajesController