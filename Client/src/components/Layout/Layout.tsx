import { JSX } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";

function Layout(): JSX.Element {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default Layout;
