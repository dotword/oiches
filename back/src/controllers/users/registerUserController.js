import insertUserService from '../../services/users/insertUserService.js';

const registerUserController = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            const error = new Error('Faltan campos');
            error.httpStatus = 400;
            throw error;
        }

        // insertUserService cuando esté lista la DB

        res.send({
            data: {
                email,
                password,
                role,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default registerUserController;
