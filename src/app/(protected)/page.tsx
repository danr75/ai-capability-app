import { redirect } from 'next/navigation';

export default function ProtectedPage() {
  // Redirect to the learning coach page by default
  redirect('/learning-coach');
  
  // This return is needed to satisfy TypeScript, but the redirect will happen before this renders
  return null;
}
