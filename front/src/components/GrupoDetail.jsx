import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useGrupo from '../hooks/useGrupo';
import Live from '../assets/Live.jpg';
import StarRating from './StartRating';

const GrupoDetail = () => {
    const { VITE_API_URL_BASE } = import.meta.env;

    const { idGrupo } = useParams();

    const { entry, error } = useGrupo(idGrupo);

    return entry ? (
        <>
            <main>
                <section className="relative">
                    {entry.photos.length ? (
                        <img
                            className="w-full opacity-70 object-cover h-64"
                            src={`${VITE_API_URL_BASE}/uploads/${entry.fotos[0].name}`}
                            alt="imagen grupo"
                        />
                    ) : (
                        <img
                            src={Live}
                            className="w-full opacity-70 object-cover h-64"
                            alt="imagen"
                        />
                    )}
                    <Link to={'/'}>
                        <p className="p-4 absolute top-0">&#60; Back</p>
                    </Link>
                    <div className="p-4 md:hidden absolute top-0 w-full h-full flex flex-col justify-end gap-2">
                        {entry.avatar ? (
                            <img
                                className="w-1/4 mx-auto max-w-28 rounded-full"
                                src={`${VITE_API_URL_BASE}/uploads/${entry.avatar}`}
                                alt="avatar grupo"
                            />
                        ) : (
                            ''
                        )}
                        <h1 className="w-full text-center text-3xl/8 font-semibold">
                            {entry.nombre}
                        </h1>
                        <div className="flex justify-end items-center">
                            <StarRating rating={entry.votes} />
                        </div>
                    </div>
                </section>
                <section className="p-4 mb-4 max-md:border-4 max-md:border-t-0 border-black rounded-b-3xl md:flex md:gap-16 md:p-8 max-w-screen-xl mx-auto">
                    <div className="md:bg-gray-200/50 md:p-6 md:w-2/5 md:border-4 max border-black rounded-t-3xl md:-translate-y-24">
                        {entry.avatar ? (
                            <img
                                className="mx-auto max-w-28 rounded-full max-md:hidden md:-mt-16"
                                src={`${VITE_API_URL_BASE}/uploads/${entry.avatar}`}
                                alt="avatar grupo"
                            />
                        ) : (
                            ''
                        )}
                        <h1 className="w-full text-center text-3xl/8 font-semibold max-md:hidden md:mt-8">
                            {entry.nombre}
                        </h1>
                        <span className="max-md:hidden flex justify-center items-center">
                            <StarRating rating={entry.votes} />
                        </span>
                        <div className="md:bg-gray-200 md:p-4 md:my-8">
                            <p className="flex gap-1 mb-2 md:justify-center">
                                <span className="font-semibold">Estilo: </span>
                                <span className="text-greyOiches">
                                    {entry.Genero}
                                </span>
                            </p>
                            <p className="flex gap-1 mb-2 md:justify-center">
                                <span className="font-semibold">
                                    Provincia:{' '}
                                </span>
                                <span className="text-greyOiches">
                                    {entry.Provincia}
                                </span>
                            </p>

                            {entry.honorarios ? (
                                <p className="flex gap-1 mb-2 md:justify-center">
                                    <span className="font-semibold">
                                        Caché:{' '}
                                    </span>
                                    <span className="text-greyOiches">
                                        {entry.honorarios}
                                    </span>
                                </p>
                            ) : (
                                ''
                            )}
                        </div>

                        <p className="flex gap-1 mb-2 md:justify-center">
                            <a
                                href={`mailto:${entry.email}`}
                                className="btn-account mb-2 md:w-3/4 md:text-center md:p-2"
                            >
                                Contactar
                            </a>
                        </p>
                    </div>

                    {entry.biografia ? (
                        <p className="flex flex-col mb-2 md:w-3/5">
                            <span className="font-semibold md:text-xl md:mb-2">
                                Biografía:{' '}
                            </span>
                            <span className="text-greyOiches">
                                {entry.biografia}
                            </span>
                        </p>
                    ) : (
                        ''
                    )}
                </section>
            </main>
        </>
    ) : (
        <p>Error {error}</p>
    );
};

export default GrupoDetail;
