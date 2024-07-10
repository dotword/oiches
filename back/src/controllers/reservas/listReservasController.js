import { listReservaService } from "../../services/reservas/listReservasServices.js";

export const listReservaController = async (req,res,next) =>{
try {
  const { token } = req.headers;
 const reservas = await listReservaService(token)
 return res.status(200).json({
  reservas 
 })
} catch (error) {
  console.log(error);
  next(error)
}
}