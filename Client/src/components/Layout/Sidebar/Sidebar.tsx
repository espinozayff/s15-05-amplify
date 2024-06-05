import { JSX } from "react";
import MenuList from "../../common/MenuList";
import SidebarData from "../../../data/sidebarMenuData.json";
import GenresData from "../../../data/genresData.json";
import GenresSection from "../../common/GenresSection";

function Sidebar(): JSX.Element {
  return (
    <div className="hidden lg:block w-72 h-full bg-[#121212] text-white mr-3 py-2">
      <MenuList {...SidebarData} />
      <GenresSection genres={GenresData} title="Géneros" />
      {/** Publicidad Opcional*/}
      <div className="h-24"></div>
    </div>
  );
}

export default Sidebar;
