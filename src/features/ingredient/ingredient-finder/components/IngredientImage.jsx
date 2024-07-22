function IngredientImage({ src, alt }) {
  if (src === "https://spoonacular.com/cdn/ingredients_100x100/no.jpg") {
    return (
      <img
        src="http://localhost:5173/NoPicture.webp"
        alt={alt}
        className="w-16 h-16 mt-2"
      />
    );
  }

  return <img src={src} alt={alt} className="w-16 h-16 mt-2" />;
}

export default IngredientImage;
