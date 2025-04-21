import GrupoConcursoCard from './GrupoConcursoCard';

const InscriptionGrupoCard = ({ grupos }) => {
    return (
        <div className="grupo-list">
            {grupos.map((grupo) => (
                <GrupoConcursoCard key={grupo.id} grupo={grupo} />
            ))}
        </div>
    );
};

export default InscriptionGrupoCard;
