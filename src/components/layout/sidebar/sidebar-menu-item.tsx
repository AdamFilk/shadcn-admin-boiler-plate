import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@radix-ui/react-tooltip';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SidebarMenuItemProps = {
  isOpen: boolean | undefined;
  active: boolean;
  label: string;
  href: string;
  icon: LucideIcon;
};
export default function SidebarMenuItem({
  isOpen,
  active,
  label,
  href,
  icon: Icon,
}: SidebarMenuItemProps) {
  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            variant={active ? 'secondary' : 'ghost'}
            className='mb-1 h-10 w-full justify-start'
            asChild
          >
            <Link href={href}>
              <span className={cn(isOpen === false ? '' : 'mr-4')}>
                <Icon />
              </span>
              <p
                className={cn(
                  'max-w-[200px] truncate',
                  isOpen === false
                    ? '-translate-x-96 opacity-0'
                    : 'translate-x-0 opacity-100'
                )}
              >
                {label}
              </p>
            </Link>
          </Button>
        </TooltipTrigger>
        {isOpen === false && (
          <TooltipContent side='right'>{label}</TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
