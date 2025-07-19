import { AppLayout } from '@/components/layout/AppLayout';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  
  // If no session, redirect to sign in with callback URL
  if (!session?.user) {
    const callbackUrl = encodeURIComponent('/learning-coach');
    redirect(`/auth/signin?callbackUrl=${callbackUrl}`);
  }

  // If user is authenticated, render the protected layout
  return (
    <AppLayout user={session.user}>
      {children}
    </AppLayout>
  );
}
