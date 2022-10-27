/**
 * display all reviews
 */


import { Form, Outlet, useNavigation, useSubmit } from "react-router-dom";

// export async function loader() {
//    const reviews = await review.getAll();
//    return { reviews };
// }

// // filter the list of reviews to display if there are URLSearchParams
// export async function loader({ request }) {
//    const url = new URL(request.url);
//    const searchTerm = url.searchParams.get('search');
//    const reviews = await review.getAll(searchTerm);
//    return { reviews, searchTerm };
// }



export default function Review() {
   const navigation = useNavigation(); // for pending ui, returns the current navigation state: "idle" or "submitting" or "loading".






   // return (
   //    <>
   //       <h1>review</h1>
   //       <nav id="sidebar">

   //          {reviews.length ? (
   //             <ul>
   //                {reviews.map((review) => (
   //                   <li key={review.id}>
   //                      <Link to={`reviews/${review.id}`}>
   //                         {review.title || review.content ? (
   //                            <>
   //                               {review.title} {review.content}
   //                            </>
   //                         ) : (
   //                            <i>No Content</i>
   //                         )}{" "}
   //                         {review.favorite && <span>★</span>}
   //                      </Link>
   //                   </li>
   //                ))}
   //             </ul>
   //          ) : (
   //             <p>
   //                <i>No reviews</i>
   //             </p>
   //          )}

   //       </nav>
   //       <div id="detail" className={
   //          navigation.state === "loading" ? "loading" : ""
   //       }>
   //          <Outlet />
   //       </div>

   //       <div>
   //          <Form method="post">
   //             <button type="submit">New</button>
   //          </Form>


   //          {/* a GET form - submitting a GET form is the same as clicking a link: only the URL changes
   //          note the argument to `submit`- passing in event.currentTarget.form
   //          the currentTarget is the DOM node the event is attached to,
   //          and the currentTarget.form is the input's parent form node
   //          the submit function will serialize and submit any form you pass to it
   //          */}
   //          <Form id="search-form" role="search">
   //             <input name="search" defaultValue={searchTerm}
   //                id="search" aria-label="search reviews" placeholder="search" type="search"
   //                onChange={(event) => {
   //                   submit(event.currentTarget.form, { replace: searchTerm !== null });
   //                }} />

   //          </Form>
   //       </div>


   //    </>
   // );
};