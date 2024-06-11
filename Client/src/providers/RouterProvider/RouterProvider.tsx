import { JSX } from "react";
import { createBrowserRouter, RouterProvider as ReactRouterProvider } from "react-router-dom";

import { routes } from "config";
import { Feed, Layout } from "components";
import Album from "components/Album";

const router = createBrowserRouter([
  {
    path: routes.HOME,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Feed />,
      },
      {
        path: "album/:id",
        element: <Album />,
      },
    ],
  },
]);

function RouterProvider(): JSX.Element {
  return <ReactRouterProvider router={router} />;
}

export default RouterProvider;
