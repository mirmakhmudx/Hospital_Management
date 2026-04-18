import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router} from '@inertiajs/react';
import {ClipboardList, Plus, Eye, Pencil, Trash2, Search} from 'lucide-react';
import {useState, useCallback} from 'react';

export default function Index({records, filters}) {
    const [search, setSearch] = useState(filters.search || '');

    const doSearch = useCallback((s) => {
        router.get(route('medical-records.index'), {search: s}, {
            preserveState: true,
            replace: true,
        });
    }, []);

    function handleSearch(e) {
        const val = e.target.value;
        setSearch(val);
        doSearch(val);
    }

    function destroy(id) {
        if (confirm('Tibbiy yozuvni o\'chirishni tasdiqlaysizmi?')) {
            router.delete(route('medical-records.destroy', id));
        }
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ClipboardList size={20} className="text-gray-600"/>
                        <h2 className="text-lg font-semibold text-gray-800">Tibbiy yozuvlar</h2>
                    </div>
                    <Link
                        href={route('medical-records.create')}
                        className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm"
                    >
                        <Plus size={16}/>
                        Yozuv qo'shish
                    </Link>
                </div>
            }
        >
            <Head title="Tibbiy yozuvlar"/>

            {/* Search */}
            <div className="flex gap-3 mb-4">
                <div className="relative flex-1 max-w-md">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Bemor ismi yoki tashxis bo'yicha..."
                        className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                    <thead
                        className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-xs tracking-wider">
                    <tr>
                        <th className="px-6 py-3 text-left">#</th>
                        <th className="px-6 py-3 text-left">Bemor</th>
                        <th className="px-6 py-3 text-left">Shifokor</th>
                        <th className="px-6 py-3 text-left">Tashxis</th>
                        <th className="px-6 py-3 text-left">Sana</th>
                        <th className="px-6 py-3 text-left">Amallar</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {records.data.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-6 py-10 text-center text-gray-400">
                                Tibbiy yozuvlar topilmadi
                            </td>
                        </tr>
                    ) : (
                        records.data.map((record) => (
                            <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-400">{record.id}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {record.patient.first_name} {record.patient.last_name}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    <div>Dr. {record.doctor.first_name} {record.doctor.last_name}</div>
                                    <div className="text-xs text-gray-400">{record.doctor.specialization}</div>
                                </td>
                                <td className="px-6 py-4">
                                        <span className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full">
                                            {record.diagnosis}
                                        </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{new Date(record.record_date).toLocaleDateString('uz-UZ', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit'
                                })}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <Link href={route('medical-records.show', record.id)}
                                              className="text-blue-600 hover:text-blue-800"><Eye size={16}/></Link>
                                        <Link href={route('medical-records.edit', record.id)}
                                              className="text-yellow-500 hover:text-yellow-700"><Pencil
                                            size={16}/></Link>
                                        <button onClick={() => destroy(record.id)}
                                                className="text-red-500 hover:text-red-700"><Trash2 size={16}/></button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>

                {/* Pagination */}
                {records.last_page > 1 && (
                    <div className="flex items-center justify-between px-6 py-3 border-t border-gray-100">
                        <p className="text-sm text-gray-500">Jami {records.total} ta yozuv</p>
                        <div className="flex gap-1">
                            {records.links.map((link, i) => (
                                <button
                                    key={i}
                                    onClick={() => link.url && router.get(link.url)}
                                    disabled={!link.url}
                                    dangerouslySetInnerHTML={{__html: link.label}}
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
