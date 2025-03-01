import { useState } from 'react';
import { toast } from 'react-toastify';
import Toastify from '../Toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useNotice from '../../hooks/useNotice.jsx';
import useAuth from '../../hooks/useAuth.jsx';
// import Seo from '../SEO/Seo.jsx';
import TextFormat from '../TextFormato.jsx';
import { FiExternalLink } from 'react-icons/fi';
import { IoIosArrowBack } from 'react-icons/io';
import { ConfirmationModal } from '../ConfirmModal.jsx';

const NoticeDetails = () => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const { idNotice } = useParams();
    const { userLogged, token } = useAuth();
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [deleteType, setDeleteType] = useState(null);
    const { notice } = useNotice({ idNotice, token });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const handlePublish = async () => {
        try {
            const response = await fetch(
                `${VITE_API_URL_BASE}/published-notice/${idNotice}`,
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

    const handleDelete = async (idNotice) => {
        try {
            const response = await fetch(
                `${VITE_API_URL_BASE}/delete-notice/${idNotice}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.ok) {
                toast.success('Eliminado con éxito');
                setModalOpen(false);
                setTimeout(() => {
                    navigate(`/admin-dashboard`);
                }, 3000);
            } else {
                toast.error('Error al eliminar');
            }
        } catch (error) {
            toast.error('Error al eliminar');
        }
    };

    const openModal = (idNotice) => {
        setItemToDelete(idNotice);
        setModalOpen(true);
    };

    const confirmDelete = () => {
        handleDelete(itemToDelete, deleteType);
    };

    const cancelDelete = () => {
        setModalOpen(false);
        setItemToDelete(null);
        setDeleteType(null);
    };

    return userLogged ? (
        (userLogged && userLogged.roles === 'admin') ||
        notice.estado === 'aprobado' ? (
            <>
                {/* <Seo
                    title={`${nombre} - Agencia de músicos en ${provincia}`}
                    description={`Descubre la agencia ${nombre} en ${provincia}.`}
                    keywords={`agencia, manager, ${nombre}, ${provincia}, música en vivo, eventos`}
                    url={`https://oiches.com/agencia/${idAgencia}`}
                    image={
                        avatar
                            ? `${VITE_API_URL_BASE}/uploads/${avatar}`
                            : DefaultProfile
                    }
                /> */}
                <main className="p-4 mt-6 flex flex-col gap-6 mx-auto shadow-xl w-11/12 md:max-w-1200 md:px-24">
                    <section className="mb-6">
                        <h1 className="text-3xl font-bold mt-6 text-left mb-2">
                            {notice.titulo}
                        </h1>
                        <div>
                            <p className="text-sm">
                                Publicado el: {formatDate(notice.createdAt)}
                            </p>

                            <p className="flex">
                                <a
                                    href={`/${notice.ownerRole}/${notice.salaGrupo_id}`}
                                    target="_blank"
                                    className="font-semibold flex items-center underline"
                                >
                                    {notice.nombreSalaGrupo}{' '}
                                    <FiExternalLink className="mr-2 ml-1 text-xs" />
                                </a>{' '}
                                busca{' '}
                                {notice.parentCategory &&
                                    `${notice.parentCategory}: `}
                                {notice.category}
                                {notice.provincia && ` en  ${notice.provincia}`}
                            </p>
                            {notice.genero && (
                                <div className="flex gap-x-1 mb-2">
                                    <span className="font-semibold">
                                        Géneros:{' '}
                                    </span>
                                    <ul className="flex flex-wrap">
                                        {notice.genero.map((gen, index) => (
                                            <li
                                                key={gen.generoId}
                                                className="mb-0"
                                            >
                                                {gen.generoName}
                                                {index <
                                                    notice.genero.length -
                                                        1 && (
                                                    <span>,&nbsp;</span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {notice.descripcion && (
                            <div className="border-t border-gray-300 pt-4 md:col-span-3 py-4">
                                <TextFormat text={notice.descripcion} />
                            </div>
                        )}
                        <div className="flex flex-wrap gap-6">
                            <p className="m-auto md:mr-0">
                                <a
                                    href={`mailto:${notice.email}`}
                                    className="button-large px-4"
                                >
                                    Contacta con {notice.nombreSalaGrupo}
                                </a>
                            </p>
                            <Link
                                to="/noticeboard"
                                className="button-large w-24"
                            >
                                <IoIosArrowBack />
                                Volver
                            </Link>
                        </div>
                    </section>
                    {userLogged && userLogged.roles === 'admin' && (
                        <div className="flex gap-8">
                            <button
                                className="btn-account max-w-44 min-w-32 bg-red-600"
                                onClick={() => openModal(idNotice)}
                            >
                                Eliminar
                            </button>
                            {modalOpen && (
                                <ConfirmationModal
                                    isOpen={modalOpen}
                                    text={`¿Estás seguro de que deseas eliminar este anuncio`}
                                    onConfirm={confirmDelete}
                                    onCancel={cancelDelete}
                                    classConfirm={'bg-red-500'}
                                />
                            )}
                            {notice.estado === 'pendiente' && (
                                <button
                                    className="btn-account max-w-44 min-w-32 bg-green-700"
                                    onClick={handlePublish}
                                >
                                    Publicar
                                </button>
                            )}
                        </div>
                    )}
                </main>
                <Toastify />
            </>
        ) : (
            <p className="text-center my-12 font-semibold">
                El anuncio aún no está publicado
            </p>
        )
    ) : (
        <p className="text-center my-12 font-semibold">
            Tienes que ser un usuario registrado para ver los anuncios
        </p>
    );
};

export default NoticeDetails;
