import React, { useState } from "react";
import RecipeCardFront from "./RecipeCardFront";
import RecipeCardBack from "./RecipeCardBack";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

function RecipeCard({ recipe }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full max-w-2xl relative perspective">
      <div className={`flip-container ${isFlipped ? "flipped" : ""}`}>
        <div className="absolute inset-0 backface-hidden">
          <RecipeCardFront recipe={recipe} />
        </div>
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <RecipeCardBack recipe={recipe} />
        </div>
      </div>
      <button
        onClick={handleFlip}
        className="absolute top-4 right-4 bg-gray-300 p-2 rounded-full"
      >
        {isFlipped ? <FaArrowLeft /> : <FaArrowRight />}
      </button>
    </div>
  );
}

export default RecipeCard;
