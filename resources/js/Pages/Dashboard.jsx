import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Users, Stethoscope, CalendarDays, BedDouble, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const statusConfig = {
    pending:   { label: 'Kutilmoqda',    class: 'bg-yellow-50 text-yellow-700', icon: Clock },
    confirmed: { label: 'Tasdiqlangan',  class: 'bg-blue-50 text-blue-700',    icon: AlertCircle },
    completed: { label: 'Tugallangan',   class: 'bg-green-50 text-green-700',  icon: CheckCircle },
    cancelled: { label: 'Bekor qilingan', class: 'bg-red-50 text-red-700',    icon: XCircle },
};

export default function Dashboard({ stats, recent_appointments, appointment_stats }) {
    const statCards = [
        {
            label: 'Jami bemorlar',
            value: stats.patients,
            icon: Users,
            color: 'bg-blue-50 text-blue-600',
            href: route('patients.index'),
        },
        {
            label: 'Jami shifokorlar',
            value: stats.doctors,
            icon: Stethoscope,
            color: 'bg-purple-50 text-purple-600',
            href: route('doctors.index'),
        },
        {
            label: 'Bugungi qabullar',
            value: stats.appointments,
            icon: CalendarDays,
            color: 'bg-green-50 text-green-600',
            href: route('appointments.index'),
        },
        {
            label: 'Bo\'sh xonalar',
            value: stats.rooms_free,
            icon: BedDouble,
            color: 'bg-orange-50 text-orange-600',
            href: route('rooms.index'),
        },
    ];

    return (
        <AuthenticatedLayout
            header={<h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="space-y-6">

                {/* Stat cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {statCards.map((card) => (
                        <Link
                            key={card.label}
                            href={card.href}
                            className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}>
                                <card.icon size={22} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                                <p className="text-sm text-gray-500">{card.label}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* So'nggi qabullar */}
                    <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                            <h3 className="font-semibold text-gray-800">So'nggi qabullar</h3>
                            <Link
                                href={route('appointments.index')}
                                className="text-xs text-blue-600 hover:underline"
                            >
                                Barchasini ko'rish
                            </Link>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {recent_appointments.length === 0 ? (
                                <p className="px-5 py-8 text-center text-gray-400 text-sm">
                                    Qabullar mavjud emas
                                </p>
                            ) : (
                                recent_appointments.map((appt) => {
                                    const status = statusConfig[appt.status];
                                    const StatusIcon = status.icon;
                                    return (
                                        <div key={appt.id} className="flex items-center justify-between px-5 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                                                    {appt.patient.first_name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {appt.patient.first_name} {appt.patient.last_name}
                                                    </p>
                                                    <p className="text-xs text-gray-400">
                                                        Dr. {appt.doctor.first_name} {appt.doctor.last_name}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <p className="text-xs text-gray-400">
                                                    {new Date(appt.appointment_date).toLocaleDateString('uz-UZ')}
                                                </p>
                                                <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium ${status.class}`}>
                                                    <StatusIcon size={11} />
                                                    {status.label}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    {/* Qabullar statistikasi */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="px-5 py-4 border-b border-gray-100">
                            <h3 className="font-semibold text-gray-800">Qabullar holati</h3>
                        </div>
                        <div className="p-5 space-y-3">
                            {Object.entries(appointment_stats).map(([key, value]) => {
                                const status = statusConfig[key];
                                const total = Object.values(appointment_stats).reduce((a, b) => a + b, 0);
                                const percent = total > 0 ? Math.round((value / total) * 100) : 0;
                                return (
                                    <div key={key}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-600">{status.label}</span>
                                            <span className="font-medium text-gray-900">{value}</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${
                                                    key === 'completed' ? 'bg-green-500' :
                                                        key === 'confirmed' ? 'bg-blue-500' :
                                                            key === 'pending'   ? 'bg-yellow-500' : 'bg-red-400'
                                                }`}
                                                style={{ width: `${percent}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
