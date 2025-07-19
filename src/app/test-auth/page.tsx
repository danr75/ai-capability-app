import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function TestAuthPage() {
  const session = await getServerSession(authOptions);
  
  // If not authenticated, redirect to sign in
  if (!session?.user) {
    redirect('/auth/signin?callbackUrl=/test-auth');
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Authentication Test</h1>
        
        <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded">
          <h2 className="text-lg font-semibold text-green-800 mb-2">✅ Authentication Successful</h2>
          <p className="text-green-700">You are logged in and can view this protected page.</p>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded border">
            <h3 className="font-medium text-gray-900 mb-2">Session Information</h3>
            <pre className="text-sm bg-black/5 p-4 rounded overflow-x-auto">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-100 rounded">
            <h3 className="font-medium text-blue-800 mb-2">Next Steps</h3>
            <ul className="list-disc list-inside space-y-1 text-blue-700">
              <li>Check if the header and navigation are visible</li>
              <li>Verify the user information is displayed correctly</li>
              <li>Test navigation between protected routes</li>
              <li>Try refreshing the page to ensure session persistence</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
