import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import review from '../../../gears/review/review';


// request, request.formData, Object.fromEntries - provided by web api
// loaders and actions - provided by react router, can both return a Response and receive a Request

// action wired up to the route /review
// export async function action({ request, params }) {
//    const formData = await request.formData(); // formData.get('title');
//    const edits = Object.fromEntries(formData);
//    await review.editOne(params.reviewId, edits);
//    return redirect(`/reviews/${params.reviewId}`); // redirect returns a response that tells the app to change locations
// }

export default function ReviewEdit() {
   const review = useLoaderData();
   const navigate = useNavigate();

   return (
      <Form method="post" id="review-form">
         <p>
            <span>Name</span>
            <input
               placeholder="title"
               aria-label="title"
               type="text"
               name="title"
               defaultValue={review.title}
            />
            <input
               placeholder="content"
               aria-label="content"
               type="text"
               name="content"
               defaultValue={review.content}
            />
         </p>
         <label>
            <span>Author</span>
            <textarea
               name="author"
               defaultValue={review.author}
               rows={6}
            />
         </label>
         <p>
            <button type="submit">Save</button>
            <button type="button" onClick={() => navigate(-1)}>Cancel</button>
         </p>
      </Form>
   );
}