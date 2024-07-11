import updateUserService from "../../services/users/updateUserService.js";
import generateErrorsUtil from "../../utils/generateErrorsUtil.js";

const editUserEmailController = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { email} = req.body;
    const { id } = req.user;

    if(id === userId){
      await updateUserService(userId,email)
    }else{
      throw generateErrorsUtil('No se puede realizar esta acción')
    }

      res.send({
        status: 'ok',
        message: 'Usuario modificado correctamente',
      });

  } catch (error) {
    next(error);
  }
};

export default editUserEmailController;
