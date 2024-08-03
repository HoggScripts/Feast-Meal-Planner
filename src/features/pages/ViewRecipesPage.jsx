import { useFetchRecipes } from "@/hooks/useRecipeActions";

function ViewRecipesPage() {
  const { data: recipes, error, isLoading } = useFetchRecipes();

  console.log(recipes);

  if (isLoading) {
    return <div>Loading recipes...</div>;
  }

  if (error) {
    return <div>Error fetching recipes: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-12 min-h-screen">
      <ul className="col-span-12">
        {recipes.map((recipe) => (
          <li key={recipe.id}>{recipe.recipeName}</li>
        ))}
      </ul>
    </div>
  );
}

export default ViewRecipesPage;
