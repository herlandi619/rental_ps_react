<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Transaksi</title>

    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
        } 

        .header {
            border-bottom: 3px solid #000;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }

        .title {
            font-size: 18px;
            font-weight: bold;
        }

        .subtitle {
            font-size: 12px;
        }

        img {
            display: block;
        }

        table {
            width:100%;
            border-collapse: collapse;
            margin-top:20px;
        }

        th,td {
            border:1px solid #ccc;
            padding:8px;
            text-align:center;
        }

        th {
            background:#eee;
        }

        .total {
            margin-top:20px;
            text-align:right;
            font-size:14px;
            font-weight:bold;
        }
    </style>
</head>
<body>

<!-- 🔥 HEADER / KOP -->
<div class="header">
    <table width="100%">
        <tr>
            <!-- LOGO -->
            <td width="15%">
                <img src="{{ public_path('ps.png') }}" width="70">
            </td>

            <!-- IDENTITAS -->
            <td width="55%">
                <div class="title">PLAYSTATION RENTAL</div>
                <div class="subtitle">Sistem Rental PS Berbasis Web</div>
                <div class="subtitle">Jl. Gaming No. 1, Indonesia</div>
                <div class="subtitle">Telp: 0812-xxxx-xxxx</div>
            </td>

            <!-- INFO LAPORAN -->
            <td width="30%" style="text-align:right">
                <b>LAPORAN TRANSAKSI</b><br>
                Periode:<br>
                {{ \Carbon\Carbon::parse($start)->format('d M Y') }}
                -
                {{ \Carbon\Carbon::parse($end)->format('d M Y') }}
            </td>
        </tr>
    </table>
</div>

<h3 style="text-align:center">DATA TRANSAKSI</h3>

<table>
    <thead>
        <tr>
            <th>User</th>
            <th>Jenis PS</th>
            <th>Tanggal</th>
            <th>Durasi Main</th>
            <th>Pembayaran</th>
            <th>Total</th>
        </tr>
    </thead>
    <tbody>
        @foreach($transactions as $trx)

        {{-- @php
    $mulai = \Carbon\Carbon::parse($trx->booking->jam_mulai);
    $selesai = \Carbon\Carbon::parse($trx->booking->jam_selesai);

    // hitung selisih menit dulu
    $menit = $mulai->diffInMinutes($selesai);

    // konversi ke jam & bulatkan ke atas
    $durasi = ceil($menit / 60);
@endphp --}}

        @php
$mulai = \Carbon\Carbon::parse(
    $trx->booking->tanggal.' '.$trx->booking->jam_mulai
);

$selesai = \Carbon\Carbon::parse(
    $trx->booking->tanggal.' '.$trx->booking->jam_selesai
);

// 🔥 HANDLE LEWAT TENGAH MALAM
if ($selesai->lessThan($mulai)) {
    $selesai->addDay();
}

$menit  = $mulai->diffInMinutes($selesai);
$durasi = ceil($menit / 60);
@endphp


        <tr>
            <td>
                {!! $trx->booking->user ? $trx->booking->user->name : $trx->booking->nama_user !!}
            </td>

            <td>{{ $trx->booking->psUnit->jenis_ps }}</td>

            <td>{{ \Carbon\Carbon::parse($trx->booking->tanggal)->format('d-m-Y') }}</td>

            <td>{{ $durasi }} Jam</td>

            <td>{{ strtoupper($trx->metode_pembayaran) }}</td>

            <td>Rp {{ number_format($trx->total_harga,0,',','.') }}</td>
        </tr>
        @endforeach
        </tbody>
</table>
 
<div class="total">
    Total Pendapatan : Rp {{ number_format($total,0,',','.') }}
</div>

</body>
</html>