// import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// import useSala from '../hooks/useSala.jsx';
// import StarRating from './StartRating.jsx';
// import Header from './Header.jsx';
// import DefaultProfile from '/DefaultProfile2.png';
// import Noimage from '../../src/assets/noimage.png';
// import useAuth from '../hooks/useAuth.jsx';
// import Footer from './Footer.jsx';

// const SalaDetail = () => {
//     const { VITE_API_URL_BASE } = import.meta.env;
//     const { idSala } = useParams();
//     const { entry, error } = useSala(idSala);
//     const { currentUser } = useAuth();

//     const {
//         nombre,
//         provincia,
//         equipamiento,
//         descripcion,
//         condiciones,
//         genero,
//         direccion,
//         capacidad,
//         usuarioAvatar,
//         comentarios,
//         email,
//         precios,
//         photos,
//     } = entry;

//     return entry ? (
//         <>
//             <Header txt={nombre} />
//             <main className="max-w-6xl mx-auto flex flex-col p-6 gap-6 shadow-xl m-4 rounded-3xl">
//                 <section className="flex flex-row items-center gap-6">
//                     <img
//                         className="w-32 h-32 rounded-xl"
//                         src={
//                             usuarioAvatar
//                                 ? `${VITE_API_URL_BASE}/uploads/${usuarioAvatar}`
//                                 : DefaultProfile
//                         }
//                         alt="Imagen de perfil del grupo"
//                     />
//                     <div>
//                         <h2 className="text-4xl">{nombre}</h2>
//                         <p className="text-sm text-gray-500 mt-1">
//                             Your Profile Picture
//                         </p>
//                     </div>
//                 </section>
//                 <section className="grid grid-cols-2 gap-6 my-6">
//                     <span>
//                         Nombre de la Sala{' '}
//                         <p className="text-gray-400">{nombre}</p>
//                     </span>
//                     {genero && (
//                         <span>
//                             Género
//                             {genero.map((gen) => (
//                                 <div
//                                     key={gen.generoId}
//                                     className="text-gray-400"
//                                 >
//                                     {gen.generoName}
//                                 </div>
//                             ))}
//                         </span>
//                     )}

//                     {capacidad && (
//                         <span>
//                             Capacidad{' '}
//                             <p className="text-gray-400">{capacidad}</p>
//                         </span>
//                     )}
//                     {precios && (
//                         <span>
//                             Precio <p className="text-gray-400">{precios}€</p>
//                         </span>
//                     )}

//                     {equipamiento && (
//                         <span>
//                             Equipamiento{' '}
//                             <p className="text-gray-400">{equipamiento}</p>
//                         </span>
//                     )}
//                     {direccion && (
//                         <span>
//                             Dirección{' '}
//                             <p className="text-gray-400">{direccion}</p>
//                         </span>
//                     )}
//                     {condiciones && (
//                         <span>
//                             Condiciones{' '}
//                             <p className="text-gray-400">{condiciones}</p>
//                         </span>
//                     )}
//                     {provincia && (
//                         <span>
//                             Provincia{' '}
//                             <p className="text-gray-400">{provincia}</p>
//                         </span>
//                     )}
//                     {currentUser && (
//                         <span>
//                             Contacto <p className="text-gray-400">{email}</p>
//                         </span>
//                     )}
//                 </section>
//                 <section>
//                     <h3 className="text-2xl">Descripción :</h3>
//                     <p className="my-6">
//                         {descripcion
//                             ? descripcion
//                             : 'La Sala tiene que añadir la descripción.'}
//                     </p>
//                 </section>
//                 {comentarios.length > 0 && (
//                     <section>
//                         <h3 className="text-2xl">Comentarios :</h3>

//                         {comentarios.map((comentario) => (
//                             <div
//                                 key={comentario.id}
//                                 className="my-6 border p-3 rounded-lg justify-between w-fit flex flex-col "
//                             >
//                                 <span>
//                                     {comentario.comentario}
//                                     <p className="text-gray-400">
//                                         {comentario.createdAt.slice(0, 10)}
//                                     </p>
//                                 </span>
//                                 <Link
//                                     className="flex place-items-center gap-2 transition-all"
//                                     to={`/grupo/${comentario.grupoVotaId}`}
//                                 >
//                                     <div>
//                                         <StarRating
//                                             rating={comentario.voto}
//                                         ></StarRating>
//                                     </div>
//                                     <img
//                                         className="w-10"
//                                         src={
//                                             comentario.grupoAvatar
//                                                 ? comentario.grupoAvatar
//                                                 : DefaultProfile
//                                         }
//                                         alt=""
//                                     />
//                                     <p>{comentario.grupoVotaName}</p>
//                                 </Link>
//                             </div>
//                         ))}
//                     </section>
//                 )}
//                 <section>
//                     <h3 className="text-2xl">Fotos:</h3>
//                     <div className="grid grid-cols-2 gap-4 my-6 place-items-center">
//                         {photos.length > 0 ? (
//                             <>
//                                 {photos.map((photo) => (
//                                     <img
//                                         key={photo.id}
//                                         src={`${VITE_API_URL_BASE}/uploads/${photo.name}`}
//                                         className="rounded-3xl max-h-80 shadow-xl"
//                                         alt="Foto secundaria"
//                                     />
//                                 ))}
//                             </>
//                         ) : (
//                             <>
//                                 <img
//                                     className="col-span-2 rounded-3xl"
//                                     src={Noimage}
//                                     alt="No image"
//                                 />
//                             </>
//                         )}
//                     </div>
//                 </section>
//                 <section>
//                     <div className=" flex justify-around my-8">
//                         <Link
//                             to={`/sala/${idSala}/reservas`}
//                             className="p-4 shadow-lg rounded bg-purpleOiches text-white hover:scale-105 transition-all"
//                         >
//                             Reservar
//                         </Link>
//                     </div>
//                 </section>
//             </main>
//             <Footer></Footer>
//         </>
//     ) : (
//         <p>{error}</p>
//     );
// };

