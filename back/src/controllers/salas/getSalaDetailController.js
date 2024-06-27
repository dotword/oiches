const getSalaDetailController = async (req, res, next) => {
    try {
        res.send({
            status: 'ok',
            message: 'Detalle de sala',
        });
    } catch (error) {
        next(error);
    }
};

export default getSalaDetailController;
