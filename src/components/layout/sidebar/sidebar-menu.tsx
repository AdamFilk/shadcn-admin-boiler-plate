'use client';

import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import getMenus from '@/lib/constants/menu-items';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarCollapsibleMenuItem } from '@/components/layout/sidebar/sidebar-collapsible-menu-item';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';

import SidebarMenuItem from './sidebar-menu-item';
import { EllipsisIcon } from 'lucide-react';

interface MenuProps {
  isOpen: boolean | undefined;
}

export function SidebarMenu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const menuList = getMenus(pathname);

  return (
    <ScrollArea className='[&>div>div[style]]:!block'>
      <nav className='mt-8 h-full w-full'>
        <ul className='flex min-h-[calc(100vh-48px-36px-16px-32px)] flex-col items-start space-y-1 px-2 lg:min-h-[calc(100vh-32px-40px-32px)]'>
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn('w-full', groupLabel ? 'pt-5' : '')} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className='max-w-[248px] truncate px-4 pb-2 text-sm font-medium text-muted-foreground'>
                  {groupLabel}
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className='w-full'>
                      <div className='flex w-full items-center justify-center'>
                        <EllipsisIcon className='h-5 w-5' />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side='right'>
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className='pb-2'></p>
              )}
              {menus.map(
                ({ href, label, icon: Icon, active, submenus }, index) =>
                  submenus.length === 0 ? (
                    <div className='w-full' key={index}>
                      <SidebarMenuItem
                        href={href}
                        icon={Icon}
                        label={label}
                        active={active}
                        isOpen={isOpen}
                        key={index}
                      />
                    </div>
                  ) : (
                    <SidebarCollapsibleMenuItem
                      icon={Icon}
                      label={label}
                      active={active}
                      submenus={submenus}
                      isOpen={isOpen}
                      key={index}
                    />
                  )
              )}
            </li>
          ))}
        </ul>
      </nav>
    </ScrollArea>
  );
}
