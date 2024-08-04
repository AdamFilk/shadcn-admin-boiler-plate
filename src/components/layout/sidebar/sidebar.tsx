import { useStore } from 'zustand';
import SidebarHeader from './sidebar-header';
import { useSidebarToggle } from '@/hooks/ui/use-sidebar-toggle';
import { cn } from '@/lib/utils';
import { SidebarToggle } from './sidebar-toggle';
import { SidebarMenu } from './sidebar-menu';
import SidebarFooter from './sidebar-footer';

type SidebarProps = {
  className?: string;
};
export default function Sidebar({ className }: SidebarProps) {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-20 h-screen -translate-x-full transition-[width] duration-300 ease-in-out lg:translate-x-0',
        sidebar?.isOpen === false ? 'w-[90px]' : 'w-72'
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className='relative flex h-full flex-col overflow-y-auto px-3 py-4 shadow-md dark:shadow-zinc-800'>
        <SidebarHeader isOpen={sidebar?.isOpen} />
        <SidebarMenu isOpen={sidebar?.isOpen} />
        <SidebarFooter isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
}
