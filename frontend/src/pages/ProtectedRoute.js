import { Navigate, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/AuthUtils";

const ProtectedRoute = ({ children }) => {

  const navigate = useNavigate()
  // return isAuthenticated() ? children : <Navigate to="/login" />;
  return isAuthenticated() ? children : navigate("/login");
};

export default ProtectedRoute;


