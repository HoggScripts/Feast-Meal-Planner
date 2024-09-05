import React, { useState, useEffect } from "react";
import MealPlanCalendar from "../recipes/planning/MealPlanCalendar";
import { useFetchRecipes } from "@/hooks/useRecipeActions";
import useMealPlanStore from "@/stores/useMealPlanStore";
import RecipeSearch from "../recipes/planning/RecipeSearch";
import { startOfWeek, addDays, format } from "date-fns";
import CostComparisonCard from "../recipes/planning/graphs/CostComparisonCard";
import ProteinChart from "../recipes/planning/graphs/ProteinChart";
import CalorieTrendChart from "../recipes/planning/graphs/CalorieTrendChart";
import CookingTimePieChart from "../recipes/planning/graphs/CookingTimePieChart";
import { HorizontalBarChart } from "../recipes/planning/graphs/HorizontalBarChart";
import MacronutrientsChart from "../recipes/planning/graphs/MacronutrientsChart";
import GraphLayout from "../recipes/planning/graphs/GraphLayout";
import FloatingActionButton from "../recipes/planning/FloatingActionButton";
import { SiGooglecalendar } from "react-icons/si";
import { MdOutlineEmail } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

import { toast, useToast } from "react-toastify";
import { useGoogleAuthStatus } from "@/hooks/useGoogleAuthStatus";
import useSendScheduledRecipes from "@/hooks/useSendScheduledRecipes";
import useSendShoppingList from "@/hooks/useSendShoppingList";

