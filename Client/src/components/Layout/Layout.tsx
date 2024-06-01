import { JSX } from "react";
import { Outlet } from "react-router-dom";
import { Player } from "../Player";

function Layout(): JSX.Element {
  return (
    <>
      <Outlet />
      <Player />
    </>
  );
}

export default Layout;
