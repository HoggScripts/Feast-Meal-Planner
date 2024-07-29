import { Controller } from "react-hook-form";
import { FaRegImage } from "react-icons/fa";

const RecipeImageInput = ({ control, setRecipeInfo, recipe, fileInputRef }) => (
  <Controller
    name="image"
    control={control}
    render={({ field }) => (
      <div className="flex items-center space-x-2">
        <FaRegImage className="text-2xl" />
        <div className="flex-1">
          <label className="block mb-1">Recipe Image</label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              field.onChange(e.target.files[0]);
              setRecipeInfo({ ...recipe, image: e.target.files[0] });
            }}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
    )}
  />
);

export default RecipeImageInput;
