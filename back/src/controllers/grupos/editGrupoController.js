const editGrupoController = async (req, res, next) => {
    try {
        console.log('hola desde grupo controller');
        res.send({
            status: 'ok',
            message: 'Grupo actualizado!!',
        });
    } catch (error) {
        next(error);
    }
};

export default editGrupoController;
