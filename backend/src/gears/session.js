/*
import cookieSession from 'cookie-session';

// if password correct
// creates a new session (via the cookie storage getSession function)
// sets the userId field on the session
// redirects to the given route setting the Set-Cookie header (via the cookie storage commitSession function)
if (!SESSION_SECRET) throw new Error(`SESSION_SECRET must be set`);

// swap this with express session
// const storage = createCookieSessionStorage({
//    cookie: {
//       name: 'pinwheel_session',
//       secure: NODE_ENV === 'production', // normally you want this to be `secure: true` but that doesn't work on localhost for Safari
//       secrets: [SESSION_SECRET],
//       sameSite: 'lax',
//       path: '/',
//       maxAge: 60 * 60 * 24 * 30,
//       httpOnly: true,
//    }
// });


// double check this
// export async function createAccountSession(accountId, redirectTo) {
//    const session = await storage.getSession();
//    session.set('accountId', accountId);

//    // check redirect and commit session???
//    return redirect(redirectTo, {
//       headers: {
//          "Set-Cookie": await storage.commitSession(session)
//       }
//    });
// }



function getAccountSession(request) {
   return storage.getSession(request.headers.get('Cookie'));
}

export async function getAccountId(request) {
   const session = await getAccountSession(request);
   const accountId = session.get('accountId');
   if (!accountId || typeof accountId !== 'string') return null;
   return accountId;
}

// redirectTo: string = new URL(request.url).pathname ???
export async function requireAccountId(request, redirectTo) {
   const session = await getAccountSession(request);
   const accountId = session.get('accountId');
   if (!accountId || typeof accountId !== 'string') {
      const searchParams = new URLSearchParams([
         ['redirectTo', redirectTo]
      ]);
      throw redirect(`/login?${searchParams}`); // redirect is a utility function that returns a Response object
   }

   return accountId;
}



// to log out, double check here
export async function getUser(request) {
   const userId = await getUserId(request);
   if (typeof userId !== "string") {
      return null;
   }

   try {
      const user = await db.user.findUnique({
         where: { id: userId },
         select: { id: true, username: true },
      });
      return user;
   } catch {
      throw logout(request);
   }
}
*/