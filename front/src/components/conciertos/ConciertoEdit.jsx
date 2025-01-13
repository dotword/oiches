import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/auth/auth.context.jsx';
import { useParams } from 'react-router-dom';
import useConcierto from '../../hooks/useConcierto.jsx';
import Calendar from 'react-calendar';
import Toastify from '../Toastify.jsx';
import { toast } from 'react-toastify';
import EditConciertoService from '../../services/conciertos/EditConciertoService.js';
const { VITE_API_URL_BASE } = import.meta.env;
import apiRequest from '../../utils/apiRequest.js';
import DeleteConcierto from './DeleteConcierto.jsx';

const ConciertoEdit = () => {
    const { userLogged, token } = useContext(AuthContext);
    const { conciertoId } = useParams();
    const { concierto } = useConcierto(conciertoId);
    const [selectedDate, setSelectedDate] = useState(concierto.fecha);
    const [poster, setPoster] = useState('');
    const [previewUrl, setPreviewUrl] = useState(null);

    const [concert, setConcert] = useState({
        fecha: '',
        hora: '',
        precio: '',
        link: '',
    });

    // Actualiza el estado solo cuando 'concierto' cambia
    useEffect(() => {
        if (concierto) {
            const formattedDate = concierto.fecha
                ? formatFecha(concierto.fecha)
                : '';
            setConcert({
                fecha: formattedDate,
                hora: concierto.hora || '',
                precio: concierto.precio || '',
                link: concierto.link || '',
            });
            setSelectedDate(concierto.fecha ? new Date(concierto.fecha) : null);
        }
    }, [concierto]); // Dependencia en concierto

    const formatFecha = (fecha) => {
        const date = new Date(fecha);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            '0'
        )}-${String(date.getDate()).padStart(2, '0')}`;
    };

    const handleChangeDate = (date) => {
        // Formatea la fecha seleccionada y actualiza formValues
        const formattedDate = formatFecha(date);
        setSelectedDate(date);
        setConcert({
            ...concert,
            fecha: formattedDate, // Actualiza la fecha en formValues
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const dataForm = new FormData();
            dataForm.append('fecha', concert.fecha);
            dataForm.append('hora', concert.hora || '');
            dataForm.append('precio', concert.precio || '');
            dataForm.append('link', concert.link || '');

            await EditConciertoService({
                token,
                conciertoId,
                dataForm,
            });
            toast.success('Has modificado el concierto con éxito');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handlePosterChange = (e) => {
        setPoster(e.target.files[0]);
        setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    };

    const handlePosterSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('poster', poster);
            const url = `${VITE_API_URL_BASE}/concierto/${conciertoId}/editPoster`;
            await apiRequest({
                url,
                method: 'PUT',
                headers: {
                    authorization: token,
                },
                body: data,
            });
            toast.success('Poster modificado');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return userLogged && userLogged.roles === 'admin' ? (
        <>
            <h1 className="text-center font-semibold mb-8 text-xl">
                Concierto de {concierto.artista} en {concierto.sala}
            </h1>
            <section className="flex flex-wrap justify-evenly gap-8">
                <form
                    onSubmit={handleSubmit}
                    className="md:max-w-[calc(50%-1rem)]"
                >
                    <p className="font-semibold mb-2">Fecha del concierto*</p>
                    <Calendar
                        value={selectedDate}
                        onChange={handleChangeDate}
                    />

                    <label>
                        <span className="font-semibold mr-2">Hora:</span>
                        <input
                            type="time"
                            name="hora"
                            value={concert.hora}
                            onChange={(e) =>
                                setConcert({ ...concert, hora: e.target.value })
                            }
                        />
                    </label>

                    <label>
                        <span className="font-semibold mr-2">Precio:</span>
                        <input
                            type="number"
                            name="precio"
                            value={concert.precio}
                            onChange={(e) =>
                                setConcert({
                                    ...concert,
                                    precio: e.target.value,
                                })
                            }
                            className="form-input max-w-32"
                        />
                    </label>

                    <label className="flex items-baseline">
                        <span className="font-semibold mr-2">Enlace:</span>
                        <input
                            type="url"
                            name="link"
                            value={concert.link}
                            onChange={(e) =>
                                setConcert({ ...concert, link: e.target.value })
                            }
                            className="form-input"
                        />
                    </label>

                    <div className="flex gap-4 mt-6 justify-center">
                        <button className="btn-account">
                            Editar concierto
                        </button>
                    </div>
                </form>

                <form onSubmit={handlePosterSubmit}>
                    <div className="sect-photo">
                        <span className="border-photos">
                            {previewUrl ? (
                                <img
                                    src={previewUrl}
                                    alt="Vista previa"
                                    className="object-cover"
                                />
                            ) : (
                                <img
                                    src={
                                        concierto.poster &&
                                        `${
                                            import.meta.env.VITE_API_URL_BASE
                                        }/uploads/${concierto.poster}`
                                    }
                                    alt="avatar"
                                    className="w-40 h-40 object-cover"
                                />
                            )}
                            <input
                                type="file"
                                name="poster"
                                className="absolute w-full h-full opacity-0 cursor-pointer"
                                onChange={handlePosterChange}
                            />
                        </span>
                    </div>
                    {previewUrl && (
                        <div className="mt-3 max-w-80 text-center">
                            <input
                                type="submit"
                                value="Cambiar poster"
                                className="btn-account max-w-44"
                            />
                        </div>
                    )}
                </form>
            </section>

            <section className="flex justify-end mb-10 lg:w-full">
                <DeleteConcierto
                    userLogged={userLogged}
                    token={token}
                    conciertoId={conciertoId}
                />
            </section>

            <Toastify />
        </>
    ) : (
        <h1 className="text-center text-xl">No puedes acceder a esta página</h1>
    );
};

export default ConciertoEdit;
