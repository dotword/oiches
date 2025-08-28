import { useState, useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext.jsx';
import { toast } from 'react-toastify';
import Toastify from '../Toastify.jsx';
import { useParams, Link } from 'react-router-dom';
import AdvertiserProfileCreationService from '../../services/Advertisers/AdvertiserProfileCreationService.js';
import AccountConfiguration from '../Users/AccountConfiguration.jsx';
import useUser from '../../hooks/useUser.jsx';
import { IoChevronForward } from 'react-icons/io5';

const AdvertiserProfileCreation = () => {
    const { userLogged, token } = useContext(AuthContext);
    const { userId } = useParams();
    const userData = useUser(userId);

    const [formValues, setFormValues] = useState({
        nombreEmpresa: '',
        nombreContacto: '',
        direccion: '',
        ciudad: '',
        codigoPostal: '',
        telefono: '',
        cif: '',
    });

    const [error, setError] = useState('');
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nombreEmpresa', formValues.nombreEmpresa);
        formData.append('nombreContacto', formValues.nombreContacto);
        formData.append('direccion', formValues.direccion);
        formData.append('ciudad', formValues.ciudad);
        formData.append('codigoPostal', formValues.codigoPostal);
        formData.append('telefono', formValues.telefono);
        formData.append('cif', formValues.cif);

        try {
            await AdvertiserProfileCreationService({ token, userId, formData });

            toast.success(
                'Tus datos han sido guardados correctamente. Ahora puedes publicar anuncios.'
            );
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };

    const {
        nombreEmpresa,
        nombreContacto,
        direccion,
        ciudad,
        codigoPostal,
        telefono,
        cif,
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
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 mt-6">
                Datos de facturación
            </h2>
            <form
                onSubmit={handleSubmit}
                className="mb-12 md:flex md:flex-wrap gap-x-8"
            >
                <label
                    htmlFor="nombreEmpresa"
                    className="flex flex-col mb-4 md:w-[calc(50%-1rem)]"
                >
                    <span className="font-semibold">Empresa:*</span>

                    <input
                        type="text"
                        name="nombreEmpresa"
                        placeholder="Nombre de la empresa"
                        required
                        value={nombreEmpresa}
                        onChange={handleChange}
                        className="form-input"
                    />
                </label>

                <label
                    htmlFor="nombreContacto"
                    className="flex flex-col mb-4 md:w-[calc(50%-1rem)]"
                >
                    <span className="font-semibold">Nombre de contacto:</span>
                    <input
                        type="text"
                        name="nombreContacto"
                        placeholder="Nombre de contacto"
                        value={nombreContacto}
                        onChange={handleChange}
                        className="form-input"
                    />
                </label>

                <label
                    htmlFor="direccion"
                    className="flex flex-col mb-4 md:w-full"
                >
                    <span className="font-semibold">Dirección:*</span>
                    <input
                        type="text"
                        name="direccion"
                        placeholder="Dirección de la empresa"
                        required
                        value={direccion}
                        onChange={handleChange}
                        className="form-input"
                    />
                </label>

                <label
                    htmlFor="ciudad"
                    className="flex flex-col mb-4 md:w-[calc(50%-1rem)]"
                >
                    <span className="font-semibold">Ciudad:*</span>
                    <input
                        type="text"
                        name="ciudad"
                        placeholder="Ciudad"
                        required
                        value={ciudad}
                        onChange={handleChange}
                        className="form-input"
                    />
                </label>

                <label
                    htmlFor="codigoPostal"
                    className="flex flex-col mb-4 md:w-[calc(50%-1rem)]"
                >
                    <span className="font-semibold">Código Postal:*</span>
                    <input
                        type="text"
                        name="codigoPostal"
                        placeholder="Código Postal"
                        required
                        value={codigoPostal}
                        onChange={handleChange}
                        className="form-input"
                    />
                </label>

                <label
                    htmlFor="telefono"
                    className="flex flex-col mb-4 md:w-[calc(50%-1rem)]"
                >
                    <span className="font-semibold">Teléfono:</span>
                    <input
                        type="number"
                        name="telefono"
                        placeholder="Teléfono de contacto"
                        value={telefono}
                        onChange={handleChange}
                        className="form-input"
                    />
                </label>
                <label
                    htmlFor="cif"
                    className="flex flex-col mb-4 md:w-[calc(50%-1rem)]"
                >
                    <span className="font-semibold">NIF/CIF:*</span>
                    <input
                        type="text"
                        name="cif"
                        placeholder="NIF o CIF de la empresa"
                        required
                        value={cif}
                        onChange={handleChange}
                        className="form-input"
                    />
                </label>

                <input
                    type="submit"
                    value="Guardar"
                    className="btn-account my-8 mx-auto p-3 w-full max-w-80 font-semibold"
                />

                <div className="w-full">{error && <p>{error}</p>}</div>
            </form>
            <AccountConfiguration
                userLogged={userLogged}
                userData={userData}
                userId={userId}
                token={token}
            />
            <Toastify />
        </>
    ) : (
        <h1 className="text-center text-xl">No puedes acceder a esta página</h1>
    );
};

export default AdvertiserProfileCreation;
