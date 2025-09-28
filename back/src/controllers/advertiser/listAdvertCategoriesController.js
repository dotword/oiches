import listAdvertCategoriesService from '../../services/advertisers/listAdvertCategoriesService.js';

const listAdvertCategoriesController = async (req, res, next) => {
    try {
        const categories = await listAdvertCategoriesService();
        res.send({
            status: 'ok',
            data: {
                categories,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default listAdvertCategoriesController;
