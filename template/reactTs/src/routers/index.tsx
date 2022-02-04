import { HashRouter, Routes, Route } from "react-router-dom";

import { IRoutes } from "../types/route";
import routes from "./routes";

const renderRoute = (routes: IRoutes, baseName: string = "") => {
  const { childRoutes = [], name, ...res } = routes;

  return (
    <Route {...res} key={baseName}>
      {childRoutes.map((item, i) =>
        renderRoute(item, baseName + "_" + (name || i.toString()))
      )}
    </Route>
  );
};

const BaseRouter = () => (
  <>
    <HashRouter>
      <Routes>{routes.map((item) => renderRoute(item, "component"))}</Routes>
    </HashRouter>
  </>
);

export default BaseRouter;
