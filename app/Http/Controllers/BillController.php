<?php
namespace App\Http\Controllers;
use App\Http\Requests\AppointmentRequest;
use App\Http\Requests\BillRequest;
use App\Http\Requests\BillUpdateRequest;
use App\Http\Requests\PaymentProgressRequest;
use App\Models\Appointment;
use App\Models\Bill;
use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;


class BillController extends Controller
{
    public function index()
    {
        $bills = Bill::with(['patient', 'appointment'])->latest()->paginate(10);

        return Inertia::render('Bills/index', [
            'bills' => $bills,
        ]);
    }

    public function create()
    {
        return Inertia::render('Bills/create', [
            'patients'     => Patient::select('id', 'first_name', 'last_name')->get(),
            'appointments' => Appointment::with('patient')
                ->whereIn('status', ['confirmed', 'completed'])->get(),
        ]);
    }

    public function store(BillRequest $request)
    {
        Bill::create($request->validated());
        return redirect()->route('bills.index')->with('success', 'Hisob-faktura muvaffaqiyatli qo\'shildi!');
    }

    public function show(Bill $bill)
    {
        $bill->load(['patient', 'appointment']);
        return Inertia::render('Bills/show', ['bill' => $bill]);
    }

    public function edit(Bill $bill)
    {
        return Inertia::render('Bills/edit', [
            'bill' => $bill->load(['patient', 'appointment']),
            'patients' => Patient::select('id', 'first_name', 'last_name')->get(),
            'appointments' => Appointment::with('patient')->whereIn('status', ['confirmed', 'completed'])->get(),
        ]);
    }

    public function update(BillUpdateRequest $request, Bill $bill)
    {
        $bill->update($request->validated());
        return redirect()->route('bills.index')->with('success', 'Hisob-faktura yangilandi!');
    }

    public function destroy(Bill $bill)
    {
        $bill->delete();
        return redirect()->route('bills.index')->with('success', 'Hisob-faktura o\'chirildi!');
    }

    public function pay(Bill $bill)
    {
        if ($bill->status === 'paid') {
            return redirect()->route('bills.show', $bill->id)
                ->with('info', 'Bu hisob allaqachon to\'langan.');
        }

        $bill->load('patient');

        return Inertia::render('Bills/pay', [
            'bill' => $bill,
        ]);
    }

    public function processPayment(Request $request, Bill $bill)
    {
        $request->validate([
            'payment_method' => 'required|in:card,payme,click',
        ]);

        $bill->update([
            'status' => 'paid',
            'payment_method' => $request->payment_method,
            'paid_date' => now()->toDateString(),
        ]);

        return redirect()->route('bills.show', $bill->id)
            ->with('success', 'To\'lov muvaffaqiyatli amalga oshirildi! ✅');
    }
}
