import { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/auth/auth.context.jsx';
import grupoVotaSalaService from '../services/grupoVotaSalaService';

const GrupoVotaSala = ({ idReserva, idSala, idGrupo }) => {
    const { token, userLogged } = useContext(AuthContext);
    const { VITE_API_URL_BASE } = import.meta.env;

    const [voto, setVoto] = useState(0);
    const [comment, setComment] = useState('');
    const [votosGrupo, setVotosGrupo] = useState([]);
    const [hasVoted, setHasVoted] = useState(false);

    useEffect(() => {
        // /grupos/votos/:idGrupo
        const fetchVotos = async () => {
            try {
                const url = `${VITE_API_URL_BASE}/grupos/votos/${idGrupo}`;

                const response = await fetch(url);
                const votosData = await response.json();

                if (votosData.status === 'error') {
                    setVotosGrupo([]);
                } else {
                    setVotosGrupo(votosData.data.grupoVotos);
                    // Verificar si ya ha votado para esta reserva y sala

                    const votoExistente = votosData.data.grupoVotos.find(
                        (voto) =>
                            voto.reservaId === idReserva ||
                            voto.salaVotada === idSala
                    );
                    if (votoExistente) {
                        setHasVoted(true);
                    }
                }
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchVotos();
    }, [VITE_API_URL_BASE, idGrupo, idReserva, idSala]);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const data = new FormData();
            data.append('voto', voto);
            data.append('comment', comment);

            await grupoVotaSalaService({ data, idReserva, token });

            toast.success('Tu voto a sido publicado');
        } catch (error) {
            toast.error(error.message);
        }
    };

    if (!userLogged || userLogged.roles !== 'grupo') {
        return null;
    }

    if (hasVoted) {
        return <p>Ya has votado a esta sala</p>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Comenta tu experiencia</h2>
            <div>
                <label>Puntuación:</label>
                <input
                    type="number"
                    name="voto"
                    placeholder="Puntuación del 1 al 5"
                    required
                    onChange={(e) => setVoto(e.target.value)}
                    className="form-input"
                />
            </div>
            <div>
                <label>Comentario:</label>
                <textarea
                    name="comment"
                    onChange={(e) => setComment(e.target.value)}
                    className="form-textarea"
                ></textarea>
            </div>
            <div className="my-12 max-w-80">
                <input
                    type="submit"
                    value="Votar"
                    className="btn-account p-3 w-full"
                />
            </div>
        </form>
    );
};
export default GrupoVotaSala;
