import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';

const Paginator = ({ setPage, page, total, pageSize }) => {
    const handlePageChange = (newPage) => {
        setPage(newPage); // Actualiza la página actual
    };
    const totalPages = total ? Math.ceil(total / pageSize) : 0; // Calcula el total de páginas

    return (
        <>
            {totalPages > 1 && (
                <div className="flex items-center gap-4 justify-center my-8">
                    {/* Botón de Página Anterior */}
                    <button
                        disabled={page === 1}
                        onClick={() => handlePageChange(page - 1)}
                        className="p-2 rounded-full text-moradoOiches hover:text-purpleOiches text-xl transition-all disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                        <MdKeyboardDoubleArrowLeft />
                    </button>

                    {/* Números de Paginación */}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`w-7 h-7 flex items-center justify-center rounded-full text-white font-semibold transition-all ${
                                page === index + 1
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500' // Degradado en la página actual
                                    : 'bg-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white'
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    {/* Botón de Página Siguiente */}
                    <button
                        disabled={page >= totalPages}
                        onClick={() => handlePageChange(page + 1)}
                        className="p-2 rounded-full text-moradoOiches hover:text-purpleOiches text-xl transition-all disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                        <MdKeyboardDoubleArrowRight />
                    </button>
                </div>
            )}
        </>
    );
};
export default Paginator;
