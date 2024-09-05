import React, { useEffect } from "react";
import { FaPepperHot } from "react-icons/fa";

const SpicinessRating = ({ initialRating = 0, onRatingChange }) => {
  const [rating, setRating] = React.useState(initialRating);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleMouseEnter = (index) => {
    setRating(index);
  };

  const handleMouseLeave = () => {
    setRating(initialRating);
  };

  const handleClick = (index) => {
    const newRating = index === initialRating ? 0 : index;
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <div>
      <h1 className="mb-1">Spiciness Level</h1>
      <div className="flex space-x-1">
        {[...Array(3)].map((_, index) => {
          const currentIndex = index + 1;
          return (
            <FaPepperHot
              key={currentIndex}
              size={32}
              color={currentIndex <= rating ? "red" : "gray"}
              onMouseEnter={() => handleMouseEnter(currentIndex)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(currentIndex)}
              className="cursor-pointer transition-colors duration-200"
            />
          );
        })}
      </div>
    </div>
  );
};

export default SpicinessRating;
