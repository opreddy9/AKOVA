import { Navigate } from "react-router-dom";
const Unprotected = ({ children }) => {
  // console.log(isLoggedIn);
  if (localStorage.token && localStorage.getItem("profession") === "student") {
    return <Navigate to="/student_dashboard" replace />;
  } else if (
    localStorage.token &&
    localStorage.getItem("profession") === "entrepreneur"
  ) {
    return <Navigate to="/entrepreneur_dashboard" replace />;
  } else if (
    localStorage.token &&
    localStorage.getItem("profession") === "investor"
  ) {
    return <Navigate to="/investor_dashboard" replace />;
  }
  return children;
};
export default Unprotected;