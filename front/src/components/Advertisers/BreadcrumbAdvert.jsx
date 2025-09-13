import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const BreadcrumbAdvert = ({ userLogged, title }) => {
    const navigate = useNavigate();

    return (
        <div className="w-full mx-auto px-4 py-4 bg-white">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <nav className="text-sm text-gray-600">
                    <Link
                        to="/"
                        className="hover:text-purpleOiches transition-colors"
                    >
                        Inicio
                    </Link>
                    <span className="mx-2">›</span>
                    <Link
                        to={`/users/account/${userLogged.id}`}
                        className="hover:text-purpleOiches transition-colors"
                    >
                        Mi cuenta
                    </Link>
                    <span className="mx-2">›</span>
                    <span className="text-gray-800 font-medium">{title}</span>
                </nav>
                <button
                    onClick={() => navigate(`/users/account/${userLogged.id}`)}
                    className="flex items-center justify-center gap-2 px-4 py-2 border border-purpleOiches 
                                     text-purpleOiches font-medium rounded-lg hover:bg-purpleOiches hover:text-white
                                     transition-all duration-200 text-sm w-fit"
                >
                    ← Volver a mis anuncios
                </button>
            </div>
        </div>
    );
};

export default BreadcrumbAdvert;
