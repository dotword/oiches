import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useGrupo from '../hooks/useGrupo';

const GrupoDetail = () => {
    const { VITE_API_URL_BASE } = import.meta.env;

    const { idGrupo } = useParams();

    const { entry, error } = useGrupo(idGrupo);

    return entry ? (
        <>
            <section className="relative">
                {entry.photos.length ? (
                    <img
                        src={`${VITE_API_URL_BASE}/uploads/${entry.photos[1].name}`}
                        alt="imagen"
                    />
                ) : (
                    'La entrada no contiene imagenes'
                )}
                <div className="pt-7 pb-4 px-6 ">
                    <Link to={'/'}>
                        <p className="font-semibold">&#60; Back</p>
                    </Link>
                    <h1 className="w-full text-center mt-8 mb-4 text-2xl/8 font-semibold md:text-black md:mt-12">
                        {entry.nombre}
                    </h1>
                </div>
                <div className="bg-hero-image bg-cover bg-bottom w-full h-full absolute top-0 opacity-80 -z-10"></div>
            </section>
            {entry.photos.length ? (
                entry.photos.map((photo) => (
                    <div key={photo.id}>
                        <img
                            src={`${VITE_API_URL_BASE}/uploads/${photo.name}`}
                            alt="imagen"
                        />
                    </div>
                ))
            ) : (
                <p>La entrada no tiene imagenes para mostrar</p>
            )}
        </>
    ) : (
        <p>Erropr {error}</p>
    );
};

export default GrupoDetail;
