import { useState } from "react";
import useAuth from "../../../library/hooks/auth-use";


// logout button
export default function Egress({ type, children }) {
   const auth = useAuth();
   const [alertDescription, setAlertDescription] = useState();

   const handleClick = () => {
      const data = auth.egress(type);
      // only returns description as data
      if (data) {
         setAlertDescription(data.alert_description);
      }
   };


   return (
      <div onClick={handleClick}>
         {children}
         <span>{alertDescription}</span>
      </div>
   );
}