import listAdvertPackagesService from '../../services/advertisers/listAdvertPackagesService.js';

const listAdvertPackagesController = async (req, res, next) => {
    try {
        const packages = await listAdvertPackagesService();
        res.send({
            status: 'ok',
            data: {
                packages,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default listAdvertPackagesController;
