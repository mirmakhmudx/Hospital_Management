import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, Users, UserRound,CalendarDays,Stethoscope,ClipboardList,ReceiptText , BedDouble} from 'lucide-react';
import { router } from '@inertiajs/react';

function logout() {
    router.post(route('logout'));
}

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const navItems = [
        {href: route('dashboard'), label: 'Dashboard', icon: LayoutDashboard, active: route().current('dashboard')},
        {href: route('patients.index'), label: 'Bemorlar', icon: Users, active: route().current('patients.*')},
        {href: route('doctors.index'), label: 'Shifokorlar', icon: Stethoscope, active: route().current('doctors.*')},
        {href: route('appointments.index'), label: 'Qabullar', icon: CalendarDays, active: route().current('appointments.*')},
        { href: route('medical-records.index'), label: 'Tibbiy yozuvlar', icon: ClipboardList, active: route().current('medical-records.*') },
        { href: route('bills.index'),label: 'To\'lovlar',icon: ReceiptText,     active: route().current('bills.*') },
        { href: route('rooms.index'), label: 'Xonalar', icon: BedDouble, active: route().current('rooms.*') },


    ];
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
                {/* Logo */}
                <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
                    <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                        <ApplicationLogo className="block h-5 w-auto fill-current text-white"/>
                    </div>
                    <span className="font-semibold text-gray-900 text-sm">Hospital </span>
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
                                <item.icon size={18}/>
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </nav>

                {/* User */}
                <div className="px-3 py-4 border-t border-gray-100">

                    {/* USER + EMAIL CLICKABLE */}
                    <div className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100">

                        {/* LEFT: avatar + info (profile link) */}
                        <Link
                            href={route('profile.edit')}
                            className="flex items-center gap-3 flex-1 min-w-0"
                        >
                            <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold">
                                {user.name.charAt(0).toUpperCase()}
                            </div>

                            <div className="min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {user.name}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    {user.email}
                                </p>
                            </div>
                        </Link>

                        {/* RIGHT: logout icon */}
                        <button
                            onClick={logout}
                            className="ml-2 text-gray-400 hover:text-red-600"
                            title="Logout"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5"
                                />
                            </svg>
                        </button>

                    </div>

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
