const registerUserController = (req, res, next) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            const error = new Error('Faltan campos');
            error.httpStatus = 400;
            throw error;
        }

        res.send({
            data: {
                email,
                password,
                role,
            },
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export default registerUserController;
