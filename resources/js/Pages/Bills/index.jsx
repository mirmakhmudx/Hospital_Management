import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { ReceiptText, Plus, Eye, Pencil, Trash2 } from 'lucide-react';

const statusConfig = {
    unpaid:    { label: 'To\'lanmagan', class: 'bg-red-50 text-red-700' },
    paid:      { label: 'To\'langan',   class: 'bg-green-50 text-green-700' },
    cancelled: { label: 'Bekor qilingan', class: 'bg-gray-100 text-gray-500' },
};

export default function Index({ bills }) {
    function destroy(id) {
        if (confirm('Hisob-fakturani o\'chirishni tasdiqlaysizmi?')) {
            router.delete(route('bills.destroy', id));
        }
    }
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ReceiptText size={20} className="text-gray-600" />
                        <h2 className="text-lg font-semibold text-gray-800">To'lovlar</h2>
                    </div>
                    <Link
                        href={route('bills.create')}
                        className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm"
                    >
                        <Plus size={16} />
                        To'lov qo'shish
                    </Link>
                </div>
            }
        >
            <Head title="To'lovlar" />

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-xs tracking-wider">
                    <tr>
                        <th className="px-6 py-3 text-left">#</th>
                        <th className="px-6 py-3 text-left">Bemor</th>
                        <th className="px-6 py-3 text-left">Miqdor</th>
                        <th className="px-6 py-3 text-left">Status</th>
                        <th className="px-6 py-3 text-left">Muddat</th>
                        <th className="px-6 py-3 text-left">Amallar</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {bills.data.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-6 py-10 text-center text-gray-400">
                                To'lovlar mavjud emas
                            </td>
                        </tr>
                    ) : (
                        bills.data.map((bill) => (
                            <tr key={bill.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-400">{bill.id}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {bill.patient.first_name} {bill.patient.last_name}
                                </td>
                                <td className="px-6 py-4 text-gray-900 font-semibold">
                                    {Number(bill.amount).toLocaleString()} so'm
                                </td>
                                <td className="px-6 py-4">
                                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusConfig[bill.status].class}`}>
                                            {statusConfig[bill.status].label}
                                        </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {bill.due_date ?? '—'}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        {bill.status === 'unpaid' && (
                                            <Link
                                                href={route('bills.pay', bill.id)}
                                                className="text-green-600 hover:text-green-800 text-xs font-medium border border-green-200 bg-green-50 px-2 py-1 rounded-lg"
                                            >
                                                To'lash
                                            </Link>
                                        )}
                                        <Link href={route('bills.show', bill.id)} className="text-blue-600 hover:text-blue-800">
                                            <Eye size={16} />
                                        </Link>
                                        <Link href={route('bills.edit', bill.id)} className="text-yellow-500 hover:text-yellow-700">
                                            <Pencil size={16} />
                                        </Link>
                                        <button onClick={() => destroy(bill.id)} className="text-red-500 hover:text-red-700">
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
