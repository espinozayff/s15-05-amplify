import { JSX } from "react";
import MenuList from "../../common/MenuList";
import SidebarData from "../../../data/sidebarMenuData.json";
import GenresData from "../../../data/genresData.json";
import GenresSection from "../../common/GenresSection";

function Sidebar(): JSX.Element {
  return (
    <div className="hidden lg:block w-full h-full bg-[#000000] text-white mr-3">
      <MenuList {...SidebarData} />
      <GenresSection genres={GenresData} title="Géneros" />
      {/** Publicidad Opcional*/}
    </div>
  );
}

export default Sidebar;
