<!DOCTYPE html>
<html lang="uz">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: DejaVu Sans, sans-serif; font-size: 13px; color: #1a1a1a; }
        .header { text-align: center; border-bottom: 2px solid #1a1a1a; padding-bottom: 12px; margin-bottom: 20px; }
        .header h1 { font-size: 20px; margin: 0; }
        .header p { margin: 4px 0; color: #555; }
        .section { margin-bottom: 16px; }
        .section h3 { font-size: 13px; color: #555; margin-bottom: 4px; border-bottom: 1px solid #eee; padding-bottom: 4px; }
        .section p { margin: 4px 0; }
        .grid { display: flex; gap: 40px; }
        .grid .col { flex: 1; }
        .badge { display: inline-block; background: #f3f0ff; color: #5b21b6; padding: 2px 10px; border-radius: 20px; font-size: 12px; }
        .footer { margin-top: 40px; text-align: right; font-size: 11px; color: #999; }
    </style>
</head>
<body>
<div class="header">
    <h1>🏥 Hospital Management</h1>
    <p>Tibbiy yozuv — #{{ $record->id }}</p>
</div>

<div class="grid">
    <div class="col">
        <div class="section">
            <h3>Bemor</h3>
            <p><strong>{{ $record->patient->first_name }} {{ $record->patient->last_name }}</strong></p>
            <p>Telefon: {{ $record->patient->phone }}</p>
        </div>
    </div>
    <div class="col">
        <div class="section">
            <h3>Shifokor</h3>
            <p><strong>Dr. {{ $record->doctor->first_name }} {{ $record->doctor->last_name }}</strong></p>
            <p>{{ $record->doctor->specialization }}</p>
        </div>
    </div>
</div>

<div class="section">
    <h3>Tashxis</h3>
    <p class="badge">{{ $record->diagnosis }}</p>
</div>

<div class="section">
    <h3>Retsept</h3>
    <p>{{ $record->prescription ?? '—' }}</p>
</div>

<div class="section">
    <h3>Davolash</h3>
    <p>{{ $record->treatment ?? '—' }}</p>
</div>

<div class="section">
    <h3>Izoh</h3>
    <p>{{ $record->notes ?? '—' }}</p>
</div>

<div class="footer">
    Sana: {{ $record->record_date }} | Chop etildi: {{ now()->format('d.m.Y H:i') }}
</div>
</body>
</html>
