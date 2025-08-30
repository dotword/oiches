import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EditAdvertPhotoService } from '../../services/Advertisers/AdvertDetailsEditService.js';
import { toast } from 'react-toastify';

const EditAdvertPhoto = ({ advertData, token }) => {
    const { idAdvert } = useParams();

    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    // Inicializar preview con la imagen actual del servidor si no hay preview local
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

    useEffect(() => {
        return () => {
            if (previewUrl && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (!selected) return;

        // si había un preview local anterior, liberar
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

            formData.append('poster', file);

            await EditAdvertPhotoService({ idAdvert, token, formData });

            toast.success('Poster cambiado con éxito');

            setFile(null);
        } catch (err) {
            console.error(err);
            toast.error(err.message || 'Error al subir la imagen');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        advertData && (
            <section className="mb-4">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="sect-photo w-96 h-96 relative">
                        {previewUrl ? (
                            <img
                                src={previewUrl}
                                alt="Vista previa"
                                className="w-96 h-96 object-cover rounded"
                            />
                        ) : (
                            <div className="w-96 h-96 bg-gray-100 flex items-center justify-center">
                                <span className="text-sm text-gray-400">
                                    Sin imagen
                                </span>
                            </div>
                        )}
                    </div>

                    <input
                        id="advert-image-input"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />

                    <label
                        htmlFor="advert-image-input"
                        className="inline-block btn-account px-4 py-2 cursor-pointer select-none"
                    >
                        Seleccionar imagen
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
                </form>
            </section>
        )
    );
};

export default EditAdvertPhoto;
