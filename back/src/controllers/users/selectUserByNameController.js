import selectUserByNameService from '../../services/users/selectUsersByNameService.js';

const selectUserByNameController = async (req, res, next) => {
    try {
        const { name } = req.params;

        const user = await selectUserByNameService(name);

        res.send({
            status: 'ok',
            data: user,
        });
    } catch (error) {
        next(error);
    }
};
export default selectUserByNameController;
