import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PanelsTopLeft } from 'lucide-react';
import Link from 'next/link';

type SidebarHeaderProps = {
  isOpen: boolean | undefined;
};
export default function SidebarHeader({ isOpen }: SidebarHeaderProps) {
  return (
    <Button
      className={cn(
        'mb-1 transition-transform duration-300 ease-in-out',
        isOpen === false ? 'translate-x-1' : 'translate-x-0'
      )}
      variant='link'
      asChild
    >
      <Link href='/dashboard' className='flex items-center gap-2'>
        <PanelsTopLeft className='mr-1 h-6 w-6' />
        <h1
          className={cn(
            'whitespace-nowrap text-lg font-bold transition-[transform,opacity,display] duration-300 ease-in-out',
            isOpen === false
              ? 'hidden -translate-x-96 opacity-0'
              : 'translate-x-0 opacity-100'
          )}
        >
          Brand
        </h1>
      </Link>
    </Button>
  );
}
