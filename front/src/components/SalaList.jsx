import React from 'react';
import SalaCard from './SalaCard';

const SalaList = ({ salas }) => {
    return (
        <div className="sala-list grid gap-8 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {salas.map((sala) => (
                <SalaCard key={sala.id} sala={sala} />
            ))}
        </div>
    );
};

export default SalaList;
