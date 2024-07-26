import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import Login from "./features/auth/components/Login";
import Register from "./features/auth/components/Register";
import RequestResetPassword from "./features/auth/components/RequestResetPassword";
import UserInfo from "./UserInfo";
import ProtectedRoute from "./ProtectedRoute";
import ConfirmResetPassword from "./features/auth/components/ConfirmResetPassword";
import IngredientPageLayout from "./features/ingredient/ingredient-layout/components/IngredientPageLayout";
import Layout from "./features/misc/components/Layout";
import CSSPlayground from "./features/CSSTESTING/CSSPlayground";

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
            <Route element={<Layout />}>
              <Route path="/user-info" element={<UserInfo />} />
              <Route
                path="/ingredientManager"
                element={<IngredientPageLayout />}
              />
              <Route path="/CSSPlayground" element={<CSSPlayground />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </TooltipProvider>
  );
};

export default App;
