const StarRating = ({ rating }) => {
    return (
        <>
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                    <span
                        key={index}
                        className="text-2xl mr-1 cursor-default"
                        style={{
                            color:
                                ratingValue <= rating ? '#ffb500' : 'lightgray',
                        }}
                    >
                        &#9834;
                    </span>
                );
            })}
        </>
    );
};

export default StarRating;
