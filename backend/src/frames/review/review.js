
import express from 'express';
import { default as db } from '../../../database/main.js';
// import { requireAccountId } from '../account/ensembles/session.js';

const router = express.Router();


// for now, route /reviews - /reviews/feed, /reviews/review, ...

/* GET */
router.get('/feed', async (req, res) => {
   const reviews = await db.review.findMany({
      where: { published: true },
      include: { author: true },
   });
   res.json(reviews);
});

/* GET */
router.get('/:id', async (req, res) => {
   const { id } = req.params;
   const review = await db.review.findUnique({
      where: { id: Number(id) },
      data: { published: true },
   });


   // error and catch boundary
   if (!review) {
      throw new Response(`Not found`, {
         status: 404,
      });
   }
   // to catch above error, on the frontend add
   /**
      export function CatchBoundary() {
         const caught = useCatch();
         const params = useParams();
         if (caught.status === 404) {
            return (
               <div className="error-container">
               Huh? What the heck is "{params.jokeId}"?
               </div>
            );
         }
         throw new Error(`Unhandled error: ${caught.status}`);
      }


      similarly for account access
      export const loader: LoaderFunction = async ({
         request,
         }) => {
         const userId = await getUserId(request);
         if (!userId) {
            throw new Response("Unauthorized", { status: 401 });
         }
         return json({});
      };


      export function CatchBoundary() {
         const caught = useCatch();

         if (caught.status === 401) {
            return (
               <div className="error-container">
               <p>You must be logged in to create a joke.</p>
               <Link to="/login">Login</Link>
               </div>
            );
         }
      }

    */

   res.json(review);
});

/* POST */
router.post(`/review`, async (req, res) => {

   // check if account log in? maybe frontend??? with context???
   const accountId = await requireAccountId(request);


   const { title, content, authorEmail } = req.body;
   const result = await db.review.create({
      data: {
         title,
         content,
         published: false,
         author: { connect: { email: authorEmail } },
      },
   });
   res.json(result);
});

/* PUT */
router.put('/publish/:id', async (req, res) => {
   const { id } = req.params;
   const review = await db.review.update({
      where: { id: Number(id) },
      data: { published: true },
   });
   res.json(review);
});

/* DELETE */
router.delete(`/review/:id`, async (req, res) => {
   const { id } = req.params;
   const review = await db.review.delete({
      where: {
         id: Number(id),
      },
   });
   res.json(review);
});


/*
   [
      {
         "id": "21",
         "title": "Hello World",
         "content": "null",
         "published": "true",
         "authorId": 42,
         "author": {
         "id": "42",
         "name": "Alice",
         "email": "alice@db.io"
         }
      }
   ]
*/


export default router;