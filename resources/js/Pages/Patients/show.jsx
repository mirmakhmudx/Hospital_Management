import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Pencil } from 'lucide-react';

export default function Show({ patient }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {patient.first_name} {patient.last_name}
                    </h2>
                    <Link
                        href={route('patients.edit', patient.id)}
                        className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm"
                    >
                        <Pencil size={14} />
                        Tahrirlash
                    </Link>
                </div>
            }
        >
            <Head title={`${patient.first_name} ${patient.last_name}`} />

            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="grid grid-cols-2 gap-6 text-sm">
                        {[
                            { label: 'Ism', value: patient.first_name },
                            { label: 'Familiya', value: patient.last_name },
                            { label: 'Jins', value: patient.gender === 'male' ? 'Erkak' : 'Ayol' },
                            { label: "Tug'ilgan sana", value: patient.date_of_birth },
                            { label: 'Telefon', value: patient.phone },
                            { label: 'Email', value: patient.email || '—' },
                        ].map(item => (
                            <div key={item.label}>
                                <p className="text-gray-400 mb-1">{item.label}</p>
                                <p className="font-medium text-gray-900">{item.value}</p>
                            </div>
                        ))}
                        <div className="col-span-2">
                            <p className="text-gray-400 mb-1">Manzil</p>
                            <p className="font-medium text-gray-900">{patient.address || '—'}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-gray-400 mb-1">Izoh</p>
                            <p className="font-medium text-gray-900">{patient.notes || '—'}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <Link href={route('patients.index')} className="text-sm text-gray-500 hover:text-gray-700">
                        ← Ro'yxatga qaytish
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
