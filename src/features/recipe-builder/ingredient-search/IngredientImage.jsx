import React from "react";

function IngredientImage({ src, alt }) {
  if (src === "https://spoonacular.com/cdn/ingredients_100x100/no.jpg") {
    return (
      <img
        src="http://localhost:5173/NoPicture.webp"
        alt={alt}
        className="w-16 h-16 mt-2 border border-gray-200 rounded-md p-1"
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-16 h-16 mt-2 border border-gray-200 rounded-md p-1"
    />
  );
}

export default IngredientImage;
