import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useRecipeStore from "@/stores/useRecipeStore";
import RecipeImageInput from "./RecipeImageInput";
import RecipeNameInput from "./RecipeNameInput";
import ServingsAndCookTime from "./ServingsAndCookTime";
import RecipeSteps from "./RecipeSteps";
import IngredientSearch from "./IngredientSearch";
import { Button } from "@nextui-org/react";
import { IoIosNuclear } from "react-icons/io";
import { toast } from "react-toastify";
import { TypeSelect } from "./TypeSelect";
import SpicinessRating from "./SpicinessRating";
import { useCreateRecipe } from "@/hooks/useRecipeActions";

// Define the validation schema with Zod
const formSchema = z.object({
  recipeName: z
    .string()
    .min(2, { message: "Recipe name must be at least 2 characters." })
    .max(30, {
      message: "Recipe name exceeds maximum length of 30 characters.",
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
  mealType: z.string().min(1, { message: "Please select a meal type." }), // Ensure mealType is required
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
  spicinessLevel: z.number().min(0).max(3).optional(),
});

export function RecipeForm() {
  const { recipe, setRecipeInfo, clearRecipe, setSpicinessLevel } =
    useRecipeStore((state) => ({
      recipe: state.recipe,
      setRecipeInfo: state.setRecipeInfo,
      clearRecipe: state.clearRecipe,
      setSpicinessLevel: state.setSpicinessLevel,
    }));

  const createRecipeMutation = useCreateRecipe();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...recipe,
      ingredients: recipe.ingredients || [],
      mealType: "", // Default to an empty string to enforce selection
      spicinessLevel: recipe.spicinessLevel || 0,
    },
  });

  const [selectedMealType, setSelectedMealType] = useState(
    recipe.mealType || ""
  );
  const [spicinessLevel, setLocalSpicinessLevel] = useState(
    recipe.spicinessLevel || 0
  );

  const fileInputRef = useRef(null);

  const [steps, setSteps] = useState(
    recipe.instructions.length ? recipe.instructions : [""]
  );
  const [ingredients, setIngredients] = useState(recipe.ingredients || []);

  useEffect(() => {
    setValue("instructions", steps);
    setValue("ingredients", ingredients);
    setValue("spicinessLevel", spicinessLevel);
    setValue("mealType", selectedMealType); // Ensure mealType is updated in form state
  }, [steps, ingredients, spicinessLevel, selectedMealType, setValue]);

  useEffect(() => {
    setSelectedMealType(recipe.mealType || "");
  }, [recipe.mealType]);

  const onSubmit = async (values) => {
    try {
      console.log("Form Values:", values);

      if (!values.mealType) {
        toast.error("Please select a meal type.");
        return;
      }

      setRecipeInfo({ ...values, spicinessLevel });
      setSpicinessLevel(spicinessLevel);

      let imageBase64 = null;
      if (values.image instanceof File) {
        imageBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(values.image);
        });
      }
      if (!imageBase64 || imageBase64 === "{}") {
        imageBase64 = null;
      }

      const mappedValues = {
        ...values,
        mealType: selectedMealType,
        spicinessLevel,
        image: imageBase64,
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
      };

      console.log("Mapped Values:", mappedValues);

      await createRecipeMutation.mutateAsync(mappedValues);
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
      mealType: "",
      spicinessLevel: 0,
      image: null,
      servings: 1,
      cookTime: 1,
      instructions: [""],
      ingredients: [],
    });
    setSelectedMealType("");
    setLocalSpicinessLevel(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    clearRecipe();
    setSteps([""]);
    setIngredients([]);
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
    <div className="w-full p-10">
      <div className="p-4 flex items-center justify-between border-b border-slate-300 mb-4">
        <h1 className="font-extrabold text-2xl flex-grow">Recipe Builder</h1>
        <Button
          type="button"
          onClick={handleClear}
          className="text-black bg-white flex items-center border-1 border-slate-300 text-lg shadow-md hover:bg-slate-200"
        >
          <IoIosNuclear className="mr-2 text-black" /> Clear
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <TypeSelect
          selectedMealType={selectedMealType}
          onChange={(value) => {
            setSelectedMealType(value);
            setValue("mealType", value); // Ensure this updates the form state
            setRecipeInfo({ mealType: value });
          }}
        />
        {errors.mealType && (
          <p className="text-red-600">{errors.mealType.message}</p>
        )}
        <SpicinessRating
          initialRating={spicinessLevel}
          onRatingChange={(rating) => {
            setLocalSpicinessLevel(rating);
            setSpicinessLevel(rating);
          }}
        />
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
        <div className="flex justify-end">
          <Button
            type="submit"
            className="w-full bg-blueprimary text-white shadow-md p-4 rounded border-1 border-blueprimary text-lg hover:bg-bluesecondary"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default RecipeForm;
