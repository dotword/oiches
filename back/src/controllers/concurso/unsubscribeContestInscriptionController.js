import getPool from '../../database/getPool.js';

const unsubscribeContestInscriptionController = async (req, res, next) => {
    try {
        const pool = await getPool();

        const { idGrupo } = req.params;

        await pool.query(
            'UPDATE proyectos_inscritos SET basesConfirmed = 0, projectAcepted = 0 WHERE id = ?',
            [idGrupo]
        );

        return res.status(200).json({
            message: 'Has eliminado tu inscripción al concurso.',
        });
    } catch (error) {
        next(error);
    }
};

export default unsubscribeContestInscriptionController;
