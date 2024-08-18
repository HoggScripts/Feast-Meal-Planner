import { Controller } from "react-hook-form";
import { FaRegImage } from "react-icons/fa";

const RecipeImageInput = ({ control, setRecipeInfo, recipe, fileInputRef }) => (
  <Controller
    name="image"
    control={control}
    render={({ field }) => (
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <label className="block mb-1">Recipe Image</label>
          <div className="relative">
            <FaRegImage className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                field.onChange(e.target.files[0]);
                setRecipeInfo({ ...recipe, image: e.target.files[0] });
              }}
              className="w-full p-2 border rounded pl-10"
            />
          </div>
        </div>
      </div>
    )}
  />
);

export default RecipeImageInput;
