import { toast } from 'react-toastify';

const InscripcionConcursoForm = ({ idGrupo, token, setInscription }) => {
    const url = import.meta.env.VITE_API_URL_BASE;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                basesConfirmed: true,
            };

            const response = await fetch(
                `${url}/concurso/inscripcion/${idGrupo}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${token}`,
                    },
                    method: 'POST',
                    body: JSON.stringify(data),
                }
            );

            const result = await response.json();
            if (!response.ok) {
                throw new Error(
                    result.message || 'Error al crear la inscripción.'
                );
            }

            setInscription({
                projectAcepted: 1,
            });
            setTimeout(
                () =>
                    toast.success('Te has inscrito con éxito en el concurso.'),
                100
            );
        } catch (error) {
            toast.error(error.message || 'Error al conectar con el servidor.');
        }
    };

    return (
        <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col shadow-xl px-4 py-8 rounded-lg items-center"
        >
            <div className="text-lg">
                <input type="checkbox" name="basesConfirmed" required /> Acepto
                las{' '}
                <a
                    href="/bases-concurso"
                    target="_blank"
                    className="text-yellowOiches font-semibold"
                >
                    bases del concurso
                </a>
            </div>
            <button
                type="submit"
                className="my-8 bg-gradient-to-r from-purpleOiches to-moradoOiches text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform hover:scale-105"
            >
                Inscribirme al concurso
            </button>
        </form>
    );
};

export default InscripcionConcursoForm;
