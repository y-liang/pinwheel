/**
 * this file that will seed database with mock data
 * node seed.js
 */

import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
   const ginkgo = await db.account.create({
      data: {
         email: "ginkgo@mail.com",
         passHash: "abcdefgh",
         name: "ginkgo"
      },
   });
   await Promise.all(
      getReviews().map((review) => {
         const data = { authorId: ginkgo.id, ...review };
         return db.review.create({ data });
      })
   );
}

// run main function
seed();

function getReviews() {

   return [
      {
         title: "diffusa erant",
         content: `Etsi biloba aliaeque generis species per totum mundum olim diffusa erant, eius ambitus abhorruit et ante duos miliones annorum, parva area Sinarum restricta fuit.`,
         published: true,
      },
      {
         title: "arbores",
         content: `Utrum incolarum adhuc indigenae existant, non univoce demonstratum est, sed geneticum testimonium est has incolas Australes esse silvestres, itemque testimonium maximum et vetustissimum`,
         published: true,
      },
      {
         title: "silvas naturales",
         content: `Residuum potest esse ecotypa vel species.`,
         published: false,
      },
      {
         title: "tertia regione meridionali",
         content: `Dum improbabile videri potest quod una species existit ut ens contiguum per multa decies annorum, plures vitae parametri historiae aptae: longitudinis extremae.`,
         published: true,
      },
      {
         title: "glacialis",
         content: `Haec hypothesin sustinet, quod plantae florentes per tempus melius aptationibus ad perturbationem impellitur.`,
         published: false,
      },
      {
         title: "magna genome",
         content: `Quae complures efficiunt. de machinationibus antibacterial et chemicis defensionis.`,
         published: false,
      },
      {
         title: "tribus saeculis occurrit",
         content: `Kaempfer error simplex esse videtur; orthographiam ducens aliorum verborum Iaponum, quae syllabam.`,
         published: true,
      },
   ];
}