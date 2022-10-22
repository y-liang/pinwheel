
/**
 * routes for app
 */

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorFound from './frames/cover/ensembles/error-found';
import AuthProvider from './frames/universal/auth/auth-provider';
import AuthRequire from './frames/universal/auth/auth-require';

import Frame from './frames/frame';
import Cover from './frames/cover/cover';
import Review from './frames/review/review';
import Profile from './frames/profile/profile';
import Account from './frames/account/account';

import ReviewView, { action as actionReviewView, loader as loaderReviewView } from './frames/review/ensembles/review-view';
import ReviewEdit, { action as actionReviewEdit, loader as loaderReviewEdit } from './frames/review/ensembles/review-edit';
import { action as actionReviewDelete } from './frames/review/ensembles/review-delete';

import ProfileView from './frames/profile/ensembles/profile-edit';
import ProfileView from './frames/profile/ensembles/profile-view';

import LogIn from './frames/account/ensembles/login';
import LogOut from './frames/account/ensembles/logout';
import SignUp from './frames/account/ensembles/signup';






const router = createBrowserRouter([
   {
      path: '/', // unnecessary but keep it for visual
      element:
         <AuthProvider>
            <Frame />
         </AuthProvider>,
      errorElement: <ErrorFound />,
      children: [
         {
            index: true,
            element: <Cover />
         },
         {
            path: 'account',
            element: <Account />,
            children: [
               {
                  path: 'login',
                  element: <LogIn />,
                  // loader: redirectIfProfile,
                  // action: loginProfile,
               },
               {
                  path: 'logout',
                  // action: logoutProfile,
               },
               {
                  path: 'signup',
                  element: <SignUp />,
               }
            ]

         },
         {
            path: 'reviews',
            element: <Review />,
            children: [
               // { index: true, element: <Index /> }, // the { index:true } instead of { path: "" }. That tells the router to match and render this route when the user is at the parent route's exact path, so there are no other child routes to render in the <Outlet>.
               {
                  path: ':reviewId',
                  element: <ReviewView />,
                  // loader: loaderReviewView,
                  // action: actionReviewView,
               },
               {
                  path: ':reviewId/edit',
                  element: <ReviewEdit />,
                  // loader: loaderReviewView,
                  // action: actionReviewEdit,
               },
               {
                  path: ':reviewId/delete',
                  errorElement: <div> Oops! There was an error.</div>,
                  // action: actionReviewDelete,
               }
            ]
         },
         {
            path: 'profiles',
            // element: <Profile />
         },
         {
            path: '/:profileId',
            // element: <Profile />,
            // loader: profileLoader,
            // action: profileAction,
            children: [
               {
                  // path: 'view', // unnecessary to have path here
                  // element: <ProfileView />,
                  // loader: getProfile,
                  // action: redirectToEdit,
               },
               {
                  path: 'edit',
                  // element: <ProfileEdit />,
                  // loader: getProfile,
                  // action: submitEdit,
               },

            ]
         },


         // { path: 'public', element: <MockPublic /> },
         // { path: 'protected', element: <AuthRequire><MockProtected /></AuthRequire> },
      ]
   },
]);



export default function App() {
   return <RouterProvider router={router} />;
}