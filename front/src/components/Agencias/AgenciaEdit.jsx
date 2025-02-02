import { useState, useEffect } from 'react';
// import AuthContext from '../../context/auth/AuthContext.jsx';
// import { useParams } from 'react-router-dom';
import Toastify from '../Toastify.jsx';
import { toast } from 'react-toastify';
import FetchProvinciasService from '../../services/FetchProvinciasService.js';
import getAgenciaService from '../../services/Agencias/getAgenciaService.js';
import EditAgenciaService from '../../services/Agencias/EditAgenciaService.js';
import DeleteUserSalaGrupo from '../Users/DeleteUserSalaGrupo.jsx';

const AgenciaEdit = ({ userLogged, token, idAgencia }) => {
    const [agencia, setAgencia] = useState({
        nombre: '',
        provincia: '',
        descripcion: '',
        web: '',
    });

    const [provinces, setProvinces] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        FetchProvinciasService(setProvinces);
    }, []);

    useEffect(() => {
        const fetchAgencia = async () => {
            try {
                const { data } = await getAgenciaService(idAgencia);

                setAgencia({
                    nombre: data.agencia.nombre || '',
                    provincia: data.agencia.provinciaId || '',
                    descripcion: data.agencia.descripcion || '',
                    web: data.agencia.web || '',
                    owner: data.agencia.usuario_id,
                });
            } catch (error) {
                setError(error.message);
                toast.error(error.message);
            }
        };

        fetchAgencia();
    }, [idAgencia]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const dataForm = new FormData();
            dataForm.append('nombre', agencia.nombre || '');
            dataForm.append('provincia', agencia.provincia || '');
            dataForm.append('descripcion', agencia.descripcion || '');
            dataForm.append('web', agencia.web || '');

            await EditAgenciaService({
                token,
                idAgencia,
                dataForm,
            });
            toast.success('Has modificado tu agencia con éxito');
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };

    return (userLogged && agencia.owner === userLogged.id) ||
        (userLogged && userLogged.roles === 'admin') ? (
        <>
            <div className="px-6 pt-3 pb-6 md:px-12 bg-white rounded-lg shadow-md ">
                <form onSubmit={handleSubmit} className="">
                    {/* Nombre */}
                    <div className="flex flex-col mb-4">
                        <label htmlFor="nombre">
                            <span className="font-semibold">
                                Nombre de la agencia:
                            </span>

                            <input
                                type="text"
                                name="nombre"
                                placeholder="Nombre de la agencia"
                                value={agencia.nombre}
                                onChange={(e) =>
                                    setAgencia({
                                        ...agencia,
                                        nombre: e.target.value,
                                    })
                                }
                                className="form-input"
                            />
                        </label>
                    </div>

                    {/* Provincia */}
                    <div className="flex flex-col mb-4">
                        <label htmlFor="province" className="font-semibold">
                            Provincia:
                        </label>
                        <select
                            name="provincia"
                            value={agencia.provincia}
                            className="form-select"
                            onChange={(e) =>
                                setAgencia({
                                    ...agencia,
                                    provincia: e.target.value,
                                })
                            }
                        >
                            <option value="">Provincia</option>
                            {provinces.map((province) => (
                                <option key={province.id} value={province.id}>
                                    {province.provincia}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Web */}
                    <div className="flex flex-col mb-4">
                        <label htmlFor="web" className="font-semibold">
                            Web o enlace a tus RRSS:
                        </label>
                        <input
                            type="url"
                            name="web"
                            placeholder="https://www.tuagencia.com"
                            value={agencia.web}
                            className="form-input"
                            onChange={(e) =>
                                setAgencia({ ...agencia, web: e.target.value })
                            }
                        />
                    </div>

                    <div className="flex flex-col mb-4">
                        <label htmlFor="descripcion" className="font-semibold">
                            Descripción:
                        </label>
                        <textarea
                            name="descripcion"
                            value={agencia.descripcion}
                            onChange={(e) =>
                                setAgencia({
                                    ...agencia,
                                    descripcion: e.target.value,
                                })
                            }
                            className="form-textarea"
                        ></textarea>
                        <p className="mt-1 text-gray-500 text-sm">
                            2000 caracteres como máximo
                        </p>
                    </div>

                    <div className="my-8 max-w-80">
                        <input
                            type="submit"
                            value="Modificar datos"
                            className="btn-account p-3 w-full"
                        />
                    </div>
                    <div>{error && <p>{error}</p>}</div>
                </form>
            </div>
            <section className="flex justify-end my-8">
                <DeleteUserSalaGrupo
                    userLogged={userLogged}
                    token={token}
                    id={idAgencia}
                    type="agencia"
                />
            </section>
            <Toastify />
        </>
    ) : (
        <h1 className="text-center text-xl">No puedes acceder a esta página</h1>
    );
};

export default AgenciaEdit;
