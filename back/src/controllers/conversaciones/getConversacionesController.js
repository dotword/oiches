import getConversacionesService from "../../services/conversaciones/getConversacionesService.js";
const getConversacionesController = async (req, res,next) => {
  try {
    // Extraer datos
    const { id } = req.user;
    // Obtener conversaciones
    const conversaciones = await getConversacionesService(id);
    // Enviar respuesta
    res.send({
      status: 'ok',
      data: conversaciones,
    });
  }
  catch (error) {
    next(error);
  }
}
export default getConversacionesController