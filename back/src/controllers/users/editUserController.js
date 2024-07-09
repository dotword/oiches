import updateUserService from "../../services/users/updateUserService.js";
import generateErrorsUtil from "../../utils/generateErrorsUtil.js";
import selectUserByIdService from "../../services/users/selectUserByIdService.js";

const editUserController = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { email, avatar } = req.body;
    const { id } = req.user;

    // Verificar si el usuario que se quiere modificar es el usuario logueado
    if (id == userId) {
      // Obtener los datos actuales del usuario
      const currentUser = await selectUserByIdService(userId);

      // Actualizar solo los campos que se proporcionan
      const updatedFields = {};
      if (email !== undefined) {
        updatedFields.email = email;
      }
      if (avatar !== undefined) {
        updatedFields.avatar = avatar;
      }

      // Llamar al servicio para actualizar el usuario
      await updateUserService(userId, updatedFields);

      res.send({
        status: 'ok',
        message: 'Usuario modificado correctamente',
      });
    } else {
      throw generateErrorsUtil('No se puede realizar esta acción', 403);
    }
  } catch (error) {
    next(error);
  }
};

export default editUserController;
