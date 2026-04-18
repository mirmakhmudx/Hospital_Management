import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Users, Plus, Eye, Pencil, Trash2, Search } from 'lucide-react';
import { useState, useCallback } from 'react';
import Pagination from '@/Components/Pagination';


export default function Index({ patients, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [gender, setGender] = useState(filters.gender || '');

    const doSearch = useCallback((s, g) => {
        router.get(route('patients.index'), { search: s, gender: g }, {
            preserveState: true,
            replace: true,
        });
    }, []);

    function handleSearch(e) {
        const val = e.target.value;
        setSearch(val);
        doSearch(val, gender);
    }

    function handleGender(e) {
        const val = e.target.value;
        setGender(val);
        doSearch(search, val);
    }

    function destroy(id) {
        if (confirm('Bemorni o\'chirishni tasdiqlaysizmi?')) {
            router.delete(route('patients.destroy', id));
        }
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Users size={20} className="text-gray-600" />
                        <h2 className="text-lg font-semibold text-gray-800">Bemorlar</h2>
                    </div>
                    <Link
                        href={route('patients.create')}
                        className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm"
                    >
                        <Plus size={16} />
                        Bemor qo'shish
                    </Link>
                </div>
            }
        >
            <Head title="Bemorlar" />

            {/* Search & Filter */}
            <div className="flex gap-3 mb-4">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Ism, familiya yoki telefon..."
                        className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                </div>
                <select
                    value={gender}
                    onChange={handleGender}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                    <option value="">Barcha jins</option>
                    <option value="male">Erkak</option>
                    <option value="female">Ayol</option>
                </select>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-xs tracking-wider">
                    <tr>
                        <th className="px-6 py-3 text-left">#</th>
                        <th className="px-6 py-3 text-left">Ism Familiya</th>
                        <th className="px-6 py-3 text-left">Jins</th>
                        <th className="px-6 py-3 text-left">Tug'ilgan sana</th>
                        <th className="px-6 py-3 text-left">Telefon</th>
                        <th className="px-6 py-3 text-left">Amallar</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {patients.data.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-6 py-10 text-center text-gray-400">
                                Bemorlar topilmadi
                            </td>
                        </tr>
                    ) : (
                        patients.data.map((patient) => (
                            <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-400">{patient.id}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {patient.first_name} {patient.last_name}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {patient.gender === 'male' ? 'Erkak' : 'Ayol'}
                                </td>
                                <td className="px-6 py-4 text-gray-600">{patient.date_of_birth}</td>
                                <td className="px-6 py-4 text-gray-600">{patient.phone}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <Link href={route('patients.show', patient.id)} className="text-blue-600 hover:text-blue-800"><Eye size={16} /></Link>
                                        <Link href={route('patients.edit', patient.id)} className="text-yellow-500 hover:text-yellow-700"><Pencil size={16} /></Link>
                                        <button onClick={() => destroy(patient.id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>

                {/* Pagination */}
                {patients.last_page > 1 && (
                    <div className="flex items-center justify-between px-6 py-3 border-t border-gray-100">
                        <p className="text-sm text-gray-500">
                            Jami {patients.total} ta bemor
                        </p>
                        <div className="flex gap-1">
                            {patients.links.map((link, i) => (
                                <button
                                    key={i}
                                    onClick={() => link.url && router.get(link.url)}
                                    disabled={!link.url}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-3 py-1 rounded text-sm ${
                                        link.active
                                            ? 'bg-gray-900 text-white'
                                            : link.url
                                                ? 'text-gray-600 hover:bg-gray-100'
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
