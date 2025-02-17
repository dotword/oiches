import AgenciaCreacion from './AgenciaCreacion.jsx';
import useListSalasGrupoUser from '../../hooks/useListSalasGrupoUser.jsx';
import AgenciaEdit from './AgenciaEdit.jsx';
import { Link } from 'react-router-dom';
import HideShowAgenciaService from '../../services/Agencias/HideShowAgenciaService.js';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

const AgenciaGestion = ({ userLogged, token, userOwner }) => {
    const idUserOwner = userOwner.user.id;
    const { entries } = useListSalasGrupoUser({ token, idUserOwner });
    const [hidden, setHidden] = useState(null);

    useEffect(() => {
        if (entries && entries.agencias.length > 0) {
            setHidden(entries.agencias[0].hidden === 1);
        }
    }, [entries]);

    // Cambiar estado hidden de la agencia
    const toggleAgenciaHidden = async () => {
        try {
            await HideShowAgenciaService(entries.agencias[0].id, token);

            // Invertir el estado
            setHidden((prevHidden) => !prevHidden);

            toast.success('Estado de la agencia actualizado.');
        } catch (error) {
            toast.error(error.message || 'Error al conectar con el servidor.');
        }
    };

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
                <section className="mb-8">
                    {(entries && entries.agencias[0]?.published === 1) ||
                    (entries && entries.agencias[0]?.hidden === 1) ? (
                        <Link
                            to={`/users/roster/${idUserOwner}`}
                            state={{ userOwner, entries: entries.grupos }}
                            className="bg-gradient-to-r from-purpleOiches to-moradoOiches text-white font-bold py-2 px-4 rounded-lg shadow-lg"
                        >
                            Ir a tu roster
                        </Link>
                    ) : (
                        'Tenemos que aprobar tu agencia para que puedas empezar a gestionar tu roster.'
                    )}

                    {entries && entries.agencias[0]?.published === 1 && (
                        <button
                            onClick={toggleAgenciaHidden}
                            className="btn-account rounded-xl py-2 ml-4"
                        >
                            {hidden ? (
                                <p>Publicar tu agencia y roster</p>
                            ) : (
                                <p>Ocultar tu agencia y roster</p>
                            )}
                        </button>
                    )}
                </section>

                <section className="mt-8"></section>
                {entries.agencias && entries.agencias.length === 1 && (
                    <AgenciaEdit
                        userLogged={userLogged}
                        token={token}
                        idAgencia={entries.agencias[0]?.id}
                    />
                )}
            </section>
        </>
    ) : (
        <p className="text-center text-xl">No puedes acceder a esta página</p>
    );
};

export default AgenciaGestion;
