import { useState } from 'react';
import { toast } from 'react-toastify';
import DefaultProfile from '/Horizontal_blanco.webp';

const GrupoConcursoCard = ({ grupo }) => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [votes, setVotes] = useState(grupo.number_votes);

    const imageUrl =
        grupo.fotos && grupo.fotos.length > 0
            ? `${VITE_API_URL_BASE}/uploads/${
                  grupo.fotos.find((foto) => foto.main === 1)?.name ||
                  grupo.fotos[0].name
              }`
            : grupo.avatar
            ? `${VITE_API_URL_BASE}/uploads/${grupo.avatar}`
            : DefaultProfile;

    // Límite de géneros a 3 y agregar "..." si hay más
    const maxGeneros = 3;
    const generosArray = grupo.generos
        ? grupo.generos.split(',').map((g) => g.trim()) // Limpiar espacios
        : [];

    const mostrarGeneros =
        generosArray.length > maxGeneros
            ? `${generosArray.slice(0, maxGeneros).join(', ')}...`
            : generosArray.join(', ');

    const handleVote = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch(
                `${VITE_API_URL_BASE}/concurso/vote/${grupo.id}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                }
            );

            const result = await res.json();

            if (!res.ok) throw new Error(result.message);

            setVotes((v) => v + 1);

            toast.success(
                `¡Gracias por votar a '${grupo.grupo_nombre}'! Te quedan ${result.result.votosRestantes} voto/s.`
            );
            setEmail('');
        } catch (err) {
            toast.error(err.message || 'Error al votar');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="card-generica justify-between cursor-auto">
            <div className="text-white flex justify-end pb-3 font-semibold">
                <span>
                    {votes} voto{votes !== 1 && 's'}
                </span>
            </div>
            <div>
                <img
                    src={imageUrl}
                    alt={grupo.grupo_nombre}
                    className={`grupo-card-image w-full h-48 sm:h-48 rounded-lg mb-4 ${
                        imageUrl === DefaultProfile
                            ? 'object-contain'
                            : 'object-cover'
                    }`}
                />
                <h2 className="card-title text-lg font-bold mt-2">
                    {grupo.grupo_nombre}
                </h2>
                <p className="card-genre text-gray-400">{mostrarGeneros}</p>
                <p className="card-province text-gray-400">
                    <span className="sub_title_ficha">Provincia:</span>{' '}
                    {grupo.provincia_nombre}
                </p>
            </div>
            <div>
                <a
                    href={`/grupo/${grupo.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold flex justify-end text-xl hover:text-yellowOiches transition duration-200 ease-in-out"
                >
                    + info
                </a>
            </div>

            <form onSubmit={handleVote} className="mt-4">
                <input
                    type="email"
                    name="email"
                    placeholder="Introduce tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-input w-full mb-2 text-black"
                />
                <button
                    type="submit"
                    className="button w-full py-2 font-semibold"
                    disabled={isLoading}
                >
                    {isLoading ? 'Enviando voto...' : 'Votar'}
                </button>
            </form>
        </div>
    );
};

export default GrupoConcursoCard;
