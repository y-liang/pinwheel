
import review from '../../../gears/review/review';


// after the action redirects, React Router calls all of the loaders 
// for the data on the page to get the latest values (this is "revalidation")
// useLoaderData returns new values and causes the components to update
export async function action({ params }) {
   await review.deleteOne(params.reviewId);
   return redirect('/');
}