const StarRating = ({ rating }) => {
    return (
        <div className="flex justify-end items-center">
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                    <span
                        key={index}
                        className="text-3xl cursor-default"
                        style={{
                            color:
                                ratingValue <= rating ? '#ffc800' : 'lightgray',
                        }}
                    >
                        &#9733;
                    </span>
                );
            })}
        </div>
    );
};

export default StarRating;
