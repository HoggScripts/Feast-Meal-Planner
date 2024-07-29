import React from "react";
import { Controller } from "react-hook-form";
import { PiBowlFood, PiCookingPot } from "react-icons/pi";

const ServingsAndCookTime = ({ control, setRecipeInfo, recipe }) => (
  <div className="flex gap-2">
    <Controller
      name="servings"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex items-center space-x-2 flex-1">
          <PiBowlFood className="text-2xl" />
          <div className="flex-1">
            <label className="block mb-1">Servings</label>
            <input
              type="number"
              placeholder="Enter servings..."
              {...field}
              onChange={(e) => {
                field.onChange(e);
                setRecipeInfo({
                  ...recipe,
                  servings: Number(e.target.value),
                });
              }}
              className="w-full p-2 border rounded"
            />
            {error && <span className="text-red-500">{error.message}</span>}
          </div>
        </div>
      )}
    />
    <Controller
      name="cookTime"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex items-center space-x-2 flex-1">
          <PiCookingPot className="text-2xl" />
          <div className="flex-1">
            <label className="block mb-1">Cook Time (minutes)</label>
            <input
              type="number"
              placeholder="Enter cook time in minutes..."
              {...field}
              onChange={(e) => {
                field.onChange(e);
                setRecipeInfo({
                  ...recipe,
                  cookTime: Number(e.target.value),
                });
              }}
              className="w-full p-2 border rounded"
            />
            {error && <span className="text-red-500">{error.message}</span>}
          </div>
        </div>
      )}
    />
  </div>
);

export default ServingsAndCookTime;
