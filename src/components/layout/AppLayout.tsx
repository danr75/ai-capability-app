import { ReactNode } from 'react';
import { AppHeader } from './AppHeader';

type User = {
  id: string;
  email: string;
  name?: string | null;
};

type AppLayoutProps = {
  children: ReactNode;
  user: User;
};

export function AppLayout({ children, user }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader user={user} />
      <main className="py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
