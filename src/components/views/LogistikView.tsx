import React, { useState } from 'react';
import { 
  Truck, 
  Search, 
  AlertCircle, 
  CheckCircle, 
  Wrench, 
  ShieldAlert, 
  Database,
  Fuel,
  Package,
  Layers,
  Building,
  BarChart as BarChartIcon,
  PlusCircle,
  Clock,
  Sprout,
  Shield,
  Crosshair,
  Radio,
  Car
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { 
  mockMaterialAssets, 
  mockExecutiveData,
  mockKetahananPangan,
  mockAlkapsusPertanian,
  mockSenjataMunisi,
  mockAlkapsatAlkomKendaraan
} from '../../data/mockData';
import { TacticalGauge } from '../common/TacticalGauge';

interface LogistikViewProps {
  activeSubmenu?: string;
}

export const LogistikView: React.FC<LogistikViewProps> = ({
  activeSubmenu = 'log_overview'
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [kategoriFilter, setKategoriFilter] = useState('ALL');

  const logCategoryData = [
    { kategori: 'Senjata ARQ 160', baik: 649, rusakRingan: 0, rusakBerat: 0 },
    { kategori: 'Pistol G2 Combat', baik: 22, rusakRingan: 0, rusakBerat: 0 },
    { kategori: 'Ranmor Taktis', baik: 39, rusakRingan: 3, rusakBerat: 0 },
    { kategori: 'Alkapsus Tani', baik: 114, rusakRingan: 0, rusakBerat: 0 },
    { kategori: 'Alkap Kes', baik: 162, rusakRingan: 0, rusakBerat: 0 },
    { kategori: 'Alkapsat', baik: 1002, rusakRingan: 0, rusakBerat: 0 },
  ];

  const filteredAssets = mockMaterialAssets.filter(item => {
    const matchesSearch = item.namaBarang.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.kodeInventaris.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesKategori = kategoriFilter === 'ALL' || item.kategori === kategoriFilter;
    return matchesSearch && matchesKategori;
  });

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-1">
            <Truck className="w-4 h-4 text-emerald-400" />
            <span>Staf 4 Logistik • Material Readiness & Supply Chain</span>
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-slate-100 uppercase tracking-wide">
            LOGISTICS & MATERIAL READINESS YONIF TP 897
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Pengelolaan Inventaris Senjata/Munisi, Kendaraan Taktis, Ketahanan Pangan, Alkapsus Pertanian & Perlengkapan Satuan.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-mono px-3 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
            MATERIAL READINESS: {mockExecutiveData.logisticsPercent}%
          </span>
        </div>
      </div>

      {/* 1. DASHBOARD LOGISTIK */}
      {activeSubmenu === 'log_overview' && (
        <div className="space-y-6">
          {/* Tactical Gauges for Logistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <TacticalGauge 
              title="Senjata ARQ 160 Ready" 
              subtitle="649 Pucuk Nyata Ready"
              value={100.0}
              targetValue={90}
              color="emerald"
              statusLabel="SANGAT BAIK"
            />
            <TacticalGauge 
              title="Munisi 5.56mm Ready" 
              subtitle="535.390 Butir Nyata"
              value={94.4}
              targetValue={90}
              color="blue"
              statusLabel="AMAN"
            />
            <TacticalGauge 
              title="Alkapsus Pertanian" 
              subtitle="114 Unit Ready Pakai"
              value={100.0}
              targetValue={85}
              color="purple"
              statusLabel="OPTIMAL"
            />
            <TacticalGauge 
              title="Ketahanan Pangan" 
              subtitle="Lahan 8 Ha & 321 Ekor"
              value={100.0}
              targetValue={80}
              color="amber"
              statusLabel="PROSES PENANAMAN"
            />
          </div>

          {/* Diagram Batang: Kelayakan Materiil Per Kategori */}
          <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-3 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 font-mono">
              <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wide flex items-center gap-2">
                <BarChartIcon className="w-4 h-4 text-emerald-400" />
                <span>DIAGRAM BATANG: INVENTARIS MATERIIL UTAMA YONIF TP 897</span>
              </h2>
              <span className="text-[10px] text-slate-400">Unit / Buah / Pucuk</span>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={logCategoryData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="kategori" stroke="#94a3b8" fontSize={10} />
                  <YAxis stroke="#94a3b8" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '6px', fontSize: '11px', color: '#f8fafc' }} 
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="baik" fill="#10b981" radius={[3, 3, 0, 0]} name="Kondisi Baik / Nyata" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* SECTION 1: KETAHANAN PANGAN (SLIDE 1 LAPSAT) */}
          <div className="p-5 bg-slate-900 rounded-xl border border-emerald-600/40 space-y-4 font-mono text-xs">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-extrabold text-emerald-400 uppercase tracking-wide flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-emerald-400" />
                  <span>KETAHANAN PANGAN - PERTANIAN & PETERNAKAN (SLIDE 1 LAPSAT)</span>
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">Program Pembinaan Ketahanan Pangan Organik Batalyon Infanteri TP 897</p>
              </div>
              <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded font-bold">TOTAL LAHAN: 8 HA</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tabel Pertanian */}
              <div className="space-y-2">
                <h3 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] text-emerald-300">1. SEKTOR PERTANIAN</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                        <th className="p-2">NO</th>
                        <th className="p-2">JENIS TANAMAN</th>
                        <th className="p-2 text-center">LUAS</th>
                        <th className="p-2 text-center">% PANEN</th>
                        <th className="p-2 text-right">PROGRES</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300 text-[11px]">
                      {mockKetahananPangan.pertanian.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-950/50">
                          <td className="p-2 text-slate-500 font-bold">{idx + 1}</td>
                          <td className="p-2 font-bold text-slate-100">{item.jenisTanaman}</td>
                          <td className="p-2 text-center font-bold text-emerald-400">{item.luasHa} Ha</td>
                          <td className="p-2 text-center text-amber-400 font-bold">{item.persentasePanen}</td>
                          <td className="p-2 text-right text-slate-300">{item.progres}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tabel Peternakan */}
              <div className="space-y-2">
                <h3 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] text-amber-300">2. SEKTOR PETERNAKAN</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                        <th className="p-2">NO</th>
                        <th className="p-2">JENIS HEWAN</th>
                        <th className="p-2 text-center">JUMLAH EKOR</th>
                        <th className="p-2 text-center">PERSENTASE</th>
                        <th className="p-2 text-right">PROGRES</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300 text-[11px]">
                      {mockKetahananPangan.peternakan.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-950/50">
                          <td className="p-2 text-slate-500 font-bold">{item.no}</td>
                          <td className="p-2 font-bold text-slate-100">{item.jenisHewan}</td>
                          <td className="p-2 text-center font-bold text-amber-400">{item.jumlahEkor} Ekor</td>
                          <td className="p-2 text-center text-emerald-400 font-bold">{item.persentase}</td>
                          <td className="p-2 text-right text-slate-300">{item.progres}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: SENJATA & MUNISI (SLIDE 10 LAPSAT) */}
          <div className="p-5 bg-slate-900 rounded-xl border border-blue-600/40 space-y-4 font-mono text-xs">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-extrabold text-blue-400 uppercase tracking-wide flex items-center gap-2">
                  <Crosshair className="w-5 h-5 text-blue-400" />
                  <span>PEMBINAAN MATERIIL: SENJATA & MUNISI (SLIDE 10 LAPSAT)</span>
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">Perbandingan Tabel TOP vs Nyata Senjata, Magazen, Optik & Amunisi Cadangan</p>
              </div>
              <span className="px-3 py-1 bg-blue-950 text-blue-300 border border-blue-800 rounded font-bold">SENJATA ARQ 160: 649 PUCUK</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Senjata Table */}
              <div className="lg:col-span-2 space-y-2">
                <h3 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] text-blue-300">1. INVENTARIS SENJATA & OPTIK</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                        <th className="p-2 text-center">NO</th>
                        <th className="p-2">NAMA MATERIIL SENJATA</th>
                        <th className="p-2 text-center">TOP</th>
                        <th className="p-2 text-center">NYATA</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300 text-[11px]">
                      {mockSenjataMunisi.senjata.map((item) => (
                        <tr key={item.no} className="hover:bg-slate-950/50">
                          <td className="p-2 text-center text-slate-500 font-bold">{item.no}</td>
                          <td className="p-2 font-bold text-slate-100">{item.nama}</td>
                          <td className="p-2 text-center text-slate-400">{item.top > 0 ? item.top : '-'}</td>
                          <td className="p-2 text-center font-bold text-blue-400">{item.nyata}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Munisi Table */}
              <div className="space-y-2">
                <h3 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] text-emerald-300">2. INVENTARIS MUNISI</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                        <th className="p-2 text-center">NO</th>
                        <th className="p-2">NAMA KALIBER MUNISI</th>
                        <th className="p-2 text-center">TOP</th>
                        <th className="p-2 text-center">NYATA</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300 text-[11px]">
                      {mockSenjataMunisi.munisi.map((item) => (
                        <tr key={item.no} className="hover:bg-slate-950/50">
                          <td className="p-2 text-center text-slate-500 font-bold">{item.no}</td>
                          <td className="p-2 font-bold text-slate-100">{item.nama}</td>
                          <td className="p-2 text-center text-slate-400">{item.top}</td>
                          <td className="p-2 text-center font-bold text-emerald-400">{item.nyata}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: ALKAPSUS PERTANIAN (SLIDE 12 LAPSAT) */}
          <div className="p-5 bg-slate-900 rounded-xl border border-amber-600/40 space-y-4 font-mono text-xs">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-extrabold text-amber-400 uppercase tracking-wide flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-amber-400" />
                  <span>PEMBINAAN MATERIIL: ALKAPSUS PERTANIAN (SLIDE 12 LAPSAT)</span>
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">Daftar Lengkap 16 Alat & Mesin Khusus Pertanian Satuan Batalyon</p>
              </div>
              <span className="px-3 py-1 bg-amber-950 text-amber-300 border border-amber-800 rounded font-bold">TOTAL: 114 UNIT</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="p-2 text-center w-12">NO</th>
                    <th className="p-2">NAMA ALKAPSUS PERTANIAN</th>
                    <th className="p-2 text-center w-24">SATUAN</th>
                    <th className="p-2 text-center w-24">JUMLAH</th>
                    <th className="p-2 text-right w-32">KONDISI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300 text-[11px]">
                  {mockAlkapsusPertanian.map((item) => (
                    <tr key={item.no} className="hover:bg-slate-950/50">
                      <td className="p-2 text-center text-slate-500 font-bold">{item.no}</td>
                      <td className="p-2 font-bold text-slate-100">{item.nama}</td>
                      <td className="p-2 text-center text-slate-400">{item.sat}</td>
                      <td className="p-2 text-center font-bold text-amber-400 text-sm">{item.jumlah}</td>
                      <td className="p-2 text-right font-bold text-emerald-400">SIAP OPERASIONAL</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION 4: KENDARAAN, ALKAPSAT & ALKOM (SLIDE 10 LAPSAT) */}
          <div className="p-5 bg-slate-900 rounded-xl border border-purple-600/40 space-y-4 font-mono text-xs">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-extrabold text-purple-400 uppercase tracking-wide flex items-center gap-2">
                  <Car className="w-5 h-5 text-purple-400" />
                  <span>PEMBINAAN MATERIIL: KENDARAAN, ALKAPSAT & ALKOM (SLIDE 10 LAPSAT)</span>
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">Maung Jelajah, Truck NPS, Damkar, Tanki BBM/Air, SPM Listrik/KLX, Fieldbed & Tenda</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Kendaraan */}
              <div className="lg:col-span-2 space-y-2">
                <h3 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] text-purple-300">1. KENDARAAN TAKTIS & DINAS</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                        <th className="p-2 text-center">NO</th>
                        <th className="p-2">NAMA KENDARAAN</th>
                        <th className="p-2 text-center">TOP</th>
                        <th className="p-2 text-center">NYATA</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300 text-[11px]">
                      {mockAlkapsatAlkomKendaraan.kendaraan.map((item) => (
                        <tr key={item.no} className="hover:bg-slate-950/50">
                          <td className="p-2 text-center text-slate-500 font-bold">{item.no}</td>
                          <td className="p-2 font-bold text-slate-100">{item.nama}</td>
                          <td className="p-2 text-center text-slate-400">{item.top}</td>
                          <td className="p-2 text-center font-bold text-purple-400">{item.jumlah}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Alkapsat & Alkom */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] text-blue-300">2. ALKAPSAT</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                          <th className="p-2">PERLENGKAPAN</th>
                          <th className="p-2 text-center">JUMLAH</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-slate-300 text-[11px]">
                        {mockAlkapsatAlkomKendaraan.alkapsat.map((item) => (
                          <tr key={item.no}>
                            <td className="p-2 font-bold text-slate-100">{item.nama}</td>
                            <td className="p-2 text-center font-bold text-blue-400">{item.jumlah} {item.sat}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] text-emerald-300">3. ALKOM</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                          <th className="p-2">PERALATAN</th>
                          <th className="p-2 text-center">TOP / NYATA</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-slate-300 text-[11px]">
                        {mockAlkapsatAlkomKendaraan.alkom.map((item) => (
                          <tr key={item.no}>
                            <td className="p-2 font-bold text-slate-100">{item.nama}</td>
                            <td className="p-2 text-center font-bold text-emerald-400">{item.top} / {item.jumlah}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. MATERIIL & INVENTARIS MASTER */}
      {(activeSubmenu === 'log_material' || activeSubmenu === 'log_inventory') && (
        <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
              DAFTAR MATERIIL, ALUTSISTA & KELAYAKAN SERVIS
            </h2>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-60">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Cari Barang, Kode Inventaris..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1 text-xs bg-slate-950 border border-slate-800 rounded focus:outline-none focus:border-slate-700 text-slate-200"
                />
              </div>

              <select
                value={kategoriFilter}
                onChange={(e) => setKategoriFilter(e.target.value)}
                className="px-2 py-1 text-xs bg-slate-950 border border-slate-800 rounded text-slate-300 font-mono"
              >
                <option value="ALL">SEMUA KATEGORI</option>
                <option value="SENJATA_AMUNISI">SENJATA & AMUNISI</option>
                <option value="VEHICLE">KENDARAAN / ALUTSISTA</option>
                <option value="BEKAL">BEKAL & PERSAAN</option>
                <option value="KOMUNIKASI">ALAT KOMUNIKASI</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase bg-slate-950">
                  <th className="py-2.5 px-3">KODE / NAMA MATERIIL</th>
                  <th className="py-2.5 px-3">KATEGORI</th>
                  <th className="py-2.5 px-3">JUMLAH TOTAL</th>
                  <th className="py-2.5 px-3">RINCIAN KONDISI (B / RR / RB)</th>
                  <th className="py-2.5 px-3">LOKASI GUDANG</th>
                  <th className="py-2.5 px-3">MAINTENANCE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredAssets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-slate-950/60 transition-colors">
                    <td className="py-2.5 px-3">
                      <div className="font-bold text-slate-200">{asset.namaBarang}</div>
                      <div className="text-[10px] font-mono text-amber-400">{asset.kodeInventaris}</div>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-slate-300">
                      {asset.kategori}
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-100">
                      {asset.jumlah.toLocaleString('id-ID')} {asset.satuanUnit}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2 font-mono text-[11px]">
                        <span className="text-emerald-400 font-bold" title="Baik">B: {asset.kondisiBaik}</span>
                        <span className="text-amber-400 font-bold" title="Rusak Ringan">RR: {asset.kondisiRusakRingan}</span>
                        <span className="text-red-400 font-bold" title="Rusak Berat">RB: {asset.kondisiRusakBerat}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-slate-400">
                      {asset.lokasiGudang}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        asset.statusMaintenance === 'SANGAT_BAIK' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                        'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}>
                        {asset.statusMaintenance}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

