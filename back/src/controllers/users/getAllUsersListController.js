import selectAllUsersService from '../../services/users/selectAllUsersService.js';

const getAllUsersListController = async (req, res, next) => {
    try {
        const filters = {
            username: req.query.username || '',
            active: req.query.active || '',
            roles: req.query.roles || '',
            salaname: req.query.salaname || '',
            gruponame: req.query.gruponame || '',
            provincia: req.query.provincia || '',
            order: req.query.order || 'DESC',
            page: req.query.page || 1,
            pageSize: req.query.pageSize || 25,
        };
        const user = await selectAllUsersService(filters);

        res.send({
            status: 'ok',
            data: {
                user,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default getAllUsersListController;
