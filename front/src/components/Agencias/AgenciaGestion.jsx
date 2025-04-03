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
                {entries && entries.agencias.length === 0 && (
                    <AgenciaCreacion
                        userLogged={userLogged}
                        token={token}
                        userOwner={userOwner}
                    />
                )}
            </section>

            <section className="my-8 flex flex-col md:flex-row gap-4 items-center md:justify-start">
                {entries &&
                (entries.agencias[0]?.published === 1 ||
                    entries.agencias[0]?.hidden === 1) &&
                entries.agenciaEspecialidad &&
                entries.agenciaEspecialidad.some(
                    (esp) => esp.idEspecialidad === 1
                ) ? (
                    <Link
                        to={`/users/roster/${idUserOwner}`}
                        className="btn-degradado w-full md:max-w-64 text-center"
                    >
                        Ir a tu roster
                    </Link>
                ) : (
                    ''
                )}
            </section>

            <section className="my-8 flex flex-col md:flex-row gap-4 items-center md:justify-start">
                {entries &&
                    (entries.agencias[0]?.published === 0 ||
                        entries.agencias[0]?.hidden === 1) &&
                    entries.agenciaEspecialidad &&
                    entries.agenciaEspecialidad.some(
                        (esp) => esp.idEspecialidad === 1
                    ) && (
                        <p className="text-gray-500 text-center mt-4 md:text-left">
                            * Tenemos que aprobar tu agencia para que puedas
                            empezar a gestionar tu roster.
                        </p>
                    )}
            </section>

            <section className="mt-8">
                {entries && entries.agencias.length === 1 && (
                    <AgenciaEdit
                        userLogged={userLogged}
                        token={token}
                        idAgencia={entries.agencias[0]?.id}
                    />
                )}
            </section>
            {entries && entries.agencias[0]?.published === 1 && (
                <section className="mt-10 flex justify-start">
                    <button onClick={toggleAgenciaHidden} className="enlaces">
                        {hidden ? 'Publicar tu agencia' : 'Ocultar tu agencia'}
                    </button>
                </section>
            )}
        </>
    ) : (
        <p className="text-center text-xl">No puedes acceder a esta página</p>
    );
};

export default AgenciaGestion;
