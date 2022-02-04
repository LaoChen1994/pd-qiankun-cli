import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/base/home">Home</Link> | <Link to="/base/about">About</Link>{" "}
        | <Link to="/thanks">About</Link>
      </nav>
      <Outlet />
    </div>
  );
}
