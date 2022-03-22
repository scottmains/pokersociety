import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Newsfeed from "../../pages/Newsfeed/Newsfeed";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Navigate to="/newsfeed" state={{ from: location }} replace />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;