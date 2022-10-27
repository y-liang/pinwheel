
/**
 * hit backend apis (backend/src/gears/review)
 */

const { BACKEND_URL } = process.env;
const baseurl = BACKEND_URL;

const review = {

  // get
  async getAll() {

  },

  async getOne(id) {

  },

  // post
  async addOne() {

  },

  // put
  async editOne(id, edits) {
    fetch(baseurl, {
      method: 'PUT',
      body: { edits }
    });

  },

  // delete
  async deleteOne() {

  }
  /* to delete
  export const action: ActionFunction = async ({
     request,
     params,
   }) => {
     const form = await request.formData();
     if (form.get("_method") !== "delete") {
       throw new Response(
         `The _method ${form.get("_method")} is not supported`,
         { status: 400 }
       );
     }
     const userId = await requireUserId(request);
     const joke = await db.joke.findUnique({
       where: { id: params.jokeId },
     });
     if (!joke) {
       throw new Response("Can't delete what does not exist", {
         status: 404,
       });
     }
     if (joke.jokesterId !== userId) {
       throw new Response(
         "Pssh, nice try. That's not your joke",
         {
           status: 401,
         }
       );
     }
     await db.joke.delete({ where: { id: params.jokeId } });
     return redirect("/jokes");
   };
   */


};

export default review;