import getAdvertClicksService from '../../services/advertisers/getAdvertClicksService.js';

const getAdvertClicksController = async (req, res, next) => {
    try {
        const classifiedId = req.params.id;
        if (!classifiedId || typeof classifiedId !== 'string') {
            return res
                .status(400)
                .send({ status: 'error', message: 'Invalid id' });
        }

        const clicks = await getAdvertClicksService(classifiedId);
        return res.status(200).send({ status: 'ok', classifiedId, clicks });
    } catch (error) {
        next(error);
    }
};

export default getAdvertClicksController;
