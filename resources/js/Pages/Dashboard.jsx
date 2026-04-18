import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
    Users, Stethoscope, CalendarDays, BedDouble,
    Clock, CheckCircle, XCircle, AlertCircle, TrendingUp
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, PieChart, Pie,
    Cell, Legend
} from 'recharts';

const statusConfig = {
    pending:   { label: 'Kutilmoqda',     class: 'bg-yellow-50 text-yellow-700', icon: Clock },
    confirmed: { label: 'Tasdiqlangan',   class: 'bg-blue-50 text-blue-700',    icon: AlertCircle },
    completed: { label: 'Tugallangan',    class: 'bg-green-50 text-green-700',  icon: CheckCircle },
    cancelled: { label: 'Bekor qilingan', class: 'bg-red-50 text-red-700',      icon: XCircle },
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
            label: "Bo'sh xonalar",
            value: stats.rooms_free,
            icon: BedDouble,
            color: 'bg-orange-50 text-orange-600',
            href: route('rooms.index'),
        },
    ];

    const barData = [
        { name: 'Kutilmoqda',  value: appointment_stats.pending,   fill: '#EAB308' },
        { name: 'Tasdiqlangan', value: appointment_stats.confirmed, fill: '#3B82F6' },
        { name: 'Tugallangan', value: appointment_stats.completed,  fill: '#22C55E' },
        { name: 'Bekor',       value: appointment_stats.cancelled,  fill: '#EF4444' },
    ];

    const pieData = barData.filter(d => d.value > 0);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white border border-gray-200 rounded-lg shadow px-3 py-2 text-sm">
                    <p className="font-medium text-gray-800">{payload[0].name}</p>
                    <p className="text-gray-600">{payload[0].value} ta</p>
                </div>
            );
        }
        return null;
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2">
                    <TrendingUp size={20} className="text-gray-600" />
                    <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="space-y-6">

                {/* === STAT CARDS === */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {statCards.map((card) => (
                        <Link
                            key={card.label}
                            href={card.href}
                            className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${card.color}`}>
                                <card.icon size={22} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                                <p className="text-sm text-gray-500">{card.label}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* === CHARTS === */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Bar Chart */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                        <h3 className="font-semibold text-gray-800 mb-1">Qabullar statistikasi</h3>
                        <p className="text-xs text-gray-400 mb-4">Barcha qabullar holati bo'yicha</p>
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart data={barData} barSize={40}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: 11, fill: '#6b7280' }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{ fontSize: 11, fill: '#6b7280' }}
                                    axisLine={false}
                                    tickLine={false}
                                    allowDecimals={false}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                                    {barData.map((entry, index) => (
                                        <Cell key={index} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Pie Chart */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                        <h3 className="font-semibold text-gray-800 mb-1">Nisbat</h3>
                        <p className="text-xs text-gray-400 mb-4">Qabullar foiz ko'rinishida</p>
                        {pieData.length === 0 ? (
                            <div className="flex items-center justify-center h-52 text-gray-400 text-sm">
                                Ma'lumot yo'q
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height={220}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        innerRadius={40}
                                        paddingAngle={3}
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={index} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend
                                        formatter={(value) => (
                                            <span className="text-xs text-gray-600">{value}</span>
                                        )}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

                {/* === BOTTOM ROW === */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* So'nggi qabullar */}
                    <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                            <h3 className="font-semibold text-gray-800">So'nggi qabullar</h3>
                            <Link
                                href={route('appointments.index')}
                                className="text-xs text-blue-600 hover:underline"
                            >
                                Barchasini ko'rish →
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
                                        <div key={appt.id} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600 flex-shrink-0">
                                                    {appt.patient.first_name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {appt.patient.first_name} {appt.patient.last_name}
                                                    </p>
                                                    <p className="text-xs text-gray-400">
                                                        Dr. {appt.doctor.first_name} {appt.doctor.last_name} · {appt.doctor.specialization}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 flex-shrink-0">
                                                <p className="text-xs text-gray-400">
                                                    {new Date(appt.appointment_date).toLocaleDateString('uz-UZ', {
                                                        day: '2-digit', month: '2-digit', year: 'numeric'
                                                    })}
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

                    {/* Qabullar holati progress */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="px-5 py-4 border-b border-gray-100">
                            <h3 className="font-semibold text-gray-800">Holat bo'yicha</h3>
                        </div>
                        <div className="p-5 space-y-4">
                            {Object.entries(appointment_stats).map(([key, value]) => {
                                const status = statusConfig[key];
                                const total = Object.values(appointment_stats).reduce((a, b) => a + b, 0);
                                const percent = total > 0 ? Math.round((value / total) * 100) : 0;
                                return (
                                    <div key={key}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-600">{status.label}</span>
                                            <span className="font-medium text-gray-900">
                                                {value} <span className="text-gray-400 text-xs">({percent}%)</span>
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full transition-all ${
                                                    key === 'completed' ? 'bg-green-500' :
                                                        key === 'confirmed' ? 'bg-blue-500' :
                                                            key === 'pending'   ? 'bg-yellow-500' :
                                                                'bg-red-400'
                                                }`}
                                                style={{ width: `${percent}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Jami */}
                            <div className="pt-3 border-t border-gray-100">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Jami qabullar</span>
                                    <span className="font-bold text-gray-900">
                                        {Object.values(appointment_stats).reduce((a, b) => a + b, 0)} ta
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
