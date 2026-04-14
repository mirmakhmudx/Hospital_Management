import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, Users, UserRound } from 'lucide-react';


export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const navItems = [
        { href: route('dashboard'), label: 'Dashboard', icon: LayoutDashboard, active: route().current('dashboard') },
        { href: route('patients.index'), label: 'Bemorlar', icon: Users, active: route().current('patients.*') },
    ];
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
                {/* Logo */}
                <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
                    <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                        <ApplicationLogo className="block h-5 w-auto fill-current text-white" />
                    </div>
                    <span className="font-semibold text-gray-900 text-sm">Laravel Starter Kit</span>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">
                        Platform
                    </p>
                    <div className="flex flex-col gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                                    item.active
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                            >
                                <item.icon size={18} />
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </nav>

                {/* User */}
                <div className="px-3 py-4 border-t border-gray-100">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-150">
                                <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                Log Out
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col">
                {header && (
                    <header className="bg-white border-b border-gray-200 px-8 py-4">
                        {header}
                    </header>
                )}
                <main className="flex-1 p-8">{children}</main>
            </div>
        </div>
    );
}
