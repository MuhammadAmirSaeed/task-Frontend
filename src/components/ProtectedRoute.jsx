
import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../utils/cookiesConfig";

function ProtectedRoute({ element, ...rest }) {
    const token = getCookie('token');
// console.log(token);
 

  if (!token) {
    return <Navigate to="/" state={{ from: rest.location }} />;
  } 
  return <Outlet />;
}

export default ProtectedRoute;
