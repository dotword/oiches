import { Link } from 'react-router-dom';
import { IoChevronForward } from 'react-icons/io5';
import useAdvertiserProfile from '../../hooks/useAdvertiserProfile';

const AdvertiserDashboard = ({ userId, token }) => {
    const profile = useAdvertiserProfile({ userId, token });

    return (
        <div className="flex flex-col items-center">
            {!profile.advertiser ? (
                <>
                    <p className="text-center text-xl mb-4">
                        Completa tus datos para publicar anuncios
                    </p>
                    <Link
                        to={`/advertiser-details/${userId}`}
                        className="btn-degradado self-end mb-4 flex items-center gap-2"
                    >
                        Mis datos
                        <IoChevronForward className=" border-purpleOiches hover:bg-purpleOiches text-xl" />
                    </Link>
                </>
            ) : (
                <Link
                    to={`/advertiser-details/edit/${userId}`}
                    className="btn-degradado self-end mb-4 flex items-center gap-2"
                >
                    Editar mis datos
                    <IoChevronForward className=" border-purpleOiches hover:bg-purpleOiches text-xl" />
                </Link>
            )}
            <section>
                <h1 className="text-center text-xl font-semibold mt-12">
                    Mis anuncios
                </h1>
                <Link to={`/create-advert/${userId}`} className="btn-degradado">
                    Publicar un anuncio
                </Link>
            </section>
        </div>
    );
};
export default AdvertiserDashboard;
