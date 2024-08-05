import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { List } from "./pages/List/List.tsx";
import { Profile } from "./pages/Profile/Profile.tsx";
import { Error } from "./pages/Error/Error.tsx";
import { AuthLayout } from "./layouts/Auth/AuthLayout.tsx";
import axios from "axios";
import { Login } from "./pages/Login/Login.tsx";
import { Register } from "./pages/Register/Register.tsx";
import { RequireAuth } from "./helpers/RequireAuth.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <List />
      </RequireAuth>
    ),
  },
  {
    path: "/profile/:id",
    element: (
      <RequireAuth>
        <Profile />
      </RequireAuth>
    ),
    errorElement: <>Упс! Произошла ошибка</>,
    loader: async ({ params }) => {
      const { data } = await axios.get(
        `https://reqres.in/api/users/${params.id}`
      );
      return data.data;
    },
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
