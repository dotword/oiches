import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';
import useAgencia from '../../hooks/useAgencia.jsx';
import DefaultProfile from '/DefaultProfile2.png';
import useAuth from '../../hooks/useAuth.jsx';
import useListSalasGrupoUser from '../../hooks/useListSalasGrupoUser.jsx';
import Seo from '../SEO/Seo.jsx'; //
import TextFormat from '../TextFormato.jsx';
// import { IoChevronForward } from 'react-icons/io5';
// import { IoChevronBack } from 'react-icons/io5';
import { toast } from 'react-toastify';
import Toastify from '../Toastify.jsx';

const AgenciaDetails = () => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const { idAgencia } = useParams();
    const { entry } = useAgencia(idAgencia);
    const { currentUser, token } = useAuth();
    const [actualUser, setActualUser] = useState('');
    // const [previous, setPrevious] = useState('');
    // const [next, setNext] = useState('');
    const {
        nombre = '',
        provincia = '',
        descripcion = '',
        web = '',
        email = '',
        published = 0,
        avatar = '',
    } = entry || {};

    console.log('entry ', entry);
    console.log('current ', currentUser);
    const idUserOwner = actualUser.id;

    const { entries } = useListSalasGrupoUser({
        token,
        idUserOwner,
    });

    console.log(entries);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await fetch(
    //             `${VITE_API_URL_BASE}/salas?pageSize=300`
    //         );
    //         const data = await response.json();

    //         const sortedSalas = Array.isArray(data.result)
    //             ? data.result.sort(
    //                   (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
    //               )
    //             : [];

    //         const currentIndex = sortedSalas.findIndex(
    //             (sala) => sala.id === idAgencia
    //         );
    //         if (currentIndex !== -1) {
    //             const previousSala =
    //                 currentIndex > 0 ? sortedSalas[currentIndex - 1] : null;
    //             const nextSala =
    //                 currentIndex < sortedSalas.length - 1
    //                     ? sortedSalas[currentIndex + 1]
    //                     : null;

    //             setPrevious(previousSala);
    //             setNext(nextSala);
    //         }
    //     };

    //     fetchData();
    // }, [idAgencia, VITE_API_URL_BASE]);

    useEffect(() => {
        const fetchData = async () => {
            if (!currentUser) return;
            const response = await fetch(
                `${VITE_API_URL_BASE}/users/info/${currentUser.id}`
            );
            const data = await response.json();
            setActualUser(data[0]);
        };
        fetchData();
    }, [currentUser, VITE_API_URL_BASE]);

    const handlePublish = async () => {
        try {
            const response = await fetch(
                `${VITE_API_URL_BASE}/published-agencia/${idAgencia}`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.ok) {
                toast.success('Agencia publicada con éxito');
            }
        } catch (error) {
            toast.error('Error al publicar');
        }
    };

    return published === 1 || actualUser.roles === 'admin' ? (
        <>
            {/* Integración del componente Seo con datos dinámicos */}
            <Seo
                title={`${nombre} - Agencia de músicos en ${provincia}`}
                description={`Descubre la agencia ${nombre} en ${provincia}.`}
                keywords={`agencia, manager, ${nombre}, ${provincia}, música en vivo, eventos`}
                url={`https://oiches.com/agencia/${idAgencia}`}
                image={
                    avatar
                        ? `${VITE_API_URL_BASE}/uploads/${avatar}`
                        : DefaultProfile
                }
            />

            <main className="p-4 mt-6 flex flex-col gap-6 mx-auto shadow-xl w-11/12 md:max-w-1200 md:px-24">
                <section className="mb-6">
                    {avatar && (
                        <img
                            className="w-40 h-40 rounded-full object-cover shadow-lg mx-auto md:ml-0"
                            src={`${VITE_API_URL_BASE}/uploads/${avatar}`}
                            alt="Imagen de perfil de la agencia"
                        />
                    )}
                    <h2 className="text-3xl font-bold mt-6 text-left mb-2">
                        {nombre}
                    </h2>
                    <p className="text-black">{provincia}</p>

                    <div className="flex flex-wrap gap-6">
                        {actualUser.roles === 'grupo' && (
                            <p className="m-auto md:mr-0">
                                <Link
                                    to={`mailto:${email}`}
                                    className="bg-gradient-to-r from-purpleOiches to-moradoOiches text-white font-bold py-2 px-4 rounded-lg shadow-lg"
                                >
                                    Contactar
                                </Link>
                            </p>
                        )}
                    </div>
                </section>

                <section className="mb-6">
                    {descripcion && (
                        <div className="border-t border-gray-300 pt-4 md:col-span-3 py-4">
                            <TextFormat text={descripcion} />
                        </div>
                    )}

                    {web && (
                        <div className="border-t border-gray-300 pt-4">
                            <span className="font-semibold">Web</span>
                            <p>
                                <a
                                    href={web}
                                    target="_blank"
                                    className="underline"
                                >
                                    Web de {nombre}
                                </a>
                            </p>
                        </div>
                    )}
                </section>

                <section className="mb-6">
                    <h2 className="font-semibold text-xl">Roster</h2>
                    {entries && entries.length > 0 ? (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                            {entries.map((entry) => (
                                <li
                                    key={entry.id}
                                    className="border border-gray-200 p-4 rounded-md hover:shadow-md transition-shadow flex flex-col justify-between"
                                >
                                    {/* Título del proyecto */}
                                    <div className="flex flex-wrap items-center justify-between mb-3">
                                        <h3 className="font-medium text-gray-800 text-lg">
                                            {entry.nombre}
                                        </h3>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        ''
                    )}
                </section>

                {/* <section className="flex justify-between mt-8 mb-16">
                    {previous && (
                        <Link
                            to={`/sala/${previous.id}`}
                            className="text-purpleOiches hover:text-white"
                        >
                            <button className="p-2 rounded-lg border border-purpleOiches hover:bg-purpleOiches flex items-end">
                                <IoChevronBack className=" border-purpleOiches hover:bg-purpleOiches text-xl" />{' '}
                                Anterior
                            </button>
                        </Link>
                    )}
                    {next && (
                        <Link
                            to={`/sala/${next.id}`}
                            className="text-purpleOiches hover:text-white "
                        >
                            <button className="p-2 rounded-lg border border-purpleOiches hover:bg-purpleOiches flex items-end">
                                Siguiente{' '}
                                <IoChevronForward className=" border-purpleOiches hover:bg-purpleOiches text-xl" />
                            </button>
                        </Link>
                    )}
                </section> */}

                {actualUser.roles === 'admin' && (
                    <>
                        {published === 0 && (
                            <button
                                className="btn-account max-w-44 min-w-32 bg-red-600"
                                onClick={handlePublish}
                            >
                                Publicar
                            </button>
                        )}
                        <a
                            href={`/sala/${idAgencia}/edit`}
                            className="flex justify-end gap-4 mb-16"
                        >
                            {' '}
                            <FaPencilAlt className=" text-2xl" />
                            Editar
                        </a>
                        <Toastify />
                    </>
                )}
            </main>
        </>
    ) : (
        <p className="text-center mt-12">La agencia aún no está publicada</p>
    );
};

export default AgenciaDetails;
