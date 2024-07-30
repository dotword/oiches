import useAuth from '../hooks/useAuth';
import { IoIosArrowForward } from 'react-icons/io';
import { FaPencil } from 'react-icons/fa6';

const UsersSalaGrupoList = () => {
    const { userLogged } = useAuth();

    return (
        <section className="mt-8 border-t-2 border-greyOiches-50 py-6  md:flex md:flex-col md:items-center">
            {userLogged.roles === 'sala' ? (
                <>
                    {userLogged.salas[0] ? (
                        <>
                            <h2 className="text-center font-semibold text-lg mb-6">
                                Gestiona tus salas
                            </h2>
                            <ul className="mb-4">
                                {userLogged.salas.map((sala) => (
                                    <li
                                        key={sala.id}
                                        className="flex items-center gap-2 mb-2"
                                    >
                                        <IoIosArrowForward />{' '}
                                        <a href={`/sala/${sala.id}/edit`}>
                                            {sala.nombre}
                                        </a>
                                        <a href={`/sala/${sala.id}/edit`}>
                                            <FaPencil className="text-sm" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        ''
                    )}
                    <a
                        href="/creacion-sala"
                        className="btn-account max-w-44 min-w-32"
                    >
                        Crea una sala
                    </a>
                </>
            ) : (
                <>
                    {userLogged.grupos[0] ? (
                        <>
                            <h2 className="text-center font-semibold text-lg mb-6">
                                Gestiona tu grupo
                            </h2>
                            <ul className="mb-4">
                                {userLogged.grupos.map((grupo) => (
                                    <li
                                        key={grupo.id}
                                        className="flex items-center gap-2 mb-2"
                                    >
                                        <IoIosArrowForward />{' '}
                                        <a href={`/grupos/${grupo.id}/edit`}>
                                            {grupo.nombre}
                                        </a>
                                        <a href={`/grupos/${grupo.id}/edit`}>
                                            <FaPencil className="text-sm" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <a
                            href="/creacion-grupo"
                            className="btn-account max-w-44 min-w-32"
                        >
                            Crea una grupo
                        </a>
                    )}
                </>
            )}
        </section>
    );
};

export default UsersSalaGrupoList;
