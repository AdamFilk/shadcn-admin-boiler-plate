import { GaugeCircleIcon, UserIcon } from 'lucide-react';
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
        {
          href: '/users',
          label: 'Users',
          active: pathname ? pathname.includes('/users') : false,
          icon: UserIcon,
          submenus: [],
        },
      ],
    },
  ];
}