// export default SalaDetail;

import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useSala from '../hooks/useSala.jsx';
import StarRating from './StartRating.jsx';
import Header from './Header.jsx';
import DefaultProfile from '/DefaultProfile2.png';
import Noimage from '../../src/assets/noimage.png';
import useAuth from '../hooks/useAuth.jsx';
import Footer from './Footer.jsx';

const SalaDetail = () => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const { idSala } = useParams();
    const { entry, error } = useSala(idSala);
    const { currentUser } = useAuth();

    const {
        nombre,
        provincia,
        equipamiento,
        descripcion,
        condiciones,
        genero,
        direccion,
        capacidad,
        usuarioAvatar,
        comentarios,
        email,
        precios,
        photos,
    } = entry;

    return entry ? (
        <>
            <Header txt={nombre} />
            <main className="max-w-6xl mx-auto flex flex-col p-6 gap-6 m-4 rounded-3xl">
                <section className="flex flex-col lg:flex-row items-center gap-6">
                    <img
                        className="w-32 h-32 rounded-xl"
                        src={
                            usuarioAvatar
                                ? `${VITE_API_URL_BASE}/uploads/${usuarioAvatar}`
                                : DefaultProfile
                        }
                        alt="Imagen de perfil de la sala"
                    />
                    <div className="text-center lg:text-left">
                        <h2 className="text-4xl">{nombre}</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Your Profile Picture
                        </p>
                    </div>
                </section>
                <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.618fr] gap-6 my-6">
                    <span>
                        Nombre de la Sala{' '}
                        <p className="text-gray-400">{nombre}</p>
                    </span>
                    {genero && (
                        <span>
                            Género
                            {genero.map((gen) => (
                                <div
                                    key={gen.generoId}
                                    className="text-gray-400"
                                >
                                    {gen.generoName}
                                </div>
                            ))}
                        </span>
                    )}
                    {capacidad && (
                        <span>
                            Capacidad{' '}
                            <p className="text-gray-400">{capacidad}</p>
                        </span>
                    )}
                    {precios && (
                        <span>
                            Precio <p className="text-gray-400">{precios}€</p>
                        </span>
                    )}
                    {equipamiento && (
                        <span>
                            Equipamiento{' '}
                            <p className="text-gray-400">{equipamiento}</p>
                        </span>
                    )}
                    {direccion && (
                        <span>
                            Dirección{' '}
                            <p className="text-gray-400">{direccion}</p>
                        </span>
                    )}
                    {condiciones && (
                        <span>
                            Condiciones{' '}
                            <p className="text-gray-400">{condiciones}</p>
                        </span>
                    )}
                    {provincia && (
                        <span>
                            Provincia{' '}
                            <p className="text-gray-400">{provincia}</p>
                        </span>
                    )}
                    {currentUser && (
                        <span>
                            Contacto <p className="text-gray-400">{email}</p>
                        </span>
                    )}
                </section>
                <section>
                    <h3 className="text-2xl">Descripción :</h3>
                    <p className="my-6">
                        {descripcion
                            ? descripcion
                            : 'La Sala tiene que añadir la descripción.'}
                    </p>
                </section>
                {comentarios.length > 0 && (
                    <section>
                        <h3 className="text-2xl">Comentarios :</h3>
                        {comentarios.map((comentario) => (
                            <div
                                key={comentario.id}
                                className="my-6 border p-3 rounded-3xl flex flex-col w-fit justify-between"
                            >
                                <span>
                                    {comentario.comentario}
                                    <p className="text-gray-400">
                                        {comentario.createdAt.slice(0, 10)}
                                    </p>
                                </span>
                                <Link
                                    className="flex place-items-center gap-2 hover:scale-105 transition-all"
                                    to={`/grupo/${comentario.grupoVotaId}`}
                                >
                                    <div>
                                        <StarRating rating={comentario.voto} />
                                    </div>
                                    <img
                                        className="w-10"
                                        src={
                                            comentario.grupoAvatar
                                                ? comentario.grupoAvatar
                                                : DefaultProfile
                                        }
                                        alt=""
                                    />
                                    <p>{comentario.grupoVotaName}</p>
                                </Link>
                            </div>
                        ))}
                    </section>
                )}
                <section>
                    <h3 className="text-2xl">Fotos:</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-6 place-items-center">
                        {photos.length > 0 ? (
                            <>
                                {photos.map((photo) => (
                                    <img
                                        key={photo.id}
                                        src={`${VITE_API_URL_BASE}/uploads/${photo.name}`}
                                        className="rounded-3xl max-h-80 shadow-xl"
                                        alt="Foto de la sala"
                                    />
                                ))}
                            </>
                        ) : (
                            <>
                                <img
                                    className="col-span-1 lg:col-span-2 rounded-3xl"
                                    src={Noimage}
                                    alt="No image"
                                />
                            </>
                        )}
                    </div>
                </section>
                <section>
                    <div className="flex justify-around my-8">
                        <Link
                            to={`/sala/${idSala}/reservas`}
                            className="p-4 shadow-lg rounded bg-purple-600 text-white hover:scale-105 transition-all"
                        >
                            Reservar
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    ) : (
        <p>{error}</p>
    );
};

export default SalaDetail;
