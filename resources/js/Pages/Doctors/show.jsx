import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Pencil } from 'lucide-react';

export default function Show({ doctor }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Dr. {doctor.first_name} {doctor.last_name}
                    </h2>
                    <Link
                        href={route('doctors.edit', doctor.id)}
                        className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm"
                    >
                        <Pencil size={14} />
                        Tahrirlash
                    </Link>
                </div>
            }
        >
            <Head title={`Dr. ${doctor.first_name} ${doctor.last_name}`} />

            <div className="max-w-2xl mx-auto space-y-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="grid grid-cols-2 gap-6 text-sm">
                        {[
                            { label: 'Ism', value: doctor.first_name },
                            { label: 'Familiya', value: doctor.last_name },
                            { label: 'Mutaxassislik', value: doctor.specialization },
                            { label: 'Jins', value: doctor.gender === 'male' ? 'Erkak' : 'Ayol' },
                            { label: 'Telefon', value: doctor.phone },
                            { label: 'Email', value: doctor.email || '—' },
                        ].map(item => (
                            <div key={item.label}>
                                <p className="text-gray-400 mb-1">{item.label}</p>
                                <p className="font-medium text-gray-900">{item.value}</p>
                            </div>
                        ))}
                        <div className="col-span-2">
                            <p className="text-gray-400 mb-1">Bio</p>
                            <p className="font-medium text-gray-900">{doctor.bio || '—'}</p>
                        </div>
                    </div>
                </div>

                <Link href={route('doctors.index')} className="text-sm text-gray-500 hover:text-gray-700">
                    ← Ro'yxatga qaytish
                </Link>
            </div>
        </AuthenticatedLayout>
    );
}
