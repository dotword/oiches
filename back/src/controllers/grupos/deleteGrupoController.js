import { deleteGrupoService } from '../../services/grupos/deleteGrupoService.js';

export const deleteGrupoController = async (req, res, next) => {
    try {
        const { idGrupo } = req.params;
        await deleteGrupoService(idGrupo);
        res.status(200).json({
            message: 'El grupo se ha eliminado con exito.',
        });
    } catch (error) {
        next(error);
    }
};
