import React, { useState, useEffect } from "react";
import { useFetchRecipes } from "@/hooks/useRecipeActions";
import { Slider, Checkbox, CheckboxGroup } from "@nextui-org/react";
import DragDropCard from "./DragDropCard";
import { MdAttachMoney } from "react-icons/md";
import { SlEnergy } from "react-icons/sl";
import { GiChickenLeg } from "react-icons/gi";
import { FaPepperHot } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { FaSliders } from "react-icons/fa6";

function RecipeSearch() {
  const { data: recipes, isLoading, error } = useFetchRecipes();
  const [userRecipes, setUserRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [costRange, setCostRange] = useState([0, 1000]);
  const [calorieRange, setCalorieRange] = useState([0, 3000]);
  const [proteinRange, setProteinRange] = useState([0, 300]);
  const [selectedSpiceLevels, setSelectedSpiceLevels] = useState(["all"]);
  const [selectedCookTimes, setSelectedCookTimes] = useState(["all"]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  useEffect(() => {
    if (recipes) {
      setUserRecipes(recipes);
    }
  }, [recipes]);

  console.log(recipes);

  const filterRecipes = () => {
    return userRecipes
      .filter((recipe) =>
        recipe.recipeName.toLowerCase().includes(searchInput.toLowerCase())
      )
      .filter((recipe) => {
        if (typeof recipe.estimatedCost !== "number") {
          return false;
        }
        const costInDollars = recipe.estimatedCost / 100;
        return costInDollars >= costRange[0] && costInDollars <= costRange[1];
      })
      .filter(
        (recipe) =>
          recipe.calories >= calorieRange[0] &&
          recipe.calories <= calorieRange[1]
      )
      .filter(
        (recipe) =>
          recipe.protein >= proteinRange[0] && recipe.protein <= proteinRange[1]
      )
      .filter((recipe) => {
        if (selectedSpiceLevels.includes("all")) return true;
        return selectedSpiceLevels.includes(recipe.spicinessLevel.toString());
      })
      .filter((recipe) => {
        if (selectedCookTimes.includes("all")) return true;
        if (selectedCookTimes.includes("short") && recipe.cookTime < 20)
          return true;
        if (
          selectedCookTimes.includes("medium") &&
          recipe.cookTime >= 20 &&
          recipe.cookTime <= 40
        )
          return true;
        if (selectedCookTimes.includes("long") && recipe.cookTime > 40)
          return true;
        return false;
      });
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleCostRangeChange = (value) => {
    setCostRange(value);
  };

  const handleCalorieRangeChange = (value) => {
    setCalorieRange(value);
  };

  const handleProteinRangeChange = (value) => {
    setProteinRange(value);
  };

  const handleSpiceLevelChange = (selectedValues) => {
    if (selectedValues.includes("all")) {
      setSelectedSpiceLevels(["all"]);
    } else {
      setSelectedSpiceLevels(selectedValues.filter((value) => value !== "all"));
    }
  };

  const handleCookTimeChange = (selectedValues) => {
    if (selectedValues.includes("all")) {
      setSelectedCookTimes(["all"]);
    } else {
      setSelectedCookTimes(selectedValues.filter((value) => value !== "all"));
    }
  };

  if (isLoading) {
    return <div className="text-slate-800">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-slate-800">
        Error loading recipes: {error.message}
      </div>
    );
  }

  const filteredRecipes = filterRecipes();

  return (
    <div
      className="p-4 bg-bluesecondary text-slate-800 rounded-lg mt-3"
      style={{ width: "350px", height: "920px" }}
    >
      <h2 className="text-lg font-bold mb-4 text-white">Recipe Search</h2>

      <div className="flex items-center justify-between mb-4 bg-white rounded-lg shadow-md overflow-hidden">
        <input
          type="text"
          placeholder="Search by recipe name"
          value={searchInput}
          onChange={handleInputChange}
          className="w-full px-4 py-2 text-lg focus:ring-slate-300"
          aria-label="Search by recipe name"
        />
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="px-4 py-2 text-lg text-slate-800 focus:outline-none"
          style={{
            borderTopRightRadius: "0.5rem",
            borderBottomRightRadius: "0.5rem",
            boxShadow: "none",
          }}
          aria-label="Toggle Advanced Filters"
        >
          <FaSliders />
        </button>
      </div>

      {showAdvancedFilters && (
        <div className="mb-8 flex flex-col gap-6 text-slate-800">
          <div className="flex items-start">
            <MdAttachMoney size={24} className="inline-block mr-2" />
            <div className="flex-1 text-sm">
              <Slider
                step={2}
                size="sm"
                minValue={0}
                maxValue={100}
                value={costRange}
                onChange={handleCostRangeChange}
                formatOptions={{ style: "currency", currency: "USD" }}
                className="mb-2"
                aria-label="Cost Range"
              />
              <div>
                Cost Range: ${costRange[0]} - ${costRange[1]}
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <SlEnergy size={24} className="inline-block mr-2" />
            <div className="flex-1 text-sm">
              <Slider
                step={20}
                size="sm"
                minValue={0}
                maxValue={3000}
                value={calorieRange}
                onChange={handleCalorieRangeChange}
                className="mb-2"
                aria-label="Calorie Range"
              />
              <div>
                Calorie Range: {calorieRange[0]} - {calorieRange[1]} kcal
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <GiChickenLeg size={24} className="inline-block mr-2" />
            <div className="flex-1 text-sm">
              <Slider
                step={5}
                size="sm"
                minValue={0}
                maxValue={100}
                value={proteinRange}
                onChange={handleProteinRangeChange}
                className="mb-2"
                aria-label="Protein Range"
              />
              <div>
                Protein Range: {proteinRange[0]} - {proteinRange[1]}g
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <FaPepperHot size={24} className="inline-block mr-2" />
            <div className="flex-1">
              <CheckboxGroup
                orientation="horizontal"
                color="secondary"
                value={
                  selectedSpiceLevels.includes("all") &&
                  selectedSpiceLevels.length === 1
                    ? ["all"]
                    : selectedSpiceLevels
                }
                onChange={handleSpiceLevelChange}
                size="sm"
                aria-label="Spiciness Level"
              >
                <Checkbox value="all" className="text-slate-800">
                  Any
                </Checkbox>
                <Checkbox value="1" className="text-slate-800">
                  Mild
                </Checkbox>
                <Checkbox value="2" className="text-slate-800">
                  Medium
                </Checkbox>
                <Checkbox value="3" className="text-slate-800">
                  Hot
                </Checkbox>
              </CheckboxGroup>
            </div>
          </div>

          <div className="flex items-center">
            <IoMdTime size={24} className="inline-block mr-2" />
            <div className="flex-1">
              <CheckboxGroup
                orientation="horizontal"
                color="secondary"
                value={
                  selectedCookTimes.includes("all") &&
                  selectedCookTimes.length === 1
                    ? ["all"]
                    : selectedCookTimes
                }
                onChange={handleCookTimeChange}
                size="sm"
                aria-label="Cook Time"
              >
                <Checkbox value="all" className="text-slate-800">
                  All
                </Checkbox>
                <Checkbox value="short" className="text-slate-800">
                  Short
                </Checkbox>
                <Checkbox value="medium" className="text-slate-800">
                  Medium
                </Checkbox>
                <Checkbox value="long" className="text-slate-800">
                  Long
                </Checkbox>
              </CheckboxGroup>
            </div>
          </div>
        </div>
      )}

      {!showAdvancedFilters && (
        <div className="pr-2 h-5/6 overflow-auto">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <div key={recipe.id} className="mb-2">
                <DragDropCard recipe={recipe} className="text-slate-800" />
              </div>
            ))
          ) : (
            <div className="text-slate-800">No recipes found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default RecipeSearch;
