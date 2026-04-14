import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Users, Plus, Eye, Pencil, Trash2 } from 'lucide-react';

export default function Index({ patients }) {
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
                                Bemorlar mavjud emas
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
                                        <Link
                                            href={route('patients.show', patient.id)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <Eye size={16} />
                                        </Link>
                                        <Link
                                            href={route('patients.edit', patient.id)}
                                            className="text-yellow-500 hover:text-yellow-700"
                                        >
                                            <Pencil size={16} />
                                        </Link>
                                        <button
                                            onClick={() => destroy(patient.id)}
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
