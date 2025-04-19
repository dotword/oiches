import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Toastify from '../../components/Toastify';
import Header from '../../components/Header';
import useGrupo from '../../hooks/useGrupo';
import useInscription from '../../hooks/useInscription';
import AuthContext from '../../context/auth/AuthContext';
import InscripcionConcursoForm from '../../components/Concurso/InscripcionConcursoForm';

const InscripcionConcurso = () => {
    const { userLogged, token } = useContext(AuthContext);
    const { idGrupo } = useParams();

    const { entry } = useGrupo(idGrupo);
    const { inscription: initialInscription } = useInscription({
        token,
        idGrupo,
    });
    const [inscription, setInscription] = useState(null);
    useEffect(() => {
        setInscription(initialInscription);
    }, [initialInscription]);

    const fotos = entry?.fotos || [];
    const firstImage =
        fotos.find((foto) => foto.main === 1)?.name || fotos[0]?.name;

    return userLogged && userLogged.roles === 'grupo' ? (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
        >
            <Header txt="Inscripción concurso de artistas Oiches 2025" />
            <main className="w-11/12 mx-auto py-8 md:max-w-7xl">
                {entry && (
                    <section className="mb-20">
                        <p className="font-semibold mb-4 text-lg">
                            Inscribir a {entry.nombre} en el concurso
                        </p>
                        <div className="flex flex-col gap-4 md:flex-row-reverse">
                            <img
                                className="w-52 h-52 rounded-full object-cover image-shadow mx-auto"
                                src={`${
                                    import.meta.env.VITE_API_URL_BASE
                                }/uploads/${firstImage}`}
                                alt={entry.nombre}
                            />
                            <ul className="list-disc list-inside my-3 pl-4">
                                <li className="font-semibold">
                                    Lee atentamente las{' '}
                                    <a
                                        href="#"
                                        target="_blank"
                                        className="underline"
                                    >
                                        {' '}
                                        bases del concurso
                                    </a>
                                </li>
                                <li className="font-semibold">
                                    Completa el perfil de tu proyecto musical
                                    <ol className="list-decimal list-inside my-3 pl-4 font-normal">
                                        <li>
                                            Incluye al menos una foto del
                                            artista/banda.
                                        </li>
                                        <li>
                                            Sube 2-4 videos de YouTube con temas
                                            de tu repertorio (preferiflemente
                                            algún directo).
                                        </li>
                                        <li>
                                            Incluye una breve biografía del
                                            artista/banda.
                                        </li>
                                        <li>Incluye rider y/o condiciones.</li>
                                    </ol>
                                </li>
                            </ul>
                        </div>

                        {!inscription && (
                            <InscripcionConcursoForm
                                idGrupo={idGrupo}
                                token={token}
                                setInscription={setInscription}
                            />
                        )}
                        {inscription && inscription.projectAcepted === 1 && (
                            <div className="my-4 shadow-xl px-4 py-8 rounded-lg flex flex-col">
                                <p className="font-semibold text-green-700 text-lg text-center mb-8">
                                    Ya estás inscrito en el concurso
                                </p>
                                <button className="btn-account w-80 self-end bg-red-600 margin-r-0">
                                    Eliminar tu proyecto musical del concurso
                                </button>
                            </div>
                        )}
                        {inscription && inscription.projectAcepted === 0 && (
                            <p className="shadow-xl px-4 py-8 rounded-lg text-red-700">
                                Tu inscripción ha sido rechazada. Si necesitas
                                más información, contacta con nosotros en{' '}
                                <a
                                    href="mailto:hola@oiches.com"
                                    className="underline"
                                >
                                    hola@oiches.com
                                </a>
                            </p>
                        )}

                        <Toastify />
                    </section>
                )}
            </main>
        </motion.div>
    ) : (
        <h1 className="text-center text-xl">No puedes acceder a esta página</h1>
    );
};

export default InscripcionConcurso;
