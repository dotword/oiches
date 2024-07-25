const StarRating = ({ rating }) => {
    return (
        <>
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                    <span
                        key={index}
                        className="text-2xl cursor-default"
                        style={{
                            color:
                                ratingValue <= rating ? '#ffc800' : 'lightgray',
                        }}
                    >
                        &#9733;
                    </span>
                );
            })}
        </>
    );
};

export default StarRating;