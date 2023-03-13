export type HeaderProps = {
  navigations: Navigation[];
  session: any | null;
  path: string;
}

export interface Navigation {
  name: string;
  href: string;
  icon?: any;
}