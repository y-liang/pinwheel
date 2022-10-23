import { useState } from "react";
import useAuth from "../../../library/hooks/auth-use";


// logout button
export default function Egress({ type, children }) {
   const auth = useAuth();

   const [description, setDescription] = useState();

   const handleClick = () => {
      const data = auth.egress(type);

      if (data.description) {
         setDescription(data.description);
      }

   };


   return (
      <div onClick={handleClick}>
         {children}

         <span>{description}</span>
      </div>
   );
}