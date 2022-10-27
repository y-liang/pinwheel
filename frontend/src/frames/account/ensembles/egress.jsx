import { useState } from "react";
import useAuth from "../../../library/hooks/auth-use";


// logout button
export default function Egress({ type, children, callback }) {
   const auth = useAuth();

   const [description, setDescription] = useState();

   const handleClick = () => {
      const data = auth.egress(type);

      // only returns description as data
      if (data) {
         setDescription(data.description);
      }

      callback();

   };


   return (
      <div onClick={handleClick}>
         {children}

         <span>{description}</span>
      </div>
   );
}