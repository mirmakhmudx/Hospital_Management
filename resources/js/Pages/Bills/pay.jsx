import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { CreditCard, Smartphone, CheckCircle } from 'lucide-react';

// Karta raqamini formatlash: 1234 5678 9012 3456
function formatCardNumber(value) {
    return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}

// Amal muddatini formatlash: 12/26
function formatExpiry(value) {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
}

export default function Pay({ bill }) {
    const [method, setMethod] = useState(null);
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardName, setCardName] = useState('');
    const [step, setStep] = useState('select'); // select | form | confirm

    const { post, processing } = useForm();

    function handleMethodSelect(m) {
        setMethod(m);
        if (m === 'card') {
            setStep('form');
        } else {
            setStep('confirm');
        }
    }

    function handleCardSubmit(e) {
        e.preventDefault();
        if (!cardNumber || !expiry || !cvv || !cardName) return;
        setStep('confirm');
    }

    function handlePay() {
        post(route('bills.pay.process', bill.id), {
            data: { payment_method: method },
        });
    }

    const methodLabels = {
        card:  'Plastik karta',
        payme: 'Payme',
        click: 'Click',
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-lg font-semibold text-gray-800">To'lovni amalga oshirish</h2>}
        >
            <Head title="To'lash" />

            <div className="max-w-lg mx-auto space-y-6">

                {/* Hisob ma'lumotlari */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Hisob ma'lumotlari</p>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-gray-900 text-lg">
                                {bill.patient.first_name} {bill.patient.last_name}
                            </p>
                            <p className="text-sm text-gray-500">{bill.description || 'Tibbiy xizmat'}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">
                                {Number(bill.amount).toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-400">so'm</p>
                        </div>
                    </div>
                </div>

                {/* 1-QADAM: To'lov usulini tanlash */}
                {step === 'select' && (
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-4">To'lov usulini tanlang</p>
                        <div className="space-y-3">

                            {/* Plastik karta */}
                            <button
                                onClick={() => handleMethodSelect('card')}
                                className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-gray-900 hover:bg-gray-50 transition-all group"
                            >
                                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded-md flex items-center justify-center">
                                    <CreditCard size={18} className="text-white" />
                                </div>
                                <div className="text-left">
                                    <p className="font-medium text-gray-900 text-sm">Plastik karta</p>
                                    <p className="text-xs text-gray-400">Visa / Mastercard / Uzcard / Humo</p>
                                </div>
                                <div className="ml-auto flex gap-1">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/800px-Visa_Inc._logo.svg.png"
                                         alt="Visa" className="h-5 object-contain" />
                                </div>
                            </button>

                            {/* Payme */}
                            <button
                                onClick={() => handleMethodSelect('payme')}
                                className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
                            >
                                <div className="w-12 h-8 bg-blue-600 rounded-md flex items-center justify-center px-1">
                                    <span className="text-white font-bold text-xs tracking-tight">Payme</span>
                                </div>
                                <div className="text-left">
                                    <p className="font-medium text-gray-900 text-sm">Payme</p>
                                    <p className="text-xs text-gray-400">Payme ilovasi orqali to'lash</p>
                                </div>
                                <div className="ml-auto">
                                    <Smartphone size={18} className="text-blue-500" />
                                </div>
                            </button>

                            {/* Click */}
                            <button
                                onClick={() => handleMethodSelect('click')}
                                className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all"
                            >
                                <div className="w-12 h-8 bg-green-500 rounded-md flex items-center justify-center px-1">
                                    <span className="text-white font-bold text-xs tracking-tight">Click</span>
                                </div>
                                <div className="text-left">
                                    <p className="font-medium text-gray-900 text-sm">Click</p>
                                    <p className="text-xs text-gray-400">Click ilovasi orqali to'lash</p>
                                </div>
                                <div className="ml-auto">
                                    <Smartphone size={18} className="text-green-500" />
                                </div>
                            </button>
                        </div>
                    </div>
                )}

                {/* 2-QADAM: Karta ma'lumotlari */}
                {step === 'form' && method === 'card' && (
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-4">Karta ma'lumotlari</p>

                        {/* Karta preview */}
                        <div className="relative w-full h-44 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl p-5 mb-6 overflow-hidden shadow-lg">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-12 translate-x-12" />
                            <div className="absolute bottom-0 left-0 w-36 h-36 bg-white/5 rounded-full translate-y-12 -translate-x-8" />
                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div className="flex justify-between items-start">
                                    <div className="w-10 h-7 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md opacity-90" />
                                    <span className="text-white/60 text-xs font-medium">BANK KARTA</span>
                                </div>
                                <div>
                                    <p className="text-white text-lg font-mono tracking-widest mb-3">
                                        {cardNumber || '•••• •••• •••• ••••'}
                                    </p>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-white/50 text-xs mb-1">KARTA EGASI</p>
                                            <p className="text-white text-sm font-medium uppercase tracking-wider">
                                                {cardName || 'FULL NAME'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-white/50 text-xs mb-1">AMAL MUDDATI</p>
                                            <p className="text-white text-sm font-mono">{expiry || 'MM/YY'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleCardSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Karta raqami</label>
                                <input
                                    type="text"
                                    value={cardNumber}
                                    onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-gray-900"
                                    placeholder="0000 0000 0000 0000"
                                    maxLength={19}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Karta egasining ismi</label>
                                <input
                                    type="text"
                                    value={cardName}
                                    onChange={e => setCardName(e.target.value.toUpperCase())}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-gray-900"
                                    placeholder="FULL NAME"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Amal muddati</label>
                                    <input
                                        type="text"
                                        value={expiry}
                                        onChange={e => setExpiry(formatExpiry(e.target.value))}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gray-900"
                                        placeholder="MM/YY"
                                        maxLength={5}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">CVV</label>
                                    <input
                                        type="password"
                                        value={cvv}
                                        onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gray-900"
                                        placeholder="•••"
                                        maxLength={3}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => { setStep('select'); setMethod(null); }}
                                    className="px-4 py-2.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 w-full"
                                >
                                    Orqaga
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2.5 text-sm bg-gray-900 hover:bg-gray-700 text-white rounded-lg w-full font-medium"
                                >
                                    Davom etish →
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* 3-QADAM: Tasdiqlash */}
                {step === 'confirm' && (
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                        <div className="text-center mb-6">
                            <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                <CheckCircle size={28} className="text-green-500" />
                            </div>
                            <p className="font-semibold text-gray-900">To'lovni tasdiqlang</p>
                            <p className="text-sm text-gray-500 mt-1">
                                {method === 'card' && `Karta orqali: ${cardNumber}`}
                                {method === 'payme' && 'Payme ilovasi orqali'}
                                {method === 'click' && 'Click ilovasi orqali'}
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm mb-6">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Bemor</span>
                                <span className="font-medium text-gray-900">
                                    {bill.patient.first_name} {bill.patient.last_name}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Xizmat</span>
                                <span className="font-medium text-gray-900">{bill.description || 'Tibbiy xizmat'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">To'lov usuli</span>
                                <span className="font-medium text-gray-900">{methodLabels[method]}</span>
                            </div>
                            <hr className="border-gray-200" />
                            <div className="flex justify-between text-base">
                                <span className="font-semibold text-gray-900">Jami</span>
                                <span className="font-bold text-gray-900">
                                    {Number(bill.amount).toLocaleString()} so'm
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    if (method === 'card') setStep('form');
                                    else setStep('select');
                                }}
                                className="px-4 py-2.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 w-full"
                            >
                                Orqaga
                            </button>
                            <button
                                onClick={handlePay}
                                disabled={processing}
                                className="px-4 py-2.5 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg w-full font-semibold disabled:opacity-50"
                            >
                                {processing ? 'Amalga oshirilmoqda...' : `✅ To'lash — ${Number(bill.amount).toLocaleString()} so'm`}
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </AuthenticatedLayout>
    );
}
