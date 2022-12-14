
/**
 * routes for app
 */

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorFound from './frames/cover/ensembles/error-found';
import AuthProvider from './frames/share/auth/auth-provider';
import AuthRequire from './frames/share/auth/auth-require';

import Frame from './frames/frame';
import Cover from './frames/cover/cover';
import Review from './frames/review/review';
import Profile from './frames/profile/profile';
import Account from './frames/account/account';

import ReviewView, { action as actionReviewView, loader as loaderReviewView } from './frames/review/ensembles/review-view';
import ReviewEdit, { action as actionReviewEdit, loader as loaderReviewEdit } from './frames/review/ensembles/review-edit';

import ProfileView from './frames/profile/ensembles/profile-edit';
import ProfileView from './frames/profile/ensembles/profile-view';


import Access from './frames/account/ensembles/access';
import Egress from './frames/account/ensembles/egress';






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
                  path: 'logout',
                  element: <Egress type={'logout'} />
               },

               {
                  path: 'signup',
                  element: <Access type={'signup'} />,
               },
               {
                  path: 'login',
                  element: <Access type={'login'} />,
               },
               {
                  path: 'forget',
                  element: <Access type={'forget'} />,
               },
               {
                  path: 'reset',
                  element: <Access type={'reset'} />,
               },
               {
                  path: 'deactivate',
                  element: <Access type={'deactivate'} />,
               },



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