import { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/AuthContext.jsx';
import { toast } from 'react-toastify';
import Toastify from '../Toastify.jsx';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { IoChevronForward } from 'react-icons/io5';
import useAdvert from '../../hooks/useAdvert.jsx';
import AdvertDetailsEditService from '../../services/Advertisers/AdvertDetailsEditService.js';
import FetchAdvertCategoriesService from '../../services/Advertisers/FetchAdvertCategoriesService.js';
import FetchAdvertPackagesService from '../../services/Advertisers/FetchAdvertPackagesService.js';
import FetchProvinciasService from '../../services/FetchProvinciasService.js';
import EditAdvertPhoto from './EditAdvertPhoto.jsx';

const AdvertDetailsEdit = () => {
    const { userLogged, token } = useContext(AuthContext);
    const { idAdvert } = useParams();
    const navigate = useNavigate();
    const advert = useAdvert(idAdvert);

    const advertData = advert.advert[0];

    const [advertDetails, setAdvertDetails] = useState({
        category_id: '',
        package_id: '',
        address: '',
        city: '',
        provincia_id: '',
        title: '',
        description: '',
        link: '',
        contact_email: '',
        contact_phone: '',
        image_url: '',
    });

    const [categories, setCategories] = useState([]);
    const [packages, setPackages] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!advertData) return;

        setAdvertDetails({
            package_id: advertData.package_id || '',
            category_id: advertData.category_id || '',
            address: advertData.address || '',
            city: advertData.city || '',
            provincia_id: advertData.provincia_id || '',
            title: advertData.title || '',
            description: advertData.description || '',
            link: advertData.link || '',
            contact_email: advertData.contact_email || '',
            contact_phone: advertData.contact_phone || '',
        });
    }, [advertData]);

    useEffect(() => {
        FetchAdvertCategoriesService(setCategories);
        FetchAdvertPackagesService(setPackages);
        FetchProvinciasService(setProvinces);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(advertDetails).forEach(([k, v]) =>
            formData.append(k, v)
        );

        try {
            await AdvertDetailsEditService({ token, idAdvert, formData });
            toast.success(
                'Vamos a revisar tu anuncio, muy pronto nos pondremos en contacto contigo.'
            );
            setTimeout(() => {
                navigate(`/users/account/${userLogged.id}`);
            }, 3000);
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };

    if (!userLogged) {
        return (
            <h1 className="text-center text-xl">
                No puedes acceder a esta página
            </h1>
        );
    }

    return (
        <>
            {userLogged && (
                <Link
                    to={`/users/account/${userLogged.id}`}
                    className="btn-degradado self-end mb-4 flex items-center gap-2"
                >
                    Mis anuncios
                    <IoChevronForward className=" border-purpleOiches hover:bg-purpleOiches text-xl" />
                </Link>
            )}

            <EditAdvertPhoto advertData={advertData} token={token} />
            <form
                onSubmit={handleSubmit}
                className="mb-12 md:flex md:flex-wrap gap-x-8"
            >
                <label className="flex flex-col mb-4 w-full">
                    <span className="font-semibold">Tipo de anuncio:*</span>

                    <select
                        id="package_id"
                        name="package_id"
                        required
                        value={advertDetails.package_id}
                        className="form-input w-full py-2 h-auto"
                        onChange={(e) =>
                            setAdvertDetails({
                                ...advertDetails,
                                package_id: e.target.value,
                            })
                        }
                    >
                        <option value="">Selecciona</option>
                        {packages.map((pack) => (
                            <option key={pack.id} value={pack.id}>
                                {pack.package}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="flex flex-col mb-4 w-full">
                    <span className="font-semibold">Categoría:*</span>
                    <select
                        id="category_id"
                        name="category_id"
                        required
                        value={advertDetails.category_id}
                        className="form-input w-full py-2 h-auto"
                        onChange={(e) =>
                            setAdvertDetails({
                                ...advertDetails,
                                category_id: e.target.value,
                            })
                        }
                    >
                        <option value="">Selecciona</option>
                        {categories.map((categorie) => (
                            <option key={categorie.id} value={categorie.id}>
                                {categorie.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="flex flex-col mb-4 w-full">
                    <span className="font-semibold">Título:*</span>
                    <input
                        type="text"
                        name="title"
                        placeholder="Título del anuncio"
                        required
                        value={advertDetails.title}
                        onChange={(e) =>
                            setAdvertDetails({
                                ...advertDetails,
                                title: e.target.value,
                            })
                        }
                        className="form-input"
                    />
                </label>

                <label className="flex flex-col mb-4 w-full">
                    <span className="font-semibold">Descripción:</span>
                    <textarea
                        type="text"
                        name="description"
                        placeholder="Descripción de tu anuncio. Máximo 2000 caracteres."
                        value={advertDetails.description}
                        onChange={(e) =>
                            setAdvertDetails({
                                ...advertDetails,
                                description: e.target.value,
                            })
                        }
                        className="form-input"
                    />
                </label>

                <label className="flex flex-col mb-4 w-full">
                    <span className="font-semibold">Dirección:</span>
                    <input
                        type="text"
                        name="address"
                        placeholder="Dirección de la empresa"
                        value={advertDetails.address}
                        onChange={(e) =>
                            setAdvertDetails({
                                ...advertDetails,
                                description: e.target.value,
                            })
                        }
                        className="form-input"
                    />
                </label>

                <label className="flex flex-col mb-4 w-full">
                    <span className="font-semibold">Ciudad:</span>
                    <input
                        type="text"
                        name="city"
                        placeholder="Ciudad"
                        value={advertDetails.city}
                        onChange={(e) =>
                            setAdvertDetails({
                                ...advertDetails,
                                city: e.target.value,
                            })
                        }
                        className="form-input"
                    />
                </label>

                <label className="flex flex-col mb-4 w-full">
                    <span className="font-semibold">Provincia:*</span>

                    <select
                        id="provincia_id"
                        name="provincia_id"
                        value={advertDetails.provincia_id}
                        required
                        onChange={(e) =>
                            setAdvertDetails({
                                ...advertDetails,
                                provincia_id: e.target.value,
                            })
                        }
                    >
                        <option value="">Selecciona</option>
                        {provinces.map((province) => (
                            <option key={province.id} value={province.id}>
                                {province.provincia}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="flex flex-col mb-4 w-full">
                    <span className="font-semibold">
                        Web o enlace a tus RRSS:{' '}
                    </span>
                    <input
                        type="text"
                        name="link"
                        placeholder="https://www.tuenlace.com"
                        value={advertDetails.link}
                        onChange={(e) =>
                            setAdvertDetails({
                                ...advertDetails,
                                link: e.target.value,
                            })
                        }
                        className="form-input"
                    />
                </label>
                <label className="flex flex-col mb-4 w-full">
                    <span className="font-semibold">Email de contacto:</span>
                    <input
                        type="email"
                        name="contact_email"
                        placeholder="Email de contacto"
                        value={advertDetails.contact_email}
                        onChange={(e) =>
                            setAdvertDetails({
                                ...advertDetails,
                                contact_email: e.target.value,
                            })
                        }
                        className="form-input"
                    />
                </label>

                <label className="flex flex-col mb-4 w-full">
                    <span className="font-semibold">Teléfono:</span>
                    <input
                        type="number"
                        name="contact_phone"
                        placeholder="Teléfono de contacto"
                        value={advertDetails.contact_phone}
                        onChange={(e) =>
                            setAdvertDetails({
                                ...advertDetails,
                                contact_phone: e.target.value,
                            })
                        }
                        className="form-input"
                    />
                </label>

                <input
                    type="submit"
                    value="Editar anuncio"
                    className="btn-account my-8 mx-auto p-3 w-full max-w-80 font-semibold"
                />

                <div className="w-full">{error && <p>{error}</p>}</div>
            </form>

            <Toastify />
        </>
    );
};

export default AdvertDetailsEdit;
