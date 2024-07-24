import { AuthContext } from '../context/auth/auth.context';
import { useContext, useEffect } from 'react';

const DeleteSalaPhoto = (props) => {
    const { token } = useContext(AuthContext);

    const url = `${import.meta.env.VITE_API_URL_BASE}/salas/${
        props.photoName
    }/${props.deletePhoto}`;

    useEffect(() => {
        const getEntry = async () => {
            try {
                await fetch(url, {
                    headers: {
                        token: token,
                    },
                    method: 'DELETE',
                });
            } catch (error) {
                console.error('Hubo un error al borrar la foto', error);
            }
        };

        getEntry();
    });
};

export default DeleteSalaPhoto;
