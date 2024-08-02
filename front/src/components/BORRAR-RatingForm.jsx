import { useState } from 'react';

const RatingForm = ({ reservaId, token, endpoint }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${endpoint}/${reservaId}/votes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    rating,
                    comment,
                }),
            });

            if (!response.ok) {
                throw new Error('Error al enviar la votación');
            }

            const data = await response.json();
            console.log('Votación enviada:', data);
        } catch (error) {
            console.error('Error al enviar la votación:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Voto:
                <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    min="1"
                    max="5"
                    required
                />
            </label>
            <label>
                Comentario (opcional):
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </label>
            <button type="submit">Enviar Votación</button>
        </form>
    );
};

export default RatingForm;
