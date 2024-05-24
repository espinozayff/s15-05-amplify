import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from "react-router-dom";

import { routes } from "../../config";
import {
  Auth,
  Layout,
} from "../../components";
import App from "../../App";

const router = createBrowserRouter([
  {
    path: routes.LOGIN,
    element: <Auth />,
  },
  {
    path: routes.HOME,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />,
      },
    ],
  },
]);

function RouterProvider() {
  return <ReactRouterProvider router={router} />;
}

export default RouterProvider;
