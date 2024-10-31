import { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../context/auth/auth.context.jsx';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import getSalasServices from '../services/getSalaService.js';
import {
    AddSalaFilesService,
    DeleteSalaFilesService,
} from '../services/salaFilesService.js';

const urlUploads = `${import.meta.env.VITE_API_URL_BASE}/uploads`;

export const AddSalaRiderForm = () => {
    const { idSala } = useParams();
    const { token } = useContext(AuthContext);

    const [rider, setRider] = useState(null);
    const [photoName, setPhotoName] = useState(null);
    const [deletePhoto, setDeletePhoto] = useState(null);
    const [riderError, setRiderError] = useState('');
    const [uploadedRider, setUploadedRider] = useState(null); // Para mostrar el PDF subido

    const fetchRider = useCallback(async () => {
        try {
            const { data } = await getSalasServices(idSala);

            if (data.sala.pdf && data.sala.pdf.length > 0) {
                const riderData = data.sala.pdf[0];
                setUploadedRider(`${urlUploads}/${riderData.name}`);
                setDeletePhoto(riderData.id);
                setPhotoName(riderData.name);
            } else {
                setUploadedRider(null);
                setDeletePhoto(null);
                setPhotoName(null);
            }
        } catch (error) {
            toast.error('Error al cargar el Rider');
        }
    }, [idSala]);

    useEffect(() => {
        fetchRider();
    }, [fetchRider]);

    // Manejar el envío del rider
    const handleRiderSubmit = async (e) => {
        e.preventDefault();

        if (!rider) {
            setRiderError('Selecciona un rider en formato PDF.');
            return;
        }

        try {
            const dataForm = new FormData();
            dataForm.append('rider', rider);

            const response = await AddSalaFilesService({
                token,
                idSala,
                dataForm,
            });

            // Si la subida fue exitosa, actualiza la previsualización y recarga el rider
            if (response.status === 'ok') {
                toast.success('Has subido el rider con éxito.');
                setRider(null); // Resetea el input
                setRiderError(''); // Limpiar el mensaje de error
                await fetchRider(); // Recargar el rider desde el backend
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Manejar la selección de un rider (PDF)
    const handleRiderChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setRider(file);
            setRiderError('');
        } else {
            setRiderError('Solo se permiten archivos PDF para el rider.');
        }
    };

    // Manejar el borrado del rider
    const handleDeleteRider = async () => {
        try {
            await DeleteSalaFilesService(photoName, deletePhoto, token);

            // Si la eliminación es exitosa, recargar el rider desde el backend
            toast.success('Rider borrado con éxito');
            await fetchRider(); // Recargar el rider para actualizar la UI
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <form onSubmit={handleRiderSubmit} className="mb-8 w-full">
            <p className="font-semibold mb-2">Sube el Rider (.pdf)</p>
            <p className="text-xs mb-3">
                (*) El tamaño del archivo no debe exceder 3Mb
            </p>
            {/* Previsualización del Rider ya subido */}
            {uploadedRider && (
                <div className="sect-photo">
                    <embed
                        src={uploadedRider}
                        type="application/pdf"
                        height="300px"
                        className="max-w-full"
                    />
                    <button
                        type="button"
                        onClick={handleDeleteRider}
                        className="btn-account max-w-44 mt-3 bg-red-500 hover:bg-red-700"
                    >
                        Borrar Rider
                    </button>
                </div>
            )}

            {/* Input para subir un nuevo Rider */}
            {!uploadedRider && (
                <>
                    <div className="sect-photo">
                        <span className="border-photos w-auto max-w-72">
                            {rider ? (
                                <span className="text-sm p-1 overflow-hidden text-center">
                                    {rider.name}
                                </span>
                            ) : (
                                <span>Sube tu Rider (PDF)</span>
                            )}

                            <input
                                type="file"
                                accept=".pdf"
                                className="absolute w-full h-full opacity-0 cursor-pointer"
                                onChange={handleRiderChange}
                            />
                        </span>
                        {riderError && (
                            <p className="text-red-500">{riderError}</p>
                        )}
                    </div>
                    {rider && (
                        <div className="mt-3 max-w-80">
                            <input
                                type="submit"
                                value="Subir Rider"
                                className="btn-account max-w-44"
                            />
                        </div>
                    )}
                </>
            )}
        </form>
    );
};
