import hiddeAgenciaService from '../../services/agencias/hiddeAgenciaService.js';
// import getUserOwnerService from '../../services/users/getUserOwnerService.js';

const hiddeAgenciaController = async (req, res, next) => {
    try {
        const { idAgencia } = req.params;
        // const userId = req.user.id;

        // const agenciaGruposList = await getUserOwnerService(userId);
        // const gruposList = agenciaGruposList.grupos;
        await hiddeAgenciaService({ idAgencia });

        res.send({
            status: 'ok',
            message:
                'La agencia y sus proyectos musicales ya no aparecerán en Oiches.',
        });
    } catch (error) {
        next(error);
    }
};

export default hiddeAgenciaController;
