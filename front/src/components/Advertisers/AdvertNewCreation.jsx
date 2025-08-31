import { useState, useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext.jsx';
import { toast } from 'react-toastify';
import Toastify from '../Toastify.jsx';
import { useParams, Link, useNavigate } from 'react-router-dom';
import FetchAdvertCategoriesService from '../../services/Advertisers/FetchAdvertCategoriesService.js';
import FetchAdvertPackagesService from '../../services/Advertisers/FetchAdvertPackagesService.js';
import FetchProvinciasService from '../../services/FetchProvinciasService.js';
import AdvertNewCreationService from '../../services/Advertisers/AdvertNewCreationService.js';
import { IoChevronForward } from 'react-icons/io5';
import { useEffect } from 'react';

const AdvertNewCreation = () => {
    const { userLogged, token } = useContext(AuthContext);
    const { userId } = useParams();
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
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
        image: null,
    });

    const [categories, setCategories] = useState([]);
    const [selectedDescription, setSelectedDescription] = useState('');
    const [packages, setPackages] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        FetchAdvertCategoriesService(setCategories);
        FetchAdvertPackagesService(setPackages);
        FetchProvinciasService(setProvinces);
    }, []);

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'file') {
            setFormValues({ ...formValues, [name]: e.target.files[0] });
            return;
        }

        // Si cambia la categoría, buscamos su descripción y la guardamos
        if (name === 'category_id') {
            const selected = categories.find(
                (c) => String(c.id) === String(value)
            );
            setSelectedDescription(selected ? selected.description : '');
            setFormValues({ ...formValues, category_id: value });
            return;
        }

        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Normalizamos la URL
        let normalizedWeb = formValues.link.trim();
        if (link) {
            if (!/^https?:\/\//i.test(normalizedWeb)) {
                normalizedWeb = 'https://' + normalizedWeb;
            }
            try {
                new URL(normalizedWeb);
            } catch {
                setError('La dirección web no es válida');
                return;
            }
        }

        const formData = new FormData();

        Object.entries({ ...formValues, link: normalizedWeb }).forEach(
            ([key, value]) => {
                if (value) formData.append(key, value);
            }
        );

        try {
            await AdvertNewCreationService({ token, userId, formData });

            toast.success(
                'Vamos a revisar tu anuncio. Muy pronto nos pondremos en contacto contigo.'
            );

            setTimeout(() => {
                navigate(`/users/account/${userId}`);
            }, 2000);
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };

    const {
        category_id,
        package_id,
        address,
        city,
        provincia_id,
        title,
        description,
        link,
        contact_email,
        contact_phone,
    } = formValues;

    return userLogged ? (
        <>
            <Link
                to={`/users/account/${userId}`}
                className="btn-degradado self-end mb-4 flex items-center gap-2"
            >
                Mis anuncios
                <IoChevronForward className=" border-purpleOiches hover:bg-purpleOiches text-xl" />
            </Link>
            <div className="grid grid-cols-3 gap-8">
                <div>
                    <h3 className="font-semibold">Anuncio básico</h3>
                    <ul>
                        <li>
                            Descripción: Título, texto de hasta 200 palabras,
                            una imagen pequeña (logo o foto del
                            producto/servicio), enlace a web, contacto.
                        </li>
                        <li>
                            Visibilidad: Se muestra en orden
                            cronológico/alfabético dentro de la categoría
                            correspondiente.
                        </li>
                        <li>
                            <ul>
                                <li>3 meses: 20 €</li>
                                <li>6 meses: 35 €</li>
                                <li>1 año: 60 €</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold">Anuncio destacado</h3>
                    <ul>
                        <li>
                            Descripción: Título, texto de hasta 200 palabras,
                            imagen principal más grande, fondo de color en el
                            listado, enlace a web o contacto.
                        </li>
                        <li>
                            Visibilidad: Siempre aparece en las primeras
                            posiciones de su categoría, con etiqueta
                            “Destacado”.
                        </li>
                        <li>
                            <ul>
                                <li>3 meses: 30 €</li>
                                <li>6 meses: 50 €</li>
                                <li>1 año: 90 €</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold">Paquete “Flash Premium” </h3>
                    <ul>
                        <li>
                            Descripción: Imagen (hero), con enlace a la web del
                            anunciante + anuncio destacado.
                        </li>
                        <li>
                            Visibilidad: el banner se muestra durante 1 mes en
                            la parte superior de toda la sección de
                            clasificados.
                        </li>
                        <li>1 mes: 50 €</li>
                    </ul>
                </div>
            </div>

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
                        value={package_id}
                        className="form-input w-full py-2 h-auto"
                        onChange={handleChange}
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
                        value={category_id}
                        className="form-input w-full py-2 h-auto"
                        onChange={handleChange}
                    >
                        <option value="">Selecciona</option>
                        {categories.map((categorie) => (
                            <option key={categorie.id} value={categorie.id}>
                                {categorie.name}
                            </option>
                        ))}
                    </select>
                    {selectedDescription && (
                        <p className="mt-2 text-sm text-gray-600">
                            {selectedDescription}
                        </p>
                    )}
                </label>

                <label className="flex flex-col mb-4 w-full">
                    <span className="font-semibold">Título:*</span>
                    <input
                        type="text"
                        name="title"
                        placeholder="Título del anuncio"
                        required
                        value={title}
                        onChange={handleChange}
                        className="form-input"
                    />
                </label>

                <label className="flex flex-col mb-4 w-full">
                    <span className="font-semibold">Descripción:</span>
                    <textarea
                        type="text"
                        name="description"
                        placeholder="Descripción de tu anuncio. Máximo 2000 caracteres."
                        value={description}
                        onChange={handleChange}
                        className="form-input"
                    />
                </label>

                <label className="flex flex-col mb-4 w-full">
                    <span className="font-semibold">Dirección:</span>
                    <input
                        type="text"
                        name="address"
                        placeholder="Dirección de la empresa"
                        value={address}
                        onChange={handleChange}
                        className="form-input"
                    />
                </label>

                <label className="flex flex-col mb-4 w-full">
                    <span className="font-semibold">Ciudad:</span>
                    <input
                        type="text"
                        name="city"
                        placeholder="Ciudad"
                        value={city}
                        onChange={handleChange}
                        className="form-input"
                    />
                </label>

                <label className="flex flex-col mb-4 w-full">
                    <span className="font-semibold">Provincia:*</span>

                    <select
                        id="provincia_id"
                        name="provincia_id"
                        value={provincia_id}
                        required
                        className="form-select"
                        onChange={handleChange}
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
                        value={link}
                        onChange={handleChange}
                        className="form-input"
                    />
                </label>
                <label className="flex flex-col mb-4 w-full">
                    <span className="font-semibold">Email de contacto:</span>
                    <input
                        type="email"
                        name="contact_email"
                        placeholder="Email de contacto"
                        value={contact_email}
                        onChange={handleChange}
                        className="form-input"
                    />
                </label>

                <label className="flex flex-col mb-4 w-full">
                    <span className="font-semibold">Teléfono:</span>
                    <input
                        type="number"
                        name="contact_phone"
                        placeholder="Teléfono de contacto"
                        value={contact_phone}
                        onChange={handleChange}
                        className="form-input"
                    />
                </label>

                <label className="flex flex-col mb-4 w-full">
                    Imagen:*
                    <input
                        type="file"
                        name="image"
                        required
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-dashed border-gray-400 rounded-lg text-sm text-gray-500"
                    />
                    <p className="text-gray-400 text-xs mt-2">
                        PNG, JPG, GIF hasta 2MB
                    </p>
                </label>

                <input
                    type="submit"
                    value="Enviar anuncio"
                    className="btn-account my-8 mx-auto p-3 w-full max-w-80 font-semibold"
                />

                <div className="w-full">{error && <p>{error}</p>}</div>
            </form>

            <Toastify />
        </>
    ) : (
        <h1 className="text-center text-xl">No puedes acceder a esta página</h1>
    );
};

export default AdvertNewCreation;