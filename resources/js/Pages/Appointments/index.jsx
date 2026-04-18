import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { CalendarDays, Plus, Eye, Pencil, Trash2, Search } from 'lucide-react';
import { useState, useCallback } from 'react';

const statusConfig = {
    pending:   { label: 'Kutilmoqda',    class: 'bg-yellow-50 text-yellow-700' },
    confirmed: { label: 'Tasdiqlangan',  class: 'bg-blue-50 text-blue-700' },
    completed: { label: 'Tugallangan',   class: 'bg-green-50 text-green-700' },
    cancelled: { label: 'Bekor qilingan', class: 'bg-red-50 text-red-700' },
};

export default function Index({ appointments, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');

    const doSearch = useCallback((s, st) => {
        router.get(route('appointments.index'), { search: s, status: st }, {
            preserveState: true,
            replace: true,
        });
    }, []);

    function handleSearch(e) {
        const val = e.target.value;
        setSearch(val);
        doSearch(val, status);
    }

    function handleStatus(e) {
        const val = e.target.value;
        setStatus(val);
        doSearch(search, val);
    }

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

            {/* Search & Filter */}
            <div className="flex gap-3 mb-4">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Bemor ismi bo'yicha qidirish..."
                        className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                </div>
                <select
                    value={status}
                    onChange={handleStatus}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                    <option value="">Barcha statuslar</option>
                    <option value="pending">Kutilmoqda</option>
                    <option value="confirmed">Tasdiqlangan</option>
                    <option value="completed">Tugallangan</option>
                    <option value="cancelled">Bekor qilingan</option>
                </select>
            </div>

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
                                Qabullar topilmadi
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
                                        <Link href={route('appointments.show', appointment.id)} className="text-blue-600 hover:text-blue-800"><Eye size={16} /></Link>
                                        <Link href={route('appointments.edit', appointment.id)} className="text-yellow-500 hover:text-yellow-700"><Pencil size={16} /></Link>
                                        <button onClick={() => destroy(appointment.id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>

                {/* Pagination */}
                {appointments.last_page > 1 && (
                    <div className="flex items-center justify-between px-6 py-3 border-t border-gray-100">
                        <p className="text-sm text-gray-500">Jami {appointments.total} ta qabul</p>
                        <div className="flex gap-1">
                            {appointments.links.map((link, i) => (
                                <button
                                    key={i}
                                    onClick={() => link.url && router.get(link.url)}
                                    disabled={!link.url}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-3 py-1 rounded text-sm ${
                                        link.active ? 'bg-gray-900 text-white'
                                            : link.url ? 'text-gray-600 hover:bg-gray-100'
                                                : 'text-gray-300 cursor-not-allowed'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
