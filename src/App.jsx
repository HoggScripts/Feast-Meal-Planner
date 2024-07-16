import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import RequestResetPassword from "./RequestResetPassword";
import UserInfo from "./UserInfo";
import ProtectedRoute from "./ProtectedRoute";
import ConfirmResetPassword from "./ConfirmResetPassword";

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
          {/* Add other protected routes here */}
        </Route>

        {/* Redirect to login by default */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
