import { useContext } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "./AuthContext";

function RequireAuth({ children }) {
  // eslint-disable-next-line no-unused-vars
  const auth = useContext(AuthContext);
  // eslint-disable-next-line no-unused-vars
  const location = useLocation();

  return children;
}

export default RequireAuth;
