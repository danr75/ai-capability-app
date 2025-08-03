'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useState, useRef, useEffect } from 'react';

type User = {
  id: string;
  email: string;
  name?: string | null;
};

type AppHeaderProps = {
  user: User;
};

const navItems = [
  { name: 'Learning Coach', path: '/learning-coach' },
  // TODO: Daily Feed will be added back in future release
  // { name: 'Daily Feed', path: '/daily-feed' },
  { name: 'Skill Tracker', path: '/skill-tracker' },
];

export function AppHeader({ user }: AppHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  return (
    <div className="w-full">
      {/* Top Header Bar */}
      <header className="bg-[#1a365d] text-white px-6 py-3 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">AI skills builder</h1>
          <p className="text-sm text-gray-300">Personal learning hub</p>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-3 focus:outline-none"
          >
            <div className="text-right">
              <p className="font-medium">{user.name || user.email}</p>
              <p className="text-sm text-gray-300">{user.email}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
              {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
            </div>
          </button>
          
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Navigation Menu */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="flex justify-between w-full max-w-2xl">
              {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  pathname === item.path
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
