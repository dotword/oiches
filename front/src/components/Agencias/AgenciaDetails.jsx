import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useAgencia from '../../hooks/useAgencia.jsx';
import DefaultProfile from '/Horizontal_blanco.webp';
import useAuth from '../../hooks/useAuth.jsx';
import Seo from '../SEO/Seo.jsx';
import TextFormat from '../TextFormato.jsx';
import usePrevNext from '../../hooks/usePrevNext.jsx';
import NextPreviousItem from '../Elements/NextPreviousItem.jsx';
import EditPublishItemAdmin from '../Admin/EditPublishItemAdmin.jsx';

const AgenciaDetails = () => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const { idAgencia } = useParams();
    const { agencia } = useAgencia(idAgencia);
    const { currentUser, token } = useAuth();
    const [actualUser, setActualUser] = useState('');
    const {
        nombre = '',
        provincia = '',
        descripcion = '',
        web = '',
        email = '',
        published = 0,
        avatar = '',
    } = agencia || {};
    const grupos = agencia?.grupos || [];
    const roles = 'agencia';
    const { previous, next } = usePrevNext({ idItem: idAgencia, roles: roles });

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

    const imageUrl = avatar
        ? `${VITE_API_URL_BASE}/uploads/${avatar}`
        : DefaultProfile;

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
                            src={imageUrl}
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
                                <a
                                    href={`mailto:${email}`}
                                    className="button-large px-4"
                                >
                                    Contactar
                                </a>
                            </p>
                        )}
                    </div>
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

                {grupos && grupos.length > 0 ? (
                    <section className="mb-6">
                        <h2 className="font-semibold text-xl">Roster</h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                            {grupos.map((grupo) => (
                                <li
                                    key={grupo.id}
                                    className="border border-gray-200 p-4 rounded-md hover:shadow-md transition-shadow flex flex-col justify-between"
                                >
                                    <div className="flex flex-wrap items-center justify-between mb-3">
                                        <h3 className="font-medium text-gray-800 text-lg">
                                            {grupo.nombre}
                                        </h3>
                                        <Link
                                            to={`/grupo/${grupo.id}`}
                                            className="bg-gradient-to-r from-purpleOiches to-moradoOiches text-white font-bold py-2 px-4 rounded-lg shadow-lg"
                                        >
                                            + Info
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                ) : (
                    ''
                )}
                <NextPreviousItem
                    previous={previous}
                    next={next}
                    roles={roles}
                />

                {actualUser.roles === 'admin' && (
                    <div>
                        <EditPublishItemAdmin
                            idItem={idAgencia}
                            token={token}
                            published={published}
                            roles={roles}
                        />
                    </div>
                )}
            </main>
        </>
    ) : (
        <p className="text-center mt-12">La agencia aún no está publicada</p>
    );
};

export default AgenciaDetails;
