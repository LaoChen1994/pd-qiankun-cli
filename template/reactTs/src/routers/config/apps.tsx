import { IRoutes } from "../../types/route";
import loadable from "../components/Loadable";

const routes: IRoutes[] = [
  {
    path: "/base",
    element: loadable(() => import("../../Pages/App")),
    childRoutes: [
      {
        path: "about",
        element: loadable(() => import("../../Pages/About")),
      },
      {
        path: "home",
        element: loadable(() => import("../../Pages/Home")),
      },
    ],
  },
  {
    path: "thanks",
    element: loadable(() => import("../../Pages/Thanks")),
  },
  {
    path: "*",
    element: loadable(() => import("../../Pages/App")),
  },
];

export default routes;
