import { GaugeCircleIcon, LayoutGrid } from 'lucide-react';
import { MenuGroup } from '../types/ui/menu-items';

export default function getMenus(pathname: string): MenuGroup[] {
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: '/dashboard',
          label: 'Dashboard',
          active: pathname ? pathname.includes('/dashboard') : false,
          icon: GaugeCircleIcon,
          submenus: [],
        },
      ],
    },
  ];
}
