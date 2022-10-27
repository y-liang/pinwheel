import { useNavigate } from "react-router-dom";
import useAuth from "../../../library/hooks/auth-use";
import Egress from "../../account/ensembles/egress";

export default function AuthStatus() {
   const auth = useAuth();
   const navigate = useNavigate();

   if (!auth.account) {

      return <p>You are not logged in.</p>;
   }

   return (
      <div>
         Welcome {auth.account.email}!{" "}
         {/* <button
            onClick={() => {
               auth.egress('logout');
               navigate("/");
            }}
         >
            Sign out
         </button> */}
         <Egress type={"logout"} callback={() => navigate("/")}>
            logout
         </Egress>
      </div>
   );
}