import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./features/auth/components/Login";
import Register from "./features/auth/components/Register";
import RequestResetPassword from "./features/auth/components/RequestResetPassword";
import UserInfo from "./UserInfo";
import ProtectedRoute from "./ProtectedRoute";
import ConfirmResetPassword from "./features/auth/components/ConfirmResetPassword";

import IngredientPageLayout from "./features/ingredient/ingredient-layout/components/IngredientPageLayout";

const App = () => {
  return (
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
          <Route path="/user-info" element={<UserInfo />} />
          <Route path="/ingredientManager" element={<IngredientPageLayout />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
