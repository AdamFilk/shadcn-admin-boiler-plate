import { Avatar } from '@/components/ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';

type LoginLayoutProps = {
  children: React.ReactNode;
};

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center'>
      <h1 className='mb-3'>SKM Logo</h1>
      {children}
    </div>
  );
}
