
import express from 'express';
import db from '../../database/main';

export const router = express.Router();


// for now, route /reviews - /reviews/feed, /reviews/review, ...

/* GET */
app.get('/feed', async (req, res) => {
   const reviews = await db.review.findMany({
      where: { published: true },
      include: { author: true },
   });
   res.json(reviews);
});

/* GET */
app.get('/:id', async (req, res) => {
   const { id } = req.params;
   const review = await db.review.findMany({ // maybe find???
      where: { id: Number(id) },
      data: { published: true },
   });
   res.json(review);
});

/* POST */
app.post(`/review`, async (req, res) => {
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
app.put('/publish/:id', async (req, res) => {
   const { id } = req.params;
   const review = await db.review.update({
      where: { id: Number(id) },
      data: { published: true },
   });
   res.json(review);
});

/* DELETE */
app.delete(`/review/:id`, async (req, res) => {
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