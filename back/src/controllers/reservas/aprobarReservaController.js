const aprobarReservaController = async (req, res, next) => {
    try {
        // const { registrationCode } = req.params;

        // await updateUserRegCodeService(registrationCode);

        res.send({
            status: 'ok',
            message: 'aprobada la reserva',
        });
    } catch (error) {
        next(error);
    }
};

export default aprobarReservaController;
