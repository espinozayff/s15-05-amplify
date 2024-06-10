import { JSX } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import { Player } from "../Player";
import Footer from "./Footer/Footer";

function Layout(): JSX.Element {
  return (
    <>
      <NavBar />
      <Outlet />
      <Player />
      <Footer />
    </>
  );
}

export default Layout;
