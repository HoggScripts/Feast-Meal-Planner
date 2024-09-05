import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { TooltipProvider } from "@radix-ui/react-tooltip";

import ProtectedRoute from "./features/navigation/ProtectedRoute";
import ConfirmResetPassword from "./features/auth/ConfirmResetPassword";

import RecipeMakerPage from "./features/pages/CreateRecipesPage";
import LandingPage from "./features/pages/LandingPage";
import AppLayout from "./features/navigation/AppLayout";

import UserProfile from "./features/pages/UserProfile";
import { useState } from "react";
import PlanMealsPage from "./features/pages/PlanMealsPage";
import CookieCheck from "./features/navigation/CookieCheck";
import RecipeCardPage from "./features/pages/RecipeCardPage";

const App = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <TooltipProvider>
      <Router>
        <CookieCheck />
        <Routes>
          <Route
            path="/confirm-reset-password/:token/:email"
            element={<ConfirmResetPassword />}
          />

          <Route
            element={
              <AppLayout
                isLoginOpen={isLoginOpen}
                setIsLoginOpen={setIsLoginOpen}
              />
            }
          >
            <Route path="/landing-page" element={<LandingPage />} />
            <Route element={<ProtectedRoute setIsLoginOpen={setIsLoginOpen} />}>
              <Route path="/create-recipes" element={<RecipeMakerPage />} />
              <Route path="/plan-meals" element={<PlanMealsPage />} />
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/recipes/:recipeId" element={<RecipeCardPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/landing-page" />} />
        </Routes>
      </Router>
    </TooltipProvider>
  );
};

export default App;
