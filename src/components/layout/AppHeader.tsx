import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Learning Coach', path: '/learning-coach' },
  { name: 'Daily Feed', path: '/daily-feed' },
  { name: 'Skill Tracker', path: '/skill-tracker' },
];

export function AppHeader() {
  const pathname = usePathname();

  return (
    <div className="w-full">
      {/* Top Header Bar */}
      <header className="bg-[#1a365d] text-white px-6 py-3 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">AI skills builder</h1>
          <p className="text-sm text-gray-300">Personal learning hub</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="font-medium">John Director</p>
            <p className="text-sm text-gray-300">Chief Digital Officer</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            JD
          </div>
        </div>
      </header>

      {/* Navigation Menu */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
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
      </nav>
    </div>
  );
}
