import { Form, useLoaderData } from "react-router-dom";

export default function ReviewEdit() {
   const review = useLoaderData();

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
            <button type="button">Cancel</button>
         </p>
      </Form>
   );
}