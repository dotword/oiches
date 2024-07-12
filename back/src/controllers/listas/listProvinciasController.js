import listProvinciasService from '../../services/listas/listProvinciasService.js';

const listProvinciasController = async (req, res, next) => {
    try {
        const provincias = await listProvinciasService();
        res.send({
            status: 'ok',
            data: {
                provincias,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default listProvinciasController;
