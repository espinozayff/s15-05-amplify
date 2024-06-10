export interface Submenu {
  id: string;
  title: string;
  href: string;
}

export interface Menu {
  id: string;
  title: string;
  submenus: Submenu[];
}

export interface MenuProps {
  menus: Menu[];
}
