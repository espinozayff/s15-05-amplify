import { JSX } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import { Player } from "../Player";

function Layout(): JSX.Element {
  return (
    <>
      <NavBar />
      <Outlet />
      <Player />
    </>
  );
}

export default Layout;
