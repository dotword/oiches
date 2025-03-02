import { toast } from 'react-toastify';
import Toastify from '../Toastify';
import { FaPencilAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EditPublishItemAdmin = ({ idItem, token, published, roles }) => {
    const { VITE_API_URL_BASE } = import.meta.env;

    const handlePublish = async () => {
        try {
            const response = await fetch(
                `${VITE_API_URL_BASE}/published-${roles}/${idItem}`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.ok) {
                toast.success('Publicada con éxito');
            }
        } catch (error) {
            toast.error('Error al publicar');
        }
    };

    return (
        <>
            {published === 0 && (
                <button
                    className="btn-account max-w-44 min-w-32 bg-green-700"
                    onClick={handlePublish}
                >
                    Publicar
                </button>
            )}
            {roles !== 'agencia' && (
                <Link
                    to={`/${roles}/${idItem}/edit`}
                    className="flex justify-end gap-4 mb-16"
                >
                    <FaPencilAlt className=" text-2xl" />
                    Editar
                </Link>
            )}
            <Toastify />
        </>
    );
};

export default EditPublishItemAdmin;
