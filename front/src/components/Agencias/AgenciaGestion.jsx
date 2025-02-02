import AgenciaCreacion from './AgenciaCreacion.jsx';
import useListSalasGrupoUser from '../../hooks/useListSalasGrupoUser.jsx';
import AgenciaEdit from './AgenciaEdit.jsx';

const AgenciaGestion = ({ userLogged, token, userOwner }) => {
    const idUserOwner = userOwner.user.id;
    const { entries } = useListSalasGrupoUser({
        token,
        idUserOwner,
    });

    return idUserOwner ? (
        <>
            <section>
                <h1>GESTIONA TU AGENCIA</h1>
                {entries && entries.length === 0 && (
                    <AgenciaCreacion
                        userLogged={userLogged}
                        token={token}
                        userOwner={userOwner}
                    />
                )}

                {entries && entries.length === 1 && (
                    <AgenciaEdit
                        userLogged={userLogged}
                        token={token}
                        idAgencia={entries[0]?.id}
                    />
                )}
            </section>
        </>
    ) : (
        <h1 className="text-center text-xl">No puedes acceder a esta página</h1>
    );
};

export default AgenciaGestion;
