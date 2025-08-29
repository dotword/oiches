import getAdvertDetailsService from '../../services/advertisers/getAdvertDetailsService.js';

const getAdvertDetailsController = async (req, res, next) => {
    try {
        const { idAdvert } = req.params;

        const advert = await getAdvertDetailsService(idAdvert);

        res.send({
            status: 'ok',
            advert,
        });
    } catch (error) {
        next(error);
    }
};

export default getAdvertDetailsController;
