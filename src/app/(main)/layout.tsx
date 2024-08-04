import AdminPanelLayout from '@/components/layout/master';

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