function PlanMealsPage() {
  const { data: recipes, isLoading, error } = useFetchRecipes();
  const { scheduledRecipes } = useMealPlanStore();
  const [isNextWeek, setIsNextWeek] = useState(false);

  const sendScheduledRecipes = useSendScheduledRecipes(); 
  const sendShoppingList = useSendShoppingList(); 

  const { data: isGoogleLinked, isLoading: isGoogleStatusLoading } =
    useGoogleAuthStatus();

  useEffect(() => {
    if (recipes) {

    }
  }, [recipes]);

  const currentWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const nextWeekStart = addDays(currentWeekStart, 7);

  const toggleWeek = () => setIsNextWeek((prev) => !prev);

  // IMPORTANT METHOD
  const handleConfirm = async () => {


    try {
      console.log("sendShoppingList:", sendShoppingList);
      console.log("sendScheduledRecipes:", sendScheduledRecipes);
      await sendShoppingList.mutateAsync(); 
      await sendScheduledRecipes.mutateAsync(); 

      toast.success("All actions completed successfully.");
    } catch (error) {
      console.error("Error during handleConfirm:", error);
      toast.error("An error occurred while processing your request.");
    }
  };
  // END OF IMPORTANT METHOD

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading recipes: {error.message}</div>;
  }

  
  const chartStyle = { height: "250px", width: "100%" };

  return (
    <div className="space-y-6">
      {scheduledRecipes.length > 0 && ( 
        <FloatingActionButton onConfirm={handleConfirm} label="Edit">
          <SiGooglecalendar size={20} className="text-white" />
          <FaPlus size={8} className="text-white" />
          <MdOutlineEmail size={20} className="text-white" />
        </FloatingActionButton>
      )}

      <div className="grid grid-cols-12 gap-4 bg-lightgray rounded-lg  h-full">
        <div className="col-span-9">
          <MealPlanCalendar isNextWeek={isNextWeek} toggleWeek={toggleWeek} />
        </div>
        <div className="col-span-3">
          <RecipeSearch className="rounded-lg" />
        </div>
      </div>

    
      <GraphLayout
        blurbHeader="Why Protein is Important"
        blurb="Protein is essential for muscle repair, hormone production, and
          overall body maintenance. Monitoring your protein intake ensures
          you're meeting your daily nutritional needs, which is especially
          important if you're active or looking to build muscle. Additionally,
          protein supports healthy immune function and is vital for
          maintaining skin, hair, and nail health. A consistent protein intake
          also helps stabilize energy levels throughout the day, reducing
          cravings and supporting overall metabolic health."
        graph={
          <ProteinChart
            currentWeekRecipes={scheduledRecipes.filter(
              ({ datetime }) =>
                new Date(datetime) >= currentWeekStart &&
                new Date(datetime) < nextWeekStart
            )}
            nextWeekRecipes={scheduledRecipes.filter(
              ({ datetime }) =>
                new Date(datetime) >= nextWeekStart &&
                new Date(datetime) < addDays(nextWeekStart, 7)
            )}
            isNextWeek={isNextWeek}
            color="#7FC8E0"
            style={chartStyle}
          />
        }
      />

    
      <GraphLayout
        blurbHeader="Calorie Trends for the Week"
        blurb="Tracking your calorie intake is a fundamental aspect of managing
          your weight and maintaining consistent energy levels throughout the
          day. By closely monitoring your calorie consumption, you can make
          informed decisions about portion sizes, food choices, and the
          overall balance of your diet, ensuring that you meet your
          nutritional needs without overconsumption. Weekly calorie trends
          provide valuable insights into your eating habits, helping you
          identify patterns that may be affecting your weight, energy levels,
          and overall health."
        graph={
          <CalorieTrendChart
            currentWeekRecipes={scheduledRecipes.filter(
              ({ datetime }) =>
                new Date(datetime) >= currentWeekStart &&
                new Date(datetime) < nextWeekStart
            )}
            nextWeekRecipes={scheduledRecipes.filter(
              ({ datetime }) =>
                new Date(datetime) >= nextWeekStart &&
                new Date(datetime) < addDays(nextWeekStart, 7)
            )}
            isNextWeek={isNextWeek}
            style={chartStyle}
          />
        }
      />

  
      <GraphLayout
        blurbHeader="Why Cooking Time Matters"
        blurb="Time is a valuable resource, and planning meals according to cooking
          time helps you manage your schedule more effectively. Quick meals
          can be just as nutritious as longer-cooked ones, and this chart
          helps you plan accordingly. Understanding your cooking time
          distribution allows you to balance your day more effectively,
          allocating more time to other important activities while still
          meeting your dietary goals."
        graph={
          <CookingTimePieChart
            currentWeekRecipes={scheduledRecipes.filter(
              ({ datetime }) =>
                new Date(datetime) >= currentWeekStart &&
                new Date(datetime) < nextWeekStart
            )}
            nextWeekRecipes={scheduledRecipes.filter(
              ({ datetime }) =>
                new Date(datetime) >= nextWeekStart &&
                new Date(datetime) < addDays(nextWeekStart, 7)
            )}
            isNextWeek={isNextWeek}
            style={chartStyle}
          />
        }
      />

  
      <GraphLayout
        blurbHeader="Calories for the Week"
        blurb="Monitoring total calorie intake for the week gives you a broader
          perspective on your diet and helps you balance your meals
          effectively. This chart provides a quick overview of your weekly
          calorie consumption. By keeping track of your calorie intake, you
          can ensure that you are meeting your energy needs without
          overconsumption, promoting a healthy balance that supports weight
          management and overall well-being. Additionally, it allows you to
          adapt your diet as needed to maintain a healthy lifestyle."
        graph={
          <HorizontalBarChart
            currentWeekRecipes={scheduledRecipes.filter(
              ({ datetime }) =>
                new Date(datetime) >= currentWeekStart &&
                new Date(datetime) < nextWeekStart
            )}
            nextWeekRecipes={scheduledRecipes.filter(
              ({ datetime }) =>
                new Date(datetime) >= nextWeekStart &&
                new Date(datetime) < addDays(nextWeekStart, 7)
            )}
            isNextWeek={isNextWeek}
            title="Calories for the Week"
            dataKey="calories"
            colors={["#7FC8E0"]}
            dates={{
              start: format(
                isNextWeek ? nextWeekStart : currentWeekStart,
                "MMM dd"
              ),
              end: format(
                addDays(isNextWeek ? nextWeekStart : currentWeekStart, 6),
                "MMM dd"
              ),
            }}
            style={chartStyle}
          />
        }
      />

 
      <GraphLayout
        blurbHeader="Cost Comparison"
        blurb="Comparing the cost of your meals from this week to next week helps
          you stay on budget. This chart provides an overview of your weekly
          food expenses and shows how they compare. Understanding these cost
          dynamics helps you make more informed choices about meal planning
          and budgeting, ensuring you get the most value for your money while
          maintaining a healthy diet."
        graph={
          <CostComparisonCard
            currentWeekRecipes={scheduledRecipes.filter(
              ({ datetime }) =>
                new Date(datetime) >= currentWeekStart &&
                new Date(datetime) < nextWeekStart
            )}
            nextWeekRecipes={scheduledRecipes.filter(
              ({ datetime }) =>
                new Date(datetime) >= nextWeekStart &&
                new Date(datetime) < addDays(nextWeekStart, 7)
            )}
            isNextWeek={isNextWeek}
            style={chartStyle}
          />
        }
      />

 
      <GraphLayout
        blurbHeader="Macronutrients Overview"
        blurb="Understanding the breakdown of macronutrients—fat, carbohydrates,
          and protein—can help you achieve a balanced diet. This chart shows
          the total intake of each macronutrient for the selected week,
          helping you ensure that you're getting the right balance for your
          health goals. Adjust your meals to focus on the nutrients you need
          most to maintain energy levels, support muscle growth, and manage
          your weight effectively."
        graph={
          <MacronutrientsChart
            currentWeekRecipes={scheduledRecipes.filter(
              ({ datetime }) =>
                new Date(datetime) >= currentWeekStart &&
                new Date(datetime) < nextWeekStart
            )}
            nextWeekRecipes={scheduledRecipes.filter(
              ({ datetime }) =>
                new Date(datetime) >= nextWeekStart &&
                new Date(datetime) < addDays(nextWeekStart, 7)
            )}
            isNextWeek={isNextWeek}
            style={chartStyle}
          />
        }
      />
    </div>
  );
}

export default PlanMealsPage;
