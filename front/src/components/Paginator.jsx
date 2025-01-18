import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';

const Paginator = ({ setPage, page, total, pageSize }) => {
    const handlePageChange = (newPage) => {
        setPage(newPage);
        window.scrollTo(0, 0);
    };

    const totalPages = total ? Math.ceil(total / pageSize) : 0;

    return (
        <>
            {totalPages > 1 && (
                <div className="flex items-center gap-2 justify-center my-8">
                    {/* Botón de Página Anterior */}
                    <button
                        disabled={page === 1}
                        onClick={() => handlePageChange(page - 1)}
                        className="p-2 rounded border border-purple-500 bg-white text-purple-500 hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400"
                    >
                        <MdKeyboardDoubleArrowLeft />
                    </button>

                    {/* Primera página */}
                    <button
                        onClick={() => handlePageChange(1)}
                        className={`w-10 h-10 flex items-center justify-center rounded text-sm font-medium ${
                            page === 1
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white'
                        }`}
                    >
                        1
                    </button>

                    {/* Puntos suspensivos antes de la sección de navegación */}
                    {page > 3 && (
                        <span className="px-2 text-gray-500">...</span>
                    )}

                    {/* Páginas cercanas al actual */}
                    {Array.from({ length: 3 }, (_, index) => page - 1 + index)
                        .filter(
                            (currentPage) =>
                                currentPage > 1 && currentPage < totalPages
                        )
                        .map((currentPage) => (
                            <button
                                key={currentPage}
                                onClick={() => handlePageChange(currentPage)}
                                className={`w-10 h-10 flex items-center justify-center rounded text-sm font-medium ${
                                    page === currentPage
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white'
                                }`}
                            >
                                {currentPage}
                            </button>
                        ))}

                    {/* Puntos suspensivos después de la sección de navegación */}
                    {page < totalPages - 2 && (
                        <span className="px-2 text-gray-500">...</span>
                    )}

                    {/* Última página */}
                    {totalPages > 1 && (
                        <button
                            onClick={() => handlePageChange(totalPages)}
                            className={`w-10 h-10 flex items-center justify-center rounded text-sm font-medium ${
                                page === totalPages
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white'
                            }`}
                        >
                            {totalPages}
                        </button>
                    )}

                    {/* Botón de Página Siguiente */}
                    <button
                        disabled={page >= totalPages}
                        onClick={() => handlePageChange(page + 1)}
                        className="p-2 rounded border border-purple-500 bg-white text-purple-500 hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400"
                    >
                        <MdKeyboardDoubleArrowRight />
                    </button>
                </div>
            )}
        </>
    );
};

export default Paginator;
