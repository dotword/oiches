import getAdvertiserDetailsService from '../../services/advertisers/getAdvertiserDetailsService.js';

const getAdvertiserDetailsController = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const advertiserDetails = await getAdvertiserDetailsService(userId);

        res.send({
            status: 'ok',
            advertiserDetails,
        });
    } catch (error) {
        next(error);
    }
};

export default getAdvertiserDetailsController;
