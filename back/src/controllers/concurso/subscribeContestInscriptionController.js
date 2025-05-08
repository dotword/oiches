import getPool from '../../database/getPool.js';

const subscribeContestInscriptionController = async (req, res, next) => {
    try {
        const pool = await getPool();

        const { idGrupo } = req.params;

        await pool.query(
            'UPDATE proyectos_inscritos SET basesConfirmed = 1, projectAcepted = 1, deletedAt = null WHERE id = ?',
            [idGrupo]
        );

        return res.status(200).json({
            message: 'Has activado inscripción al concurso.',
        });
    } catch (error) {
        next(error);
    }
};

export default subscribeContestInscriptionController;
