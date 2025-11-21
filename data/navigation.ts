export interface NavItem {
  label: string;
  href: string;
}

export interface NavDropdown {
  label: string;
  items: NavItem[];
}

export const mainNavigation: (NavItem | NavDropdown)[] = [
  {
    label: 'Stay',
    href: '/stay',
  },
  {
    label: 'Relax',
    href: '/relax',
  },
  {
    label: 'Enjoy',
    href: '/dining',
  },
  {
    label: 'Discover',
    href: '/discover',
  },
];

export const villaDropdownItems: NavItem[] = [
  { label: 'Hibiscus', href: '#' },
  { label: 'Oleander', href: '#' },
  { label: 'Bougainvillea', href: '#' },
  { label: 'Frangipani', href: '#' },
  { label: 'Allamanda House', href: '#' },
  { label: 'Beach House', href: '#' },
];

export const discoverDropdownItems: NavItem[] = [
  { label: 'Scuba Diving', href: '#' },
  { label: 'Snorkeling', href: '#' },
  { label: 'Deep Sea Fishing', href: '#' },
  { label: 'Kitesurfing', href: '#' },
];

export const footerNavigation = {
  menu: mainNavigation,
  stay: villaDropdownItems,
  discover: discoverDropdownItems,
};
