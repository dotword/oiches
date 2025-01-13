import ConciertoCard from './ConciertoCard';

const ConciertoList = ({ conciertos }) => {
    return (
        <div className="concert-list">
            {conciertos.map((concierto) => (
                <ConciertoCard key={concierto.id} concierto={concierto} />
            ))}
        </div>
    );
};

export default ConciertoList;
