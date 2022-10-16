/**
 * this file that will seed database with mock data
 * node seed.js
 */

import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
   await Promise.all(
      getReviews().map((review) => {
         return db.review.create({ data: review });
      })
   );
}

// run main function
seed();

function getReviews() {

   return [
      {
         title: "diffusa erant",
         content: `Etsi biloba Ginkgo aliaeque generis species per totum mundum olim diffusa erant, eius ambitus abhorruit et ante duos miliones annorum, parva area Sinarum restricta fuit.`,
      },
      {
         title: "arbores",
         content: `Utrum incolarum adhuc indigenae existant, non univoce demonstratum est, sed geneticum testimonium est has incolas Australes esse silvestres, itemque testimonium maximum et vetustissimum`,
      },
      {
         title: "silvas naturales",
         content: `Residuum potest esse ecotypa vel species.`,
      },
      {
         title: "tertia regione meridionali",
         content: `Dum improbabile videri potest quod una species existit ut ens contiguum per multa decies annorum, plures vitae parametri historiae aptae: longitudinis extremae.`,
      },
      {
         title: "glacialis",
         content: `Haec hypothesin sustinet, quod plantae florentes per tempus melius aptationibus ad perturbationem impellitur.`,
      },
      {
         title: "Dinner",
         content: `What did one plate say to the other plate? Dinner is on me!`,
      },
      {
         title: "Elevator",
         content: `My first time using an elevator was an uplifting experience. The second time let me down.`,
      },
   ];
}