import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import RequestResetPassword from "./features/auth/RequestResetPassword";

import ProtectedRoute from "./ProtectedRoute";
import ConfirmResetPassword from "./features/auth/ConfirmResetPassword";

import RecipeMakerPage from "./features/pages/CreateRecipesPage";
import LandingPage from "./features/pages/LandingPage";
import AppLayout from "./features/pages/AppLayout";
import ViewRecipesPage from "./features/pages/ViewRecipesPage";

const App = () => {
  return (
    <TooltipProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/confirm-reset-password/:token/:email"
            element={<ConfirmResetPassword />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/request-reset-password"
            element={<RequestResetPassword />}
          />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/landing-page" element={<LandingPage />} />
              <Route path="/create-recipes" element={<RecipeMakerPage />} />
              <Route path="/view-recipes" element={<ViewRecipesPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </TooltipProvider>
  );
};

export default App;
