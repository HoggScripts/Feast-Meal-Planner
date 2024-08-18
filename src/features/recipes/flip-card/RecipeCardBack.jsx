import { Button } from "@nextui-org/react";
import NutritionTable from "./NutritionTable";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"; // Import these from your UI library
import { useDeleteRecipe } from "@/hooks/useRecipeActions";

function RecipeCardBack({ recipe, isPropRecipe }) {
  const getImageSrc = () => {
    return "/stockNutritionImage.jpeg"; // Always use the default image
  };

  const deleteMutation = useDeleteRecipe();

  const handleDeleteConfirm = () => {
    deleteMutation.mutate(recipe.id);
  };

  return (
    <div className="flex justify-center items-start h-full text-greyish-black">
      <div className="relative w-full max-w-2xl bg-white border border-gray-300 rounded-lg shadow-lg">
        <div className="relative w-full h-64">
          <img
            src={getImageSrc()}
            alt="Nutrition Information"
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>
        <div className="m-2">
          <NutritionTable recipe={recipe} />
        </div>
        {isPropRecipe && (
          <div className="m-4 flex justify-center">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-red-500 text-white">Delete Recipe</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your recipe.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteConfirm}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeCardBack;
