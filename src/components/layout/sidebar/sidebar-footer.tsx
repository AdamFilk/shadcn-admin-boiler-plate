import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { LogOutIcon } from 'lucide-react';

type SidebarFooterProps = {
  isOpen: boolean | undefined;
};

export default function SidebarFooter({ isOpen }: SidebarFooterProps) {
  return (
    <li className='flex w-full grow items-end'>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <Button
              onClick={() => {}}
              variant='outline'
              className='mt-5 h-10 w-full justify-center'
            >
              <span className={cn(isOpen === false ? '' : 'mr-4')}>
                <LogOutIcon />
              </span>
              <p
                className={cn(
                  'whitespace-nowrap',
                  isOpen === false ? 'hidden opacity-0' : 'opacity-100'
                )}
              >
                Sign out
              </p>
            </Button>
          </TooltipTrigger>
          {isOpen === false && (
            <TooltipContent side='right'>Sign out</TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </li>
  );
}
