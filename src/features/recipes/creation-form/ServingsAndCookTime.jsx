import { Controller } from "react-hook-form";
import { PiBowlFood, PiClock, PiCookingPot } from "react-icons/pi";

const ServingsAndCookTime = ({ control, setRecipeInfo, recipe }) => (
  <div className="flex gap-2">
    <Controller
      name="servings"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex-1">
          <label className="block mb-1">Servings</label>
          <div className="relative">
            <PiBowlFood className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
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
              className="w-full p-2 border rounded pl-10"
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
        <div className="flex-1">
          <label className="block mb-1">Cook Time (minutes)</label>
          <div className="relative">
            <PiClock className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
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
              className="w-full p-2 border rounded pl-10"
            />
            {error && <span className="text-red-500">{error.message}</span>}
          </div>
        </div>
      )}
    />
  </div>
);

export default ServingsAndCookTime;
