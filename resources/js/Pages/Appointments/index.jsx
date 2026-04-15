import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { CalendarDays, Plus, Eye, Pencil, Trash2 } from 'lucide-react';

const statusConfig = {
    pending:   { label: 'Kutilmoqda',  class: 'bg-yellow-50 text-yellow-700' },
    confirmed: { label: 'Tasdiqlangan', class: 'bg-blue-50 text-blue-700' },
    completed: { label: 'Tugallangan', class: 'bg-green-50 text-green-700' },
    cancelled: { label: 'Bekor qilingan', class: 'bg-red-50 text-red-700' },
};

export default function Index({ appointments }) {
    function destroy(id) {
        if (confirm('Qabulni o\'chirishni tasdiqlaysizmi?')) {
            router.delete(route('appointments.destroy', id));
        }
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <CalendarDays size={20} className="text-gray-600" />
                        <h2 className="text-lg font-semibold text-gray-800">Qabullar</h2>
                    </div>
                    <Link
                        href={route('appointments.create')}
                        className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm"
                    >
                        <Plus size={16} />
                        Qabul qo'shish
                    </Link>
                </div>
            }
        >
            <Head title="Qabullar" />

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-xs tracking-wider">
                    <tr>
                        <th className="px-6 py-3 text-left">#</th>
                        <th className="px-6 py-3 text-left">Bemor</th>
                        <th className="px-6 py-3 text-left">Shifokor</th>
                        <th className="px-6 py-3 text-left">Sana & Vaqt</th>
                        <th className="px-6 py-3 text-left">Status</th>
                        <th className="px-6 py-3 text-left">Amallar</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {appointments.data.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-6 py-10 text-center text-gray-400">
                                Qabullar mavjud emas
                            </td>
                        </tr>
                    ) : (
                        appointments.data.map((appointment) => (
                            <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-400">{appointment.id}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {appointment.patient.first_name} {appointment.patient.last_name}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    <div>Dr. {appointment.doctor.first_name} {appointment.doctor.last_name}</div>
                                    <div className="text-xs text-gray-400">{appointment.doctor.specialization}</div>
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {new Date(appointment.appointment_date).toLocaleString('uz-UZ', {
                                        year: 'numeric', month: '2-digit', day: '2-digit',
                                        hour: '2-digit', minute: '2-digit'
                                    })}
                                </td>
                                <td className="px-6 py-4">
                                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusConfig[appointment.status].class}`}>
                                            {statusConfig[appointment.status].label}
                                        </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <Link
                                            href={route('appointments.show', appointment.id)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <Eye size={16} />
                                        </Link>
                                        <Link
                                            href={route('appointments.edit', appointment.id)}
                                            className="text-yellow-500 hover:text-yellow-700"
                                        >
                                            <Pencil size={16} />
                                        </Link>
                                        <button
                                            onClick={() => destroy(appointment.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
