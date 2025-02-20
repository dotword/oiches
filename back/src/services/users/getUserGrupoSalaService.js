import getPool from '../../database/getPool.js';
const getUserGrupoSalaService = async (name) => {
    try {
        const pool = await getPool();

        // Consulta para grupos con sus fotos
        const [grupos] = await pool.query(
            `SELECT g.*, gf.name AS foto_url 
                FROM grupos g 
                LEFT JOIN grupo_fotos gf ON g.id = gf.grupoId 
                WHERE g.nombre LIKE ?`,
            [`${name}%`]
        );
        // Agrupar resultados de grupos
        const gruposMap = new Map();
        grupos.forEach((grupo) => {
            const {
                id,
                nombre,
                provincia,
                honorarios,
                honorarios_to,
                biografia,
                usuario_id,
                createdAt,
                updatedAt,
                deletedAt,
                grupoId,
                foto_url,
            } = grupo;
            if (!gruposMap.has(id)) {
                gruposMap.set(id, {
                    id,
                    nombre,
                    provincia,
                    honorarios,
                    honorarios_to,
                    biografia,
                    usuario_id,
                    createdAt,
                    updatedAt,
                    deletedAt,
                    grupoId,
                    fotos: [],
                });
            }
            if (foto_url) {
                gruposMap.get(id).fotos.push(foto_url);
            }
        });
        // Convertir el Map a un array y obtener el primer grupo
        if (gruposMap.size > 0) {
            const resultado = Array.from(gruposMap.values())[0]; // Obtiene el primer grupo
            return resultado;
        }
        // Si no se encontró un grupo, consulta para salas
        const [salas] = await pool.query(
            `SELECT s.*, sf.name AS foto_url 
                FROM salas s 
                LEFT JOIN sala_fotos sf ON s.id = sf.salaId 
                WHERE s.nombre LIKE ?`,
            [`${name}%`]
        );
        // Agrupar resultados de salas
        const salasMap = new Map();
        salas.forEach((sala) => {
            const {
                id,
                nombre,
                provincia,
                honorarios,
                honorarios_to,
                biografia,
                usuario_id,
                createdAt,
                updatedAt,
                deletedAt,
                salaId,
                foto_url,
            } = sala;
            if (!salasMap.has(id)) {
                salasMap.set(id, {
                    id,
                    nombre,
                    provincia,
                    honorarios,
                    honorarios_to,
                    biografia,
                    usuario_id,
                    createdAt,
                    updatedAt,
                    deletedAt,
                    salaId,
                    fotos: [],
                });
            }
            if (foto_url) {
                salasMap.get(id).fotos.push(foto_url);
            }
        });
        // Convertir el Map a un array y obtener la primera sala
        if (salasMap.size > 0) {
            const resultadoSala = Array.from(salasMap.values())[0]; // Obtiene la primera sala

            return resultadoSala;
        }
        return null; // Si no se encuentra ni grupo ni sala
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
    }
};
export default getUserGrupoSalaService;
