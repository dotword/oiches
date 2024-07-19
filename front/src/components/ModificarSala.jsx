import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Toastify from './Toastify.jsx';
import { toast } from 'react-toastify';
import { Input } from './Input.jsx';
import { AuthContext } from '../context/auth/auth.context.jsx';
import {
    getRoomService,
    saveRoomService,
} from '../services/ModificarSalaService.jsx';

const RoomForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { roomId } = useParams();
    const auth = useContext(AuthContext);
    const { token } = auth;

    useEffect(() => {
        if (roomId) {
            const fetchRoom = async () => {
                try {
                    const { data } = await getRoomService(roomId, token);
                    setName(data.name);
                    setDescription(data.description);
                } catch (error) {
                    setError(error.message);
                    toast.error('Error al cargar la sala');
                }
            };

            fetchRoom();
        }
    }, [roomId, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await saveRoomService({ name, description }, roomId, token);
            toast.success(
                `Sala ${roomId ? 'modificada' : 'creada'} exitosamente`
            );
            navigate('/rooms');
        } catch (error) {
            setError(error.message);
            toast.error('Error al guardar la sala');
        }
    };

    return (
        <>
            <section>
                <div>{'front/public/Room.jpg'}</div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <h3>{roomId ? 'Modificar Sala' : 'Crear Sala'}</h3>
                        <p>Lorem ipsum dolor sit amet consectetur</p>
                        <hr />
                        <div>
                            <label htmlFor="name">
                                Nombre de la sala*
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Introduce el nombre de la sala"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </label>
                            <label htmlFor="description">
                                Descripción*
                                <Input
                                    type="text"
                                    name="description"
                                    placeholder="Introduce la descripción de la sala"
                                    required
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </label>
                        </div>
                        {error && <p>{error}</p>}
                        <button type="submit">
                            {roomId ? 'Modificar Sala' : 'Crear Sala'}
                        </button>
                        <p>
                            <Link to="/rooms">Volver a salas</Link>
                        </p>
                    </form>
                </div>
            </section>
            <Toastify />
        </>
    );
};

export default RoomForm;
