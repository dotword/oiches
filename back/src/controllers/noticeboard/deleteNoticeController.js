import deleteNoticeService from '../../services/admin/deleteNoticeService.js';

const deleteNoticeController = async (req, res, next) => {
    try {
        const { idNotice } = req.params;

        await deleteNoticeService(idNotice);

        res.status(200).json({
            message: 'El anuncio se ha eliminado correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default deleteNoticeController;
