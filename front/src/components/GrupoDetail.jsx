import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useGrupo from '../hooks/useGrupo';
import Live from '../assets/Live.jpg';

const GrupoDetail = () => {
    const { VITE_API_URL_BASE } = import.meta.env;

    const { idGrupo } = useParams();

    const { entry, error } = useGrupo(idGrupo);

    return entry ? (
        <main>
            <section className="relative max-h-44 overflow-hidden">
                {entry.photos.length ? (
                    <img
                        className="w-full opacity-80"
                        src={`${VITE_API_URL_BASE}/uploads/${entry.fotos[0].name}`}
                        alt="imagen grupo"
                    />
                ) : (
                    <img
                        src={Live}
                        className="w-full opacity-80"
                        alt="imagen"
                    />
                )}
                <div className="p-4 absolute top-0 w-full h-full flex flex-col justify-between">
                    <Link to={'/'}>
                        <p>&#60; Back</p>
                    </Link>
                    <h1 className="w-full text-center mb-4 text-3xl/8 font-semibold md:text-black md:mt-12">
                        {entry.nombre}
                    </h1>
                    <p className="text-right text-sm">
                        Votos:{' '}
                        <span className="font-semibold">
                            {Math.round(entry.votes)}
                        </span>
                    </p>
                </div>
            </section>
            <section className="m-2">
                <p className="flex gap-1 mb-2">
                    <span className="font-semibold">Estilo: </span>
                    <span className="text-greyOiches">{entry.Genero}</span>
                </p>
                <p className="flex gap-1 mb-2">
                    <span className="font-semibold">Provincia: </span>
                    <span className="text-greyOiches">{entry.Provincia}</span>
                </p>
                {entry.honorarios ? (
                    <p className="flex gap-1 mb-2">
                        <span className="font-semibold">Caché: </span>
                        <span className="text-greyOiches">
                            {entry.honorarios}
                        </span>
                    </p>
                ) : (
                    ''
                )}

                {entry.rider ? (
                    <p className="flex gap-1 mb-2">
                        <span className="font-semibold">Rider: </span>
                        <span className="text-greyOiches">{entry.rider}</span>
                    </p>
                ) : (
                    ''
                )}

                <p className="flex gap-1 mb-2">
                    <span className="font-semibold">Email: </span>
                    <span className="text-greyOiches">
                        <a className="" href={`mailto:${entry.email}`}>
                            {entry.email}
                        </a>
                    </span>
                </p>
                {entry.biografia ? (
                    <p className="flex flex-col mb-2">
                        <span className="font-semibold">Biografía: </span>
                        <span className="text-greyOiches">
                            {entry.biografia}
                        </span>
                    </p>
                ) : (
                    ''
                )}
            </section>
        </main>
    ) : (
        <p>Error {error}</p>
    );
};

export default GrupoDetail;
