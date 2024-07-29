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
import UserInfo from "./UserInfo";
import ProtectedRoute from "./ProtectedRoute";
import ConfirmResetPassword from "./features/auth/ConfirmResetPassword";

import Layout from "./features/layouts/Layout";

import RecipeMakerPage from "./features/recipe-maker/RecipeMakerPage";

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
            </Route>
            <Route path="/recipe-maker-layout" element={<RecipeMakerPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </TooltipProvider>
  );
};

export default App;
