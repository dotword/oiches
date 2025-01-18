import { useState, useEffect } from 'react';
import ConciertosList from './ConciertosList.jsx';
import FetchOldConciertosService from '../../services/conciertos/FetchOldConciertosService.js';
import { toast } from 'react-toastify';

const OldConciertosList = ({ Paginator }) => {
    const [page, setPage] = useState(1);
    const pageSize = 12;
    const [total, setTotal] = useState(null);
    const [conciertos, setConciertos] = useState(null);

    useEffect(() => {
        const getEntry = async () => {
            try {
                const oldConciertos = await FetchOldConciertosService(
                    page,
                    pageSize
                );
                setTotal(oldConciertos.total);
                setConciertos(oldConciertos.rows);
            } catch (error) {
                toast.error('Error al cargar los conciertos');
            }
        };

        getEntry();
    }, [page]);

    return (
        <section className="grupo-list-container">
            {conciertos && conciertos.length > 0 ? (
                <ConciertosList conciertos={conciertos} />
            ) : (
                <p className="text-center">No se encontraron conciertos</p>
            )}

            <Paginator
                setPage={setPage}
                page={page}
                total={total}
                pageSize={pageSize}
            />
        </section>
    );
};

export default OldConciertosList;
