import { deleteUserService } from "../../services/users/DeleteUserService.js";



export const deleteUserController = async (req,res,next) =>{
  try {
    const userId = req.user.id
    
    const response = await deleteUserService(userId)
    console.log(response);
    res.status(200).json({
      message:"El usuario se ha eliminado correctamente"
    })
  } catch (error) {
    console.log(error);
    next(error)
  }
}