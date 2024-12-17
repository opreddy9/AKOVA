import { Navigate } from "react-router-dom";
import axios from "axios";
const ProtectedRouteInvestor = ({ children }) => {
  const fetchUser = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      };
      let res = await axios.get(
        "http://localhost:5000/api/auth/protectroute",
        {
          headers: headers,
        }
      );
      // console.log(res);
      if (res) {
        if (res.data.profession !== localStorage.getItem("profession")) {
          localStorage.removeItem("token");
          localStorage.removeItem("profession");
          window.location.reload();
          return <Navigate to="/login" replace />;
        } else {
          return true;
        }
      }
    } catch (err) {
      window.alert(err.data.msg);
      localStorage.removeItem("token");
      localStorage.removeItem("profession");
      window.location.reload();
      return <Navigate to="/login" replace />;
    }
  };
  if (!localStorage.token) {
    return <Navigate to="/login" replace />;
  } else if (
    localStorage.token &&
    localStorage.getItem("profession") === "investor"
  ) {
    if(fetchUser())
        return children;
  } else return <Navigate to="/login" replace />;
};
export default ProtectedRouteInvestor;