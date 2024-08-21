import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { MdFastfood, MdLunchDining } from "react-icons/md";
import { PiCoffeeFill } from "react-icons/pi";

// Define the meal types with labels and icons
const mealTypes = [
  { label: "Breakfast", icon: <PiCoffeeFill size={32} color="black" /> },
  { label: "Lunch", icon: <MdLunchDining size={32} color="black" /> },
  { label: "Dinner", icon: <MdFastfood size={32} color="black" /> },
];

export function TypeSelect({ selectedMealType, onChange }) {
  return (
    <div>
      <h1 className="mb-1">Meal Type</h1>
      <ToggleGroup
        type="single"
        value={selectedMealType}
        onValueChange={onChange}
        className="flex justify-start space-x-4"
      >
        {mealTypes.map((meal) => (
          <ToggleGroupItem
            key={meal.label}
            value={meal.label}
            aria-label={`Select ${meal.label}`}
            className="p-6 rounded-lg transition-all shadow-md
                     hover:bg-slate-200 hover:shadow-md 
                     data-[state=on]:border-blueprimary data-[state=on]:bg-white border-2
                     flex flex-col items-center justify-center overflow-hidden
                     min-w-[80px] min-h-[80px] bg-white"
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
