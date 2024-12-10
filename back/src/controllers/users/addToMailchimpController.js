const addToMailchimpController = async (req, res, next) => {
    const { email, username, roles, active, id } = req.body;

    const apiKey = process.env.MAILCHIMP_API_KEY;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
    // const audienceId = '2f7756d7ae';
    const dc = apiKey.split('-')[1]; // Extraer el datacenter de la clave API

    const url = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

    const payload = {
        email_address: email,
        status: 'subscribed', // Cambia a 'pending' si prefieres confirmar manualmente
        merge_fields: {
            USERNAME: username || '',
            ROLES: roles || '',
            ACTIVE: active || '',
            ID: id || '',
        },
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${Buffer.from(`anyuser:${apiKey}`).toString('base64')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json({ error: errorData });
        }

        const data = await response.json();

        res.status(200).json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

export default addToMailchimpController;
