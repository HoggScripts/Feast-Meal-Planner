import { useRef, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaTrash } from "react-icons/fa";
import useRecipeStore from "@/hooks/useRecipeStore";
import RecipeImageInput from "./RecipeImageInput";
import RecipeNameInput from "./RecipeNameInput";
import ServingsAndCookTime from "./ServingsAndCookTime";
import RecipeSteps from "./RecipeSteps";
import IngredientSearch from "./ingredient-search/IngredientSearch";
import { Button } from "@nextui-org/react";

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
  instructions: z.array(
    z.string().min(1, { message: "Step cannot be blank." })
  ),
});

export function RecipeForm() {
  const { recipe, setRecipeInfo } = useRecipeStore((state) => ({
    recipe: state.recipe,
    setRecipeInfo: state.setRecipeInfo,
  }));

  const { control, handleSubmit, reset, setValue } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: recipe,
  });

  const fileInputRef = useRef(null);
  const [steps, setSteps] = useState(
    recipe.instructions.length ? recipe.instructions : [""]
  );

  useEffect(() => {
    setValue("instructions", steps);
  }, [steps, setValue]);

  const onSubmit = (values) => {
    setRecipeInfo(values);
  };

  const handleClear = () => {
    reset({
      recipeName: "",
      image: null,
      servings: 1,
      cookTime: 1,
      instructions: [""],
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setRecipeInfo({
      recipeName: "",
      image: null,
      servings: 1,
      cookTime: 1,
      instructions: [""],
    });
    setSteps([""]);
  };

  const handleStepChange = (index, event) => {
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
          <FaTrash className="mr-2 text-white" /> Clear
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
        <IngredientSearch /> {/* Added the IngredientSearch component here */}
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
