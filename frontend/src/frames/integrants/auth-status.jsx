import { useNavigate } from "react-router-dom";
import { useAuth } from "../../gears/mock/auth-context";

export default function AuthStatus() {
   const auth = useAuth();
   const navigate = useNavigate();

   if (!auth.profile) {
      return <p>You are not logged in.</p>;
   }

   return (
      <p>
         Welcome {auth.profile}!{" "}
         <button
            onClick={() => {
               auth.signout(() => navigate("/"));
            }}
         >
            Sign out
         </button>
      </p>
   );
}