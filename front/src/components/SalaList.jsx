import SalaCard from './SalaCard';

const SalaList = ({ salas }) => {
    return (
        <div className="sala-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {salas.map((sala) => (
                <SalaCard key={sala.id} sala={sala} />
            ))}
        </div>
    );
};

export default SalaList;
