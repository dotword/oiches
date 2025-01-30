import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext.jsx';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import getSalaService from '../../services/Salas/getSalaService.js';
import { DeleteSalaPhotoService } from '../../services/Salas/AddSalaPhotosService.js';

const DeleteSalaPhotos = () => {
    const { currentUser, token } = useContext(AuthContext);
    const { idSala } = useParams();
    const urlUploads = `${import.meta.env.VITE_API_URL_BASE}/uploads`;

    const [photos, setPhotos] = useState([]);
    const [deletePhoto, setDeletePhoto] = useState(null);
    const [photoName, setPhotoName] = useState('');

    useEffect(() => {
        const fetchSalaPhotos = async () => {
            try {
                const { data } = await getSalaService(idSala);
                setPhotos(data.sala.photos);
            } catch (error) {
                toast.error(error.message); // Muestra el error directamente sin usar setError
            }
        };

        fetchSalaPhotos();
    }, [idSala]);

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await DeleteSalaPhotoService(photoName, deletePhoto, token);
            toast.success('Borraste la foto con éxito');
            setPhotos(photos.filter((photo) => photo.id !== deletePhoto));
            setDeletePhoto(null);
            setPhotoName('');
        } catch (err) {
            toast.error(err.message); // Mostramos error con toastify
        }
    };

    const renderPhoto = (photo) => (
        <div className="mb-6" key={photo.id}>
            <div className="sect-photo">
                <div className="border-photos w-full">
                    <img
                        src={`${urlUploads}/${photo.name}`}
                        alt="Vista previa"
                    />
                </div>
            </div>
            {photo.id === deletePhoto ? (
                <button
                    id="buttonConfirm"
                    onClick={handleClick}
                    className="btn-account max-w-44 mt-3"
                >
                    Confirmar borrado
                </button>
            ) : (
                <button
                    onClick={() => {
                        setDeletePhoto(photo.id);
                        setPhotoName(photo.name);
                    }}
                    className="btn-account max-w-44 mt-3"
                >
                    Borrar foto
                </button>
            )}
        </div>
    );

    return currentUser ? (
        <div className="mb-6 flex flex-wrap gap-x-8">
            {photos.map(renderPhoto)}
        </div>
    ) : (
        ''
    );
};

export default DeleteSalaPhotos;
