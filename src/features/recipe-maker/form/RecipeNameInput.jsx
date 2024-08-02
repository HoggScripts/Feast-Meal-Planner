import { Controller } from "react-hook-form";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

const RecipeNameInput = ({ control, setRecipeInfo, recipe }) => (
  <Controller
    name="recipeName"
    control={control}
    render={({ field, fieldState: { error } }) => (
      <div className="relative flex items-center space-x-2">
        <div className="flex-1">
          <label className="block mb-1">Recipe Name</label>
          <div className="relative">
            <MdOutlineDriveFileRenameOutline className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
            <input
              placeholder="Enter recipe name here..."
              {...field}
              onChange={(e) => {
                field.onChange(e);
                setRecipeInfo({ ...recipe, recipeName: e.target.value });
              }}
              className="w-full p-2 border rounded pl-10"
            />
            {error && <span className="text-red-500">{error.message}</span>}
          </div>
        </div>
      </div>
    )}
  />
);

export default RecipeNameInput;
