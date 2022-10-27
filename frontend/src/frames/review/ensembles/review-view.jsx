
import { Form, useLoaderData } from 'react-router-dom';





// /* loader */
// export async function loader() {
//    const review = await review.getOne();
//    return { review };
// }


// /* action */
// export async function action() {
//    await review.addOne();
// }


export default function ReviewView() {



   // return (
   //    <>
   //       <h1>review</h1>

   //       {review}

   //       <div>


   //          {/* submit to review/:reviewId/edit when clicked, method omitted??? */}
   //          <Form action="edit">
   //             <button type="submit">Edit</button>
   //          </Form>

   //          {/*  action points to "delete" - a relative action with destroy will submit the form to review/:reviewId/destroy when clicked */}
   //          <Form method="post" action="delete" onSubmit={event => {
   //             if (!confirm(
   //                "Are you sure you want to delete this record?"
   //             )) {
   //                event.preventDefault();
   //             }
   //          }}>
   //             <button type="submit">Delete</button>
   //          </Form>
   //       </div>

   //    </>
   // );
}