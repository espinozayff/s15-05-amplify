export interface Submenu {
  title: string;
  href: string;
}

export interface Menu {
  title: string;
  submenus: Submenu[];
}

export interface MenuProps {
  menus: Menu[];
}
