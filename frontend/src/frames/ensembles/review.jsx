
import { Form, useLoaderData } from 'react-router-dom';





/* loader */
export async function loader() {
   const reviews = await review.getAll();
   return { reviews };
}


/* action */
export async function action() {
   await review.addOne();
}


export default function Review() {
   const { reviews } = useLoaderData(); // the loader configured on the route too



   return (
      <>
         <h1>reviews</h1>

         <nav>

            {reviews.length ? (
               <ul>
                  {reviews.map((review) => (
                     <li key={review.id}>
                        <Link to={`reviews/${review.id}`}>
                           {review.title || review.content ? (
                              <>
                                 {review.title} {review.content}
                              </>
                           ) : (
                              <i>No Content</i>
                           )}{" "}
                           {review.favorite && <span>★</span>}
                        </Link>
                     </li>
                  ))}
               </ul>
            ) : (
               <p>
                  <i>No reviews</i>
               </p>
            )}

         </nav>


         <div>
            <Form method="post">
               <button type="submit">New</button>
            </Form>
         </div>

      </>
   );
}