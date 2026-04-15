import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Stethoscope, Plus, Eye, Pencil, Trash2 } from 'lucide-react';
// 1. Pagination komponentini import qilamiz
import Pagination from '@/Components/Pagination';

export default function Index({ doctors }) {
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
                        className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition"
                    >
                        <Plus size={16} />
                        Shifokor qo'shish
                    </Link>
                </div>
            }
        >
            <Head title="Shifokorlar" />

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-xs tracking-wider font-bold">
                    <tr>
                        <th className="px-6 py-3 text-left">#</th>
                        <th className="px-6 py-3 text-left">Ism Familiya</th>
                        <th className="px-6 py-3 text-left">Mutaxassislik</th>
                        <th className="px-6 py-3 text-left">Jins</th>
                        <th className="px-6 py-3 text-left">Telefon</th>
                        <th className="px-6 py-3 text-left">Status</th> {/* Status sarlavhasi */}
                        <th className="px-6 py-3 text-right">Amallar</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {doctors.data.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="px-6 py-10 text-center text-gray-400">
                                Shifokorlar mavjud emas
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
                                        <span className="bg-blue-50 text-blue-700 text-[11px] px-2 py-1 rounded-full font-medium">
                                            {doctor.specialization}
                                        </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {doctor.gender === 'male' ? 'Erkak' : 'Ayol'}
                                </td>
                                <td className="px-6 py-4 text-gray-600">{doctor.phone}</td>

                                {/* Status Badge qismi */}
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight border ${
                                        doctor.status === 'active'
                                            ? 'bg-green-50 text-green-700 border-green-100'
                                            : 'bg-red-50 text-red-700 border-red-100'
                                    }`}>
                                        {doctor.status === 'active' ? 'Faol' : 'Nofaol'}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        <Link
                                            href={route('doctors.show', doctor.id)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <Eye size={16} />
                                        </Link>
                                        <Link
                                            href={route('doctors.edit', doctor.id)}
                                            className="text-yellow-500 hover:text-yellow-700"
                                        >
                                            <Pencil size={16} />
                                        </Link>
                                        <button
                                            onClick={() => destroy(doctor.id)}
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

            <div className="mt-2">
                <Pagination links={doctors.links} />
            </div>

        </AuthenticatedLayout>
    );
}
