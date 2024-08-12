import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { MdCookie, MdDinnerDining, MdLunchDining } from "react-icons/md";
import { GiCupcake, GiRawEgg } from "react-icons/gi";

// Define the meal types with labels and icons
const mealTypes = [
  { label: "Breakfast", icon: <GiRawEgg size={32} color="black" /> },
  { label: "Lunch", icon: <MdLunchDining size={32} color="black" /> },
  { label: "Dinner", icon: <MdDinnerDining size={32} color="black" /> },
  { label: "Snack", icon: <MdCookie size={32} color="black" /> },
  { label: "Dessert", icon: <GiCupcake size={32} color="black" /> },
];

export function TypeSelect({ selectedMealType, onChange }) {
  return (
    <div>
      <h1 className="mb-1">Meal Type</h1>
      <ToggleGroup
        type="single"
        value={selectedMealType}
        onValueChange={onChange}
        className="flex justify-around pb-4"
      >
        {mealTypes.map((meal) => (
          <ToggleGroupItem
            key={meal.label}
            value={meal.label}
            aria-label={`Select ${meal.label}`}
            className="p-6 border rounded-lg transition-all 
                     hover:bg-gray-100 hover:shadow-md 
                     data-[state=on]:bg-gray-200 data-[state=on]:shadow-lg
                     flex flex-col items-center justify-center overflow-hidden
                     min-w-[80px] min-h-[80px]"
          >
            <div className="flex flex-col items-center text-black">
              {meal.icon}
              <span className="text-sm mt-2">{meal.label}</span>
            </div>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
