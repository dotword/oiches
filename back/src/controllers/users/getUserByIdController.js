import selectUserByIdService from "../../services/users/selectUserByIdService.js";


const getUserByIdController = async (req, res,next) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const user = await selectUserByIdService(userId);
    console.log(user,'user controller');
    res.json(user);
  } catch (error) {
    next(error)
  }
}
export default getUserByIdController;