import { useState, useContext } from 'react';
import { AuthContext } from '../context/auth/auth.context.jsx';
import { toast } from 'react-toastify';
import Toastify from './Toastify.jsx';
import AddSalaPhotosService from '../services/AddSalaPhotosService.js';

const AddSalaPhotos = (idSala) => {
    const { currentUser, token } = useContext(AuthContext);
    const [photoA, setPhotoA] = useState(null);
    const [previewUrlA, setPreviewUrlA] = useState(null);

    const [error, setError] = useState('');
    const [resp, setResp] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!photoA) {
            setResp('Selecciona una imagen');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('photoA', photoA);
            const response = await AddSalaPhotosService({
                token,
                formData,
                idSala,
            });
            setResp(response);
            toast.success('Foto subida con éxito');
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };

    return currentUser ? (
        <>
            <form onSubmit={handleSubmit} className="w-full">
                <div className="sect-photo">
                    <span className="border-photos w-full">
                        {previewUrlA ? (
                            <img src={previewUrlA} alt="Vista previa" />
                        ) : (
                            <span>Sube una foto</span>
                        )}

                        <input
                            type="file"
                            name="photoA"
                            className="absolute w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => {
                                setPhotoA(e.target.files[0]);
                                setPreviewUrlA(
                                    URL.createObjectURL(e.target.files[0])
                                );
                            }}
                        />
                    </span>
                </div>

                {previewUrlA ? (
                    <div className="mt-3 max-w-80">
                        <input
                            type="submit"
                            value="Subir fotos"
                            className="btn-account max-w-44"
                        />
                    </div>
                ) : (
                    ''
                )}
                <div>
                    {error && <p>{error}</p>}
                    {resp.status === 'ok' && <p>{resp.message}</p>}
                </div>
            </form>
            <Toastify />
        </>
    ) : (
        <h1 className="text-center text-xl">No puedes acceder a esta página</h1>
    );
};

export default AddSalaPhotos;
