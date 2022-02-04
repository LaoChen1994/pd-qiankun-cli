import { RouteProps } from "react-router-dom";

export interface IRoutes extends RouteProps {
  childRoutes?: RouteProps[];
  name?: string
}
