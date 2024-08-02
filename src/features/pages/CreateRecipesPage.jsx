import React, { useState } from "react";
import { RecipeForm } from "../recipe-maker/form/RecipeForm";
import RecipeCardFront from "../recipe-maker/card/RecipeCardFront";
import RecipeCardBack from "../recipe-maker/card/RecipeCardBack";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

function CreateRecipesPage() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="grid grid-cols-12 min-h-screen bg-closewhite p-4">
      <div className="col-span-5 p-4 bg-ecruWhite h-screen overflow-y-auto">
        <RecipeForm />
      </div>
      <div className="col-span-7 flex justify-center items-start m-10 bg-closewhite h-screen">
        <div className="w-full max-w-2xl relative perspective">
          <div className={`flip-container ${isFlipped ? "flipped" : ""}`}>
            <div className="absolute inset-0 backface-hidden">
              <RecipeCardFront />
            </div>
            <div className="absolute inset-0 backface-hidden rotate-y-180">
              <RecipeCardBack />
            </div>
          </div>
          <button
            onClick={handleFlip}
            className="absolute top-4 right-4 bg-gray-300 p-2 rounded-full"
          >
            {isFlipped ? <FaArrowLeft /> : <FaArrowRight />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateRecipesPage;
