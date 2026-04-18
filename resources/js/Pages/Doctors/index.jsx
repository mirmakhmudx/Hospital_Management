import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Stethoscope, Plus, Eye, Pencil, Trash2, Search } from 'lucide-react';
import { useState, useCallback } from 'react';

export default function Index({ doctors, filters, specializations }) {
    const [search, setSearch] = useState(filters.search || '');
    const [specialization, setSpecialization] = useState(filters.specialization || '');

    const doSearch = useCallback((s, sp) => {
        router.get(route('doctors.index'), { search: s, specialization: sp }, {
            preserveState: true,
            replace: true,
        });
    }, []);

    function handleSearch(e) {
        const val = e.target.value;
        setSearch(val);
        doSearch(val, specialization);
    }

    function handleSpecialization(e) {
        const val = e.target.value;
        setSpecialization(val);
        doSearch(search, val);
    }

    function destroy(id) {
        if (confirm('Shifokorni o\'chirishni tasdiqlaysizmi?')) {
            router.delete(route('doctors.destroy', id));
        }
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Stethoscope size={20} className="text-gray-600" />
                        <h2 className="text-lg font-semibold text-gray-800">Shifokorlar</h2>
                    </div>
                    <Link
                        href={route('doctors.create')}
                        className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm"
                    >
                        <Plus size={16} />
                        Shifokor qo'shish
                    </Link>
                </div>
            }
        >
            <Head title="Shifokorlar" />

            {/* Search & Filter */}
            <div className="flex gap-3 mb-4">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Ism, familiya yoki mutaxassislik..."
                        className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                </div>
                <select
                    value={specialization}
                    onChange={handleSpecialization}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                    <option value="">Barcha mutaxassislik</option>
                    {specializations.map(s => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-xs tracking-wider">
                    <tr>
                        <th className="px-6 py-3 text-left">#</th>
                        <th className="px-6 py-3 text-left">Ism Familiya</th>
                        <th className="px-6 py-3 text-left">Mutaxassislik</th>
                        <th className="px-6 py-3 text-left">Jins</th>
                        <th className="px-6 py-3 text-left">Telefon</th>
                        <th className="px-6 py-3 text-left">Amallar</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {doctors.data.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-6 py-10 text-center text-gray-400">
                                Shifokorlar topilmadi
                            </td>
                        </tr>
                    ) : (
                        doctors.data.map((doctor) => (
                            <tr key={doctor.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-400">{doctor.id}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {doctor.first_name} {doctor.last_name}
                                </td>
                                <td className="px-6 py-4">
                                        <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                                            {doctor.specialization}
                                        </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {doctor.gender === 'male' ? 'Erkak' : 'Ayol'}
                                </td>
                                <td className="px-6 py-4 text-gray-600">{doctor.phone}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <Link href={route('doctors.show', doctor.id)} className="text-blue-600 hover:text-blue-800"><Eye size={16} /></Link>
                                        <Link href={route('doctors.edit', doctor.id)} className="text-yellow-500 hover:text-yellow-700"><Pencil size={16} /></Link>
                                        <button onClick={() => destroy(doctor.id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>

                {/* Pagination */}
                {doctors.last_page > 1 && (
                    <div className="flex items-center justify-between px-6 py-3 border-t border-gray-100">
                        <p className="text-sm text-gray-500">Jami {doctors.total} ta shifokor</p>
                        <div className="flex gap-1">
                            {doctors.links.map((link, i) => (
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
