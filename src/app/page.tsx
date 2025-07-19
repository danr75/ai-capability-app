import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function Home() {
  const session = await getServerSession(authOptions);
  
  // If user is logged in, redirect to learning coach
  if (session?.user) {
    redirect('/learning-coach');
  }
  
  // Otherwise, redirect to sign in
  redirect('/auth/signin');
}
