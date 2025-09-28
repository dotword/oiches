import incrementAdvertClickService from '../../services/advertisers/incrementAdvertClickService.js';

const clickAdvertController = async (req, res, next) => {
    try {
        const classifiedId = req.params.id;
        if (!classifiedId || typeof classifiedId !== 'string') {
            return res
                .status(400)
                .send({ status: 'error', message: 'Invalid id' });
        }

        // Extra metadata opcional (audit log)
        const extra = {
            logClick: true, // cambia a false si no quieres guardar cada click
            userId: req.user?.id ?? null,
            ip: req.ip || req.headers['x-forwarded-for'] || null,
            userAgent: req.get('User-Agent') || null,
        };

        const clicks = await incrementAdvertClickService(classifiedId, extra);

        return res.status(200).send({
            status: 'ok',
            classifiedId,
            clicks,
        });
    } catch (error) {
        next(error);
    }
};

export default clickAdvertController;
