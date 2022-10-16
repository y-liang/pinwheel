import { useLocation } from "react-router-dom";
import { useAuth } from "../../gears/mock/auth-context";

export default function AuthRequire({ children }) {
   const auth = useAuth();
   const location = useLocation();

   if (!auth.profile) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer profile experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} replace />;
   }

   return children;
}
