import Loadable from "react-loadable";

export default (loadComponent: any) => {
  const LoadableComponent = Loadable({
    loader: loadComponent,
    loading: () => null,
  });

  return <LoadableComponent />;
};
