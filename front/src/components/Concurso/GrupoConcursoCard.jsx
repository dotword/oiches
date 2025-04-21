import DefaultProfile from '/Horizontal_blanco.webp';

const GrupoConcursoCard = ({ grupo }) => {
    const { VITE_API_URL_BASE } = import.meta.env;

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

    return (
        <div className="card-generica justify-between cursor-auto">
            <div className="text-white flex justify-between pb-3 font-semibold">
                <span>#1</span>
                <span>20 votos</span>
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
            <button className="button py-3 font-semibold mt-3">Votar</button>
        </div>
    );
};

export default GrupoConcursoCard;
