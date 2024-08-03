import { deleteSalaService } from "../../services/salas/deleteSalaService.js";

export const deleteSalaController = async (req, res, next) => {
  try {
    const { idSala } = req.params;
    await deleteSalaService(idSala);
    res.status(200).json({
      message: "La sala se ha eliminado correctamente"
    });
  } catch (error) {
    next(error);
  }
};
