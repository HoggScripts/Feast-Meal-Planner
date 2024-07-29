import React from "react";
import { Controller } from "react-hook-form";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

const RecipeNameInput = ({ control, setRecipeInfo, recipe }) => (
  <Controller
    name="recipeName"
    control={control}
    render={({ field, fieldState: { error } }) => (
      <div className="flex items-center space-x-2">
        <MdOutlineDriveFileRenameOutline className="text-2xl" />
        <div className="flex-1">
          <label className="block mb-1">Recipe Name</label>
          <input
            placeholder="Enter recipe name here..."
            {...field}
            onChange={(e) => {
              field.onChange(e);
              setRecipeInfo({ ...recipe, recipeName: e.target.value });
            }}
            className="w-full p-2 border rounded"
          />
          {error && <span className="text-red-500">{error.message}</span>}
        </div>
      </div>
    )}
  />
);

export default RecipeNameInput;
