'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  CalendarDays,
  Compass,
  Heart,
  ShoppingCart,
  Package,
  Settings,
  BarChart3,
  ChefHat,
} from 'lucide-react';
import { users } from '@/data/users';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/today', label: 'Today', icon: CalendarDays },
  { href: '/weekly', label: 'Weekly', icon: CalendarDays },
  { href: '/discover', label: 'Discover', icon: Compass },
  { href: '/ideas', label: 'Ideas', icon: Heart },
  { href: '/shopping', label: 'Shopping', icon: ShoppingCart },
  { href: '/pantry', label: 'Pantry', icon: Package },
  { href: '/insights', label: 'Insights', icon: BarChart3 },
  { href: '/preferences', label: 'Preferences', icon: Settings },
];

const mobileNavItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/today', label: 'Today', icon: CalendarDays },
  { href: '/discover', label: 'Discover', icon: Compass },
  { href: '/ideas', label: 'Ideas', icon: Heart },
  { href: '/shopping', label: 'Shop', icon: ShoppingCart },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-60 bg-white border-r border-gray-100 z-40">
        <div className="flex items-center gap-3 px-5 py-6 border-b border-gray-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-herb text-white">
            <ChefHat size={20} />
          </div>
          <div>
            <span className="text-lg font-black text-ink">TableTwo</span>
            <p className="text-xs text-gray-400">Private kitchen OS</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-herb text-white'
                    : 'text-gray-600 hover:bg-cream hover:text-ink'
                }`}
              >
                <Icon size={17} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-100 px-5 py-4">
          <div className="flex items-center gap-2">
            {users.map(u => (
              <div
                key={u.id}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-cream text-lg ring-2 ring-white"
                title={u.name}
              >
                {u.avatar}
              </div>
            ))}
            <div className="ml-1 text-xs">
              <div className="font-semibold text-ink">{users[0].name} & {users[1].name}</div>
              <div className="text-gray-400">Household</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-100 z-40 flex safe-area-pb">
        {mobileNavItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-1 flex-col items-center gap-1 py-3 text-xs font-semibold transition-colors ${
                isActive ? 'text-herb' : 'text-gray-400'
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Mobile top bar */}
      <header className="lg:hidden fixed inset-x-0 top-0 bg-white/90 backdrop-blur-sm border-b border-gray-100 z-40 flex items-center gap-3 px-4 h-14">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-herb text-white">
          <ChefHat size={16} />
        </div>
        <span className="text-base font-black text-ink">TableTwo</span>
        <div className="ml-auto flex gap-1.5">
          {users.map(u => (
            <div key={u.id} className="flex h-8 w-8 items-center justify-center rounded-full bg-cream text-sm">
              {u.avatar}
            </div>
          ))}
        </div>
      </header>
    </>
  );
}
