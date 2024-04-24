import * as React from "react";
import {
  createBrowserRouter
} from "react-router-dom";
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import ContactList from './components/conatctList/mainContactList'
import ProtectedRoute, { NotProtectedRoute } from "./ProtectecRoute";
import { RouterProvider } from "react-router-dom";

function ApiRoute({ isAuth }) {
  const router  = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute isAuth={isAuth}>
                  <ContactList />
                </ProtectedRoute>,
    },
    {
      path: "/register",
      element: <NotProtectedRoute isAuth={isAuth}>
                  <Register />
                </NotProtectedRoute>,
    },
    {
      path: "/login",
      element: <NotProtectedRoute isAuth={isAuth}>
                  <Login />
                </NotProtectedRoute>,
    },
    {
      path: "*",
      element: <p>Error 404</p>,
    },
  ]);
  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
}
export default ApiRoute