import getPool from "../../database/getPool.js";
import { v4 as uuid } from "uuid";
import {jwtDecode} from "jwt-decode";
const crearMensajeService = async (usuario_id, idConversacion, texto, idDestinatario) => {
    const pool = await getPool();
    const decoded = jwtDecode(usuario_id);
    const id = uuid();
    if(!texto){
        throw new Error("Faltan texto");
    }
    if(!usuario_id){
        throw new Error("Falta usuario");
    }
    if(!idConversacion){
        throw new Error("Falta conversacion");
      }
    if(!idDestinatario){
        throw new Error("Falta destinatario");
    }
    const [result] = await pool.query(
        `
        INSERT INTO mensajes (id, mensaje, usuario, conversacion,destinatario) VALUES
        (?, ?, ?, ?,?)
    `,
        [id, texto, decoded.id, idConversacion,idDestinatario]
    );
    return result;
}
export default crearMensajeService;
