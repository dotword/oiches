import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth/auth.context.jsx';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import getSalaService from '../services/getSalaService.js';

const DeleteSalaPhotos = () => {
    const { currentUser, token } = useContext(AuthContext);
    const { idSala } = useParams();

    const urlUploads = `${import.meta.env.VITE_API_URL_BASE}/uploads`;

    const [photoA, setPhotoA] = useState(null);
    const [photoB, setPhotoB] = useState(null);
    const [photoC, setPhotoC] = useState(null);
    const [photoD, setPhotoD] = useState(null);
    const [deletePhoto, setDeletePhoto] = useState('');
    const [photoName, setPhotoName] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSalaPhotos = async () => {
            try {
                const { data } = await getSalaService(idSala);

                setPhotoA(data.sala.photos[0]);
                setPhotoB(data.sala.photos[1]);
                setPhotoC(data.sala.photos[2]);
                setPhotoD(data.sala.photos[3]);
            } catch (error) {
                setError(error.message);
                toast.error('Error al cargar las fotos');
            }
        };

        fetchSalaPhotos();
    }, [idSala]);

    const handleClick = async (e) => {
        try {
            e.preventDefault();

            const url = `${
                import.meta.env.VITE_API_URL_BASE
            }/salas/${photoName}/${deletePhoto}`;

            await fetch(url, {
                headers: {
                    token: token,
                },
                method: 'DELETE',
            });
            toast.success('Borraste la foto con éxito');
        } catch (err) {
            setError(error.message);
            toast.error(error.message);
        }
    };

    return currentUser ? (
        <div className="flex flex-wrap justify-center gap-6 mb-12">
            {photoA ? (
                <section className="sect-photo ">
                    <div className="border-photos">
                        <img
                            src={`${urlUploads}/${photoA.name}`}
                            alt="Vista previa"
                            width={'200px'}
                        />
                    </div>
                    <button
                        id="buttonDelete"
                        onClick={() => {
                            setDeletePhoto(photoA.id);
                            setPhotoName(photoA.name);
                            const buttonConfirm =
                                document.getElementById('buttonConfirm');
                            buttonConfirm.classList.remove('hidden');
                            const buttonDelete =
                                document.getElementById('buttonDelete');
                            buttonDelete.classList.add('hidden');
                        }}
                        className="btn-account my-4"
                    >
                        Borrar foto
                    </button>

                    <button
                        id="buttonConfirm"
                        onClick={handleClick}
                        className="btn-account hidden my-4"
                    >
                        Confirmar borrado
                    </button>
                </section>
            ) : (
                ''
            )}

            {photoB ? (
                <section className="sect-photo ">
                    <div className="border-photos">
                        <img
                            src={`${urlUploads}/${photoB.name}`}
                            alt="Vista previa"
                            width={'200px'}
                        />
                    </div>
                    <button
                        id="buttonDeleteB"
                        onClick={() => {
                            setDeletePhoto(photoB.id);
                            setPhotoName(photoB.name);
                            const buttonConfirm =
                                document.getElementById('buttonConfirmB');
                            buttonConfirm.classList.remove('hidden');
                            const buttonDelete =
                                document.getElementById('buttonDeleteB');
                            buttonDelete.classList.add('hidden');
                        }}
                        className="btn-account my-4"
                    >
                        Borrar foto
                    </button>

                    <button
                        id="buttonConfirmB"
                        onClick={handleClick}
                        className="btn-account hidden my-4"
                    >
                        Confirmar borrado
                    </button>
                </section>
            ) : (
                ''
            )}

            {photoC ? (
                <section className="sect-photo ">
                    <div className="border-photos">
                        <img
                            src={`${urlUploads}/${photoC.name}`}
                            alt="Vista previa"
                            width={'200px'}
                        />
                    </div>
                    <button
                        id="buttonDeleteC"
                        onClick={() => {
                            setDeletePhoto(photoC.id);
                            setPhotoName(photoC.name);
                            const buttonConfirm =
                                document.getElementById('buttonConfirmC');
                            buttonConfirm.classList.remove('hidden');
                            const buttonDelete =
                                document.getElementById('buttonDeleteC');
                            buttonDelete.classList.add('hidden');
                        }}
                        className="btn-account my-4"
                    >
                        Borrar foto
                    </button>

                    <button
                        id="buttonConfirmC"
                        onClick={handleClick}
                        className="btn-account hidden my-4"
                    >
                        Confirmar borrado
                    </button>
                </section>
            ) : (
                ''
            )}

            {photoD ? (
                <section className="sect-photo ">
                    <div className="border-photos">
                        <img
                            src={`${urlUploads}/${photoD.name}`}
                            alt="Vista previa"
                            width={'200px'}
                        />
                    </div>
                    <button
                        id="buttonDeleteD"
                        onClick={() => {
                            setDeletePhoto(photoD.id);
                            setPhotoName(photoD.name);
                            const buttonConfirm =
                                document.getElementById('buttonConfirmD');
                            buttonConfirm.classList.remove('hidden');
                            const buttonDelete =
                                document.getElementById('buttonDeleteD');
                            buttonDelete.classList.add('hidden');
                        }}
                        className="btn-account my-4"
                    >
                        Borrar foto
                    </button>

                    <button
                        id="buttonConfirmD"
                        onClick={handleClick}
                        className="btn-account hidden my-4"
                    >
                        Confirmar borrado
                    </button>
                </section>
            ) : (
                ''
            )}
        </div>
    ) : (
        ''
    );
};

export default DeleteSalaPhotos;
