import { JSX } from "react";
import { Outlet } from "react-router-dom";

function Layout(): JSX.Element {
  return <Outlet />;
}

export default Layout;
