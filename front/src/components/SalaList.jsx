import SalaCard from './SalaCard';

const SalaList = ({ salas }) => {
    return (
        <div className="sala-list">
            {salas.map((sala) => (
                <SalaCard key={sala.id} sala={sala} />
            ))}
        </div>
    );
};

export default SalaList;
