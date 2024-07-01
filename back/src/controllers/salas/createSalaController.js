import { validationResult } from "express-validator";
import insertSalaService from "../../services/salas/insertSalaService.js";
import userExists from "../../middleware/userExists.js";

const createSalaController = async (req, res, next) => {
    try {
      const { nombre, provincia, genero, capacidad, descripcion, precios, direccion, condiciones, equipamiento, email } = req.body;
  
      const { id, roles } = req.user;
  
      // Verifica que el usuario tenga el rol de 'sala'
      if (roles !== "sala") {
        return res.status(403).json({ error: "No tienes permisos para crear salas" });
      }
  
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() });
      }
  
      const salaId = await insertSalaService(id, nombre, provincia, genero, capacidad, descripcion, precios, direccion, condiciones, equipamiento, email);
  
      res.send({
        satus: "ok",
        data: {
          sala: {
            id: salaId,
            usuario_id: req.user.id,
            nombre,
            provincia,
            genero,
            capacidad,
            descripcion,
            precios,
            direccion,
            condiciones,
            equipamiento,
            email,
            createdAt: new Date(),
          },
        },
      });
    } catch (error) {
      next(error);
    }
  };
  
  export default createSalaController;