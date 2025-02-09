import AgenciaCreacion from './AgenciaCreacion.jsx';
import useListSalasGrupoUser from '../../hooks/useListSalasGrupoUser.jsx';
import AgenciaEdit from './AgenciaEdit.jsx';
import AgenciaGruposList from './AgenciaGruposList.jsx';

const AgenciaGestion = ({ userLogged, token, userOwner }) => {
    const idUserOwner = userOwner.user.id;
    const { entries } = useListSalasGrupoUser({
        token,
        idUserOwner,
    });

    return idUserOwner ? (
        <>
            <section>
                {entries.agencias && entries.agencias.length === 0 && (
                    <AgenciaCreacion
                        userLogged={userLogged}
                        token={token}
                        userOwner={userOwner}
                    />
                )}

                {entries.agencias && entries.agencias.length === 1 && (
                    <AgenciaEdit
                        userLogged={userLogged}
                        token={token}
                        idAgencia={entries.agencias[0]?.id}
                    />
                )}
            </section>
            <section className="mt-8">
                {entries && entries.agencias[0].published === 1 ? (
                    <AgenciaGruposList
                        userLogged={userLogged}
                        token={token}
                        userOwner={userOwner}
                    />
                ) : (
                    'Tenemos que aprovar tu agencia para que puedas empezar a añadir tu roster.'
                )}
            </section>
        </>
    ) : (
        <p className="text-center text-xl">No puedes acceder a esta página</p>
    );
};

export default AgenciaGestion;
