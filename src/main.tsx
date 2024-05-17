import React from "react";
import ReactDOM from "react-dom/client";
import Character from "./Character.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import EpisodebyCharacter from "./EpisodebyCharacter.tsx";
import EpisodeById from "./EpisodeById.tsx";
import Layout from "./Layout.tsx";
import Episode from "./Episode.tsx";
import Location from "./Location.tsx";
import LocationById from "./LocationById.tsx";
import PageNotFound from "./components/PageNotFound.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        element: <Character />,
      },
      {
        path: "/character/episode/:id",
        element: <EpisodebyCharacter />,
      },
      {
        path: "/episode/:id",
        element: <EpisodeById />,
      },
      {
        path: "/episode",
        element: <Episode />,
      },
      {
        path: "/location",
        element: <Location />,
      },
      {
        path: "/location/:id",
        element: <LocationById />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
