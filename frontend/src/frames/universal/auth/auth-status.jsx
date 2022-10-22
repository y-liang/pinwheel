import { useNavigate } from "react-router-dom";
import useAuth from "../../../library/hooks/auth-use";

export default function AuthStatus() {
   const auth = useAuth();
   const navigate = useNavigate();

   if (!auth.accountId) {

      return <p>You are not logged in.</p>;
   }

   return (
      <p>
         Welcome {auth.accountId}!{" "}
         <button
            onClick={() => {

               auth.logout(() => navigate("/"));
            }}
         >
            Sign out
         </button>
      </p>
   );
}