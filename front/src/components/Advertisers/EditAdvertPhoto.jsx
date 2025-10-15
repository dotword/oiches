import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { EditAdvertPhotoService } from '../../services/Advertisers/AdvertDetailsEditService.js';
import { toast } from 'react-toastify';

const EditAdvertPhoto = ({ advertData, token }) => {
    const { idAdvert } = useParams();

    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const inputRef = useRef(null);

    // Inicializar preview con la imagen del servidor (si existe)
    useEffect(() => {
        if (!previewUrl && advertData?.image_url) {
            setPreviewUrl(
                `${import.meta.env.VITE_API_URL_BASE}/uploads/${
                    advertData.image_url
                }`
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [advertData]);

    // Cleanup: revoke object URL cuando cambie o al desmontar
    useEffect(() => {
        return () => {
            if (previewUrl && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    // --- Aquí está la función solicitada: handleFileChange solo crea preview ---
    const handleFileChange = (e) => {
        const selected = e.target.files && e.target.files[0];
        if (!selected) return;

        // Si había un preview local anterior, liberarlo
        if (previewUrl && previewUrl.startsWith('blob:')) {
            URL.revokeObjectURL(previewUrl);
        }

        setFile(selected);
        setPreviewUrl(URL.createObjectURL(selected));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            toast.error('Selecciona primero una imagen.');
            return;
        }

        setIsUploading(true);
        try {
            const formData = new FormData();
            // Mantengo la key 'poster' como en tu ejemplo backend
            formData.append('poster', file);

            await EditAdvertPhotoService({ idAdvert, token, formData });

            toast.success('Poster cambiado con éxito');
            // limpiar estado local (mantener preview hasta que quieras reemplazarlo por la URL remota)
            setFile(null);
            if (inputRef.current) inputRef.current.value = null;
        } catch (err) {
            console.error(err);
            toast.error(err.message || 'Error al subir la imagen');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        advertData && (
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-4"
            >
                <label className="max-w-md h-full border-2 border-gray-200 border-dashed rounded-lg cursor-pointer bg-gray-200/30 hover:bg-gray-200/50 hover:border-indigo-500 transition-all duration-200 group overflow-hidden">
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt="Vista previa"
                            className="object-contain"
                        />
                    ) : (
                        <div className="bg-gray-100 flex items-center justify-center">
                            <span className="text-sm text-gray-400">
                                Sin imagen
                            </span>
                        </div>
                    )}
              
                <input
                    id="advert-image-input"
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
                </label>

                {file && (
                    <div>
                        <input
                            type="submit"
                            value={
                                isUploading
                                    ? 'Subiendo...'
                                    : 'Cambiar imagen'
                            }
                            disabled={isUploading}
                            className="btn-account max-w-44"
                        />
                    </div>
                )}

                {previewUrl && (
                    <div className="flex gap-3 mt-2">
                        <button
                            type="button"
                            onClick={() =>
                                inputRef.current && inputRef.current.click()
                            }
                            className="btn-account px-3 py-2"
                        >
                            Selecciona una nueva imagen
                        </button>
                    </div>
                )}
            </form>
        )
    );
};

export default EditAdvertPhoto;
