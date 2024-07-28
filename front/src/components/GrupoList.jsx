import React from 'react';
import GrupoCard from './GrupoCard';

const GrupoList = ({ grupos }) => {
    return (
        <div className="grupo-list">
            {grupos.map((grupo) => (
                <GrupoCard key={grupo.id} grupo={grupo} />
            ))}
        </div>
    );
};

export default GrupoList;
