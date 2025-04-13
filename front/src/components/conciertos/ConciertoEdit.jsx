import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext.jsx';
import { useParams } from 'react-router-dom';
import useConcierto from '../../hooks/useConcierto.jsx';
import Calendar from 'react-calendar';
import Toastify from '../Toastify.jsx';
import { toast } from 'react-toastify';
import EditConciertoService from '../../services/conciertos/EditConciertoService.js';
const { VITE_API_URL_BASE } = import.meta.env;
import apiRequest from '../../utils/apiRequest.js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DeleteConcierto from './DeleteConcierto.jsx';

const ConciertoEdit = () => {
    const { userLogged, token } = useContext(AuthContext);
    const { conciertoId } = useParams();
    const { concierto } = useConcierto(conciertoId);
    const [selectedDate, setSelectedDate] = useState(null);
    const [poster, setPoster] = useState('');
    const [previewUrl, setPreviewUrl] = useState(null);

    const [concert, setConcert] = useState({
        title: '',
        fecha: '',
        hora: '',
        precioAnticipada: '',
        precio: '',
        otroTipoEntrada: '',
        description: '',
        link: '',
        salaLink: '',
    });

    useEffect(() => {
        if (concierto) {
            const formattedDate = concierto.fecha
                ? formatFecha(concierto.fecha)
                : '';
            setConcert({
                title: concierto.title || '',
                fecha: formattedDate,
                hora: concierto.hora || '',
                precioAnticipada: concierto.precioAnticipada || '',
                precio: concierto.precio || '',
                otroTipoEntrada: concierto.otroTipoEntrada || '',
                description: concierto.description || '',
                link: concierto.link || '',
                salaLink: concierto.salaLink || '',
            });
            setSelectedDate(concierto.fecha ? new Date(concierto.fecha) : null);
        }
    }, [concierto]);

    const formatFecha = (fecha) => {
        const date = new Date(fecha);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            '0'
        )}-${String(date.getDate()).padStart(2, '0')}`;
    };

    const handleChangeDate = (date) => {
        const formattedDate = formatFecha(date);
        setSelectedDate(date);
        setConcert({
            ...concert,
            fecha: formattedDate,
        });
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataForm = new FormData();
            dataForm.append('title', concert.title || '');
            dataForm.append('fecha', concert.fecha || '');
            dataForm.append('hora', concert.hora || '');
            dataForm.append(
                'precioAnticipada',
                concert.precioAnticipada !== ''
                    ? concert.precioAnticipada
                    : null
            );
            dataForm.append(
                'precio',
                concert.precio !== '' ? concert.precio : null
            );
            dataForm.append('otroTipoEntrada', concert.otroTipoEntrada || '');
            dataForm.append('description', concert.description || '');
            dataForm.append('link', concert.link || '');
            dataForm.append('salaLink', concert.salaLink || '');

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

    return userLogged && userLogged.roles === 'admin' ? (
        <>
            <h1 className="text-center font-semibold mb-10 text-xl">
                {concierto.title ? concierto.title : concierto.artista} en{' '}
                {concierto.sala}
            </h1>

            <section>
                <form
                    onSubmit={handlePosterSubmit}
                    className="flex justify-center mb-8"
                >
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
                                        `${VITE_API_URL_BASE}/uploads/${concierto.poster}`
                                    }
                                    alt="poster"
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
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-wrap justify-between gap-4 max-w-1200 mx-auto"
                >
                    <div className="">
                        <p className="font-semibold mb-2">
                            Fecha del concierto*
                        </p>
                        <Calendar
                            value={selectedDate}
                            onChange={handleChangeDate}
                            className="mb-4"
                        />
                        <label>
                            <span className="font-semibold mr-2">Hora:</span>
                            <input
                                type="time"
                                name="hora"
                                value={concert.hora}
                                onChange={(e) =>
                                    setConcert({
                                        ...concert,
                                        hora: e.target.value,
                                    })
                                }
                            />
                        </label>
                    </div>
                    <div className="full">
                        <label className="block text-gray-700 text-sm font-medium mb-4">
                            Título (si no hay reserva)
                            <input
                                type="text"
                                name="title"
                                value={concert.title}
                                onChange={(e) =>
                                    setConcert({
                                        ...concert,
                                        title: e.target.value,
                                    })
                                }
                                className="form-input"
                            />
                        </label>
                        <label className="mr-4">
                            <span className="font-semibold mr-2">
                                Precio anticipada:
                            </span>
                            <input
                                type="number"
                                step="0.01"
                                name="precioAnticipada"
                                value={concert.precioAnticipada}
                                onChange={(e) =>
                                    setConcert({
                                        ...concert,
                                        precioAnticipada: e.target.value,
                                    })
                                }
                                className="form-input max-w-32"
                            />
                        </label>

                        <label>
                            <span className="font-semibold mr-2">
                                Precio taquilla:
                            </span>
                            <input
                                type="number"
                                step="0.01"
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
                        <label className="flex items-baseline my-4">
                            <span className="font-semibold mr-2 min-w-40">
                                Otro tipo de entrada:
                            </span>
                            <input
                                type="text"
                                name="otroTipoEntrada"
                                value={concert.otroTipoEntrada}
                                onChange={(e) =>
                                    setConcert({
                                        ...concert,
                                        otroTipoEntrada: e.target.value,
                                    })
                                }
                                className="form-input"
                            />
                        </label>
                        <label className="flex items-baseline my-4">
                            <span className="font-semibold mr-2">Enlace:</span>
                            <input
                                type="url"
                                name="link"
                                value={concert.link}
                                onChange={(e) =>
                                    setConcert({
                                        ...concert,
                                        link: e.target.value,
                                    })
                                }
                                className="form-input"
                            />
                        </label>

                        <label>
                            <span className="font-semibold">
                                Sala (ID manual):
                            </span>
                            <input
                                type="text"
                                name="salaLink"
                                value={concert.salaLink}
                                onChange={(e) =>
                                    setConcert({
                                        ...concert,
                                        salaLink: e.target.value,
                                    })
                                }
                                className="form-input"
                            />
                        </label>
                    </div>

                    <label className="block mt-4 w-full">
                        <span className="font-semibold mr-2">Descripción:</span>
                        <ReactQuill
                            value={concert.description}
                            onChange={(value) =>
                                setConcert({
                                    ...concert,
                                    description: value,
                                })
                            }
                        />
                    </label>

                    <div className="flex gap-4 mt-6 justify-center">
                        <button className="btn-account">
                            Editar concierto
                        </button>
                    </div>
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
