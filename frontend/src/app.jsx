
/**
 * routes for app
 */

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorFound from './frames/segments/cover/error-found';
import Cover from './frames/ensembles/cover';
import Frame from './frames/ensembles/frame';

import Account from './frames/ensembles/account';

import Profile, { loader as profileLoader, action as profileAction } from './frames/ensembles/profile';
import Detail, { loader as detailLoader, action as detailAction } from './frames/ensembles/detail';
import LogIn from './frames/segments/account/login';

import AuthProvider, { RequireAuth } from './gears/mock/auth-context';
import MockPublic from './frames/ensembles/mock-public';
import MockProtected from './frames/ensembles/mock-protected';
import ProfilesDisplay from './frames/segments/cover/profiles-display';
import ProfileView from './frames/segments/profile/profile-view';
import ProfileEdit from './frames/segments/profile/edit-profile';
import Review, { action as actionReview, loader as loaderReview } from './frames/ensembles/review';
import ReviewEdit from './frames/ensembles/review-edit';




const router = createBrowserRouter([
   {
      // path: '/', // unnecessary???
      element: <AuthProvider><Frame /></AuthProvider>,
      errorElement: <ErrorFound />,
      children: [
         {
            path: '/',
            element: <Cover />
         },
         {
            path: 'reviews',
            children: [
               {
                  path: '/:reviewId',
                  element: <Review />,
                  loader: loaderReview,
                  action: actionReview,
               },
               {
                  path: '/:reviewId/edit',
                  element: <ReviewEdit />,
                  loader: loaderReview,
                  action: actionReview,
               },
            ]
         },
         {
            path: 'profiles',
            element: <ProfilesDisplay />
         },
         {
            path: 'profile/:profileId',
            element: <Profile />,
            // loader: profileLoader,
            // action: profileAction,
            children: [
               {
                  // path: 'view', // unnecessary to have path here
                  element: <ProfileView />,
                  // loader: getProfile,
                  // action: redirectToEdit,
               },
               {
                  path: 'edit',
                  element: <ProfileEdit />,
                  // loader: getProfile,
                  // action: submitEdit,
               },
            ]
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
               }
            ]

         },

         { path: 'public', element: <MockPublic /> },
         { path: 'protected', element: <RequireAuth><MockProtected /></RequireAuth> },
      ]
   },
]);



export default function App() {
   return <RouterProvider router={router} />;
}