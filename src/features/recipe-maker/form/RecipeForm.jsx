import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useRecipeStore from "@/hooks/useRecipeStore";
import RecipeImageInput from "./RecipeImageInput";
import RecipeNameInput from "./RecipeNameInput";
import ServingsAndCookTime from "./ServingsAndCookTime";
import RecipeSteps from "./RecipeSteps";
import IngredientSearch from "./IngredientSearch";
import { Button } from "@nextui-org/react";
import { IoIosNuclear } from "react-icons/io";
import { useCreateRecipe } from "@/hooks/useRecipeActions";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications
import useTokenActions from "@/hooks/useTokenActions";
import useTokenStore from "@/hooks/useTokenStore";

// Define your form schema using Zod
const formSchema = z.object({
  recipeName: z.string().min(2, {
    message: "Recipe name must be at least 2 characters.",
  }),
  image: z.any(),
  servings: z.preprocess(
    (val) => Number(val),
    z.number().min(1, {
      message: "Servings must be at least 1.",
    })
  ),
  cookTime: z.preprocess(
    (val) => Number(val),
    z.number().min(1, {
      message: "Cook time must be at least 1 minute.",
    })
  ),
  instructions: z.array(z.string()),
  ingredients: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      image: z.string().optional(),
      amount: z.number().min(1),
      unit: z.string(),
      calories: z.number().optional(),
      fat: z.number().optional(),
      protein: z.number().optional(),
      carbohydrates: z.number().optional(),
      estimatedCost: z.number().optional(),
    })
  ),
});

export function RecipeForm() {
  const { recipe, setRecipeInfo, clearRecipe } = useRecipeStore((state) => ({
    recipe: state.recipe,
    setRecipeInfo: state.setRecipeInfo,
    clearRecipe: state.clearRecipe,
  }));

  const { control, handleSubmit, reset, setValue } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { ...recipe, ingredients: recipe.ingredients || [] },
  });

  const fileInputRef = useRef(null);
  const [steps, setSteps] = useState(
    recipe.instructions.length ? recipe.instructions : [""]
  );
  const [ingredients, setIngredients] = useState(recipe.ingredients || []);

  useEffect(() => {
    setValue("instructions", steps);
    setValue("ingredients", ingredients);
  }, [steps, ingredients, setValue]);

  // Cleanup object URL if necessary
  useEffect(() => {
    return () => {
      if (recipe.image instanceof File) {
        URL.revokeObjectURL(recipe.image);
      }
    };
  }, [recipe.image]);

  // Use the mutation hook from useCreateRecipe
  const createRecipeMutation = useCreateRecipe();

  const onSubmit = async (values) => {
    try {
      setRecipeInfo(values);
      let imageBase64 = null;

      // Check if the image is a File object and convert it to a Base64 string
      if (values.image instanceof File) {
        imageBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(values.image);
        });
      }

      // Set imageBase64 to null if it's an empty object or an empty string
      if (!imageBase64 || imageBase64 === "{}") {
        imageBase64 = null;
      }

      // Map frontend values to backend DTO structure
      const mappedValues = {
        recipeName: values.recipeName,
        image: imageBase64, // Ensure Image is either a Base64 string or null
        ingredients: recipe.ingredients.map((ingredient) => ({
          id: ingredient.id,
          name: ingredient.name,
          amount: ingredient.amount,
          unit: ingredient.unit,
          calories: ingredient.calories || null,
          fat: ingredient.fat || null,
          protein: ingredient.protein || null,
          carbohydrates: ingredient.carbohydrates || null,
          estimatedCost: ingredient.estimatedCost || null,
        })),
        steps: values.instructions,
        servings: values.servings,
        cookTime: values.cookTime,
      };

      console.log("Mapped Values:", mappedValues); // Log the outgoing object

      // Call the mutation function to create the recipe
      createRecipeMutation.mutate(mappedValues);
      handleClear();
    } catch (error) {
      toast.error("Failed to save recipe. Please try again.");
      console.error("Failed to save recipe", error);
    }
  };

  const handleClear = () => {
    if (recipe.image instanceof File) {
      URL.revokeObjectURL(recipe.image);
    }
    reset({
      recipeName: "",
      image: null,
      servings: 1,
      cookTime: 1,
      instructions: [""],
      ingredients: [],
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    clearRecipe();
    setSteps([""]);
    setIngredients([]);
  };

  const handleStepChange = (index, event) => {
    {
      steps[index - 1] === "";
    }
    const newSteps = [...steps];
    newSteps[index] = event.target.value;
    setSteps(newSteps);
    setRecipeInfo({ ...recipe, instructions: newSteps });
  };

  const handleAddStep = () => {
    const newSteps = [...steps, ""];
    setSteps(newSteps);
    setRecipeInfo({ ...recipe, instructions: newSteps });
  };

  const handleRemoveStep = (index) => {
    const newSteps = steps.filter((_, stepIndex) => stepIndex !== index);
    setSteps(newSteps);
    setRecipeInfo({ ...recipe, instructions: newSteps });
  };

  return (
    <div className="w-full p-4">
      <div className="border-b border-gray-300 p-4 flex items-center justify-between">
        <h1 className="font-bold text-xl flex-grow">Recipe Builder</h1>
        <Button
          type="button"
          onClick={handleClear}
          className="text-white flex items-center bg-destructive-red"
        >
          <IoIosNuclear className="mr-2 text-white" /> Clear
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
        <RecipeImageInput
          control={control}
          setRecipeInfo={setRecipeInfo}
          recipe={recipe}
          fileInputRef={fileInputRef}
        />
        <RecipeNameInput
          control={control}
          setRecipeInfo={setRecipeInfo}
          recipe={recipe}
        />
        <ServingsAndCookTime
          control={control}
          setRecipeInfo={setRecipeInfo}
          recipe={recipe}
        />
        <RecipeSteps
          steps={steps}
          handleStepChange={handleStepChange}
          handleRemoveStep={handleRemoveStep}
          handleAddStep={handleAddStep}
        />

        <IngredientSearch />
        <div className="flex space-x-2">
          <Button
            type="submit"
            className="w-full bg-submission-blue text-white p-2 rounded"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default RecipeForm;
