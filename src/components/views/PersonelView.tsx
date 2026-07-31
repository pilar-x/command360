import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Award, 
  UserCheck, 
  UserMinus, 
  GraduationCap, 
  Briefcase,
  FileCheck,
  TrendingUp,
  PieChart,
  UserPlus,
  BarChart3,
  Building,
  ShieldCheck
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
import { mockPersonnel, mockExecutiveData } from '../../data/mockData';
import { TacticalGauge } from '../common/TacticalGauge';

interface PersonelViewProps {
  activeSubmenu?: string;
}

export const PersonelView: React.FC<PersonelViewProps> = ({
  activeSubmenu = 'pers_overview'
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const persChartData = [
    { name: 'KIMA', dspp: 107, siapOps: 74, kurang: 33 },
    { name: 'Kompi A', dspp: 101, siapOps: 69, kurang: 32 },
    { name: 'Kompi B', dspp: 101, siapOps: 63, kurang: 38 },
    { name: 'Kompi C', dspp: 100, siapOps: 64, kurang: 36 },
    { name: 'Kompi Ban', dspp: 57, siapOps: 41, kurang: 16 },
    { name: 'Ki Ternak', dspp: 49, siapOps: 8, kurang: 41 },
    { name: 'Ki Tani', dspp: 46, siapOps: 6, kurang: 40 },
    { name: 'Ki Zeni', dspp: 68, siapOps: 23, kurang: 45 },
    { name: 'Ki Medis', dspp: 38, siapOps: 25, kurang: 13 },
  ];

  const filteredPersonnel = mockPersonnel.filter(p => {
    const matchesSearch = p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.nrp.includes(searchTerm) ||
                          p.jabatan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || p.statusKehadiran === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-blue-400 font-semibold uppercase tracking-wider mb-1">
            <Users className="w-4 h-4 text-blue-400" />
            <span>Staf 1 Personel • Strength, Structure & Career Management</span>
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-slate-100 uppercase tracking-wide">
            PERSONNEL MASTER & STRENGTH SYSTEM
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manajemen Kekuatan (DSPP vs Riil), Pengisian Jabatan, Pembinaan Karir, Pendidikan & Sertifikasi, Kehadiran & Ketersediaan.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-mono px-3 py-1 rounded bg-blue-950 text-blue-300 border border-blue-800 font-bold">
            DSPP: 1.250 / RIIL: 1.180 ({mockExecutiveData.personnelPercent}%)
          </span>
        </div>
      </div>

      {/* 1. KEKUATAN & KOMPOSISI PERSONEL (Slide 5 Data Lapsat) */}
      {(activeSubmenu === 'kekuatan_personel' || activeSubmenu === 'komposisi_personel' || activeSubmenu === 'kesiapan_personel' || activeSubmenu === 'pers_strength' || activeSubmenu === 'pers_overview') && (
        <div className="space-y-6 font-mono text-xs">
          {/* Tactical Gauges for Personel */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <TacticalGauge 
              title="Kekuatan Satuan (DSPP vs Riil)" 
              subtitle="Persentase Pengisian Formasi"
              value={94.4}
              targetValue={90}
              color="blue"
              statusLabel="KATEGORI OPTIMAL"
            />
            <TacticalGauge 
              title="Persentase Siaga Operasional" 
              subtitle="Prajurit Siap Tempur / Tugas"
              value={55.7}
              targetValue={50}
              color="emerald"
              statusLabel="MELEBIHI STANDAR"
            />
            <TacticalGauge 
              title="Kelengkapan Kategori Jasmani" 
              subtitle="Nilai Garjas A/B & Kesehatan"
              value={91.8}
              targetValue={85}
              color="purple"
              statusLabel="SANGAT PRIMA"
            />
          </div>

          {/* Diagram Batang: Perbandingan DSPP vs Siap Ops per Kompi */}
          <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-3 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wide flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-400" />
                <span>DIAGRAM BATANG: PERBANDINGAN DSPP VS PERSONEL SIAP OPS PER KOMPI</span>
              </h2>
              <span className="text-[10px] text-slate-400">Prajurit (Orang)</span>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={persChartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                  <YAxis stroke="#94a3b8" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '6px', fontSize: '11px', color: '#f8fafc' }} 
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="dspp" fill="#3b82f6" radius={[3, 3, 0, 0]} name="DSPP Ideal" />
                  <Bar dataKey="siapOps" fill="#10b981" radius={[3, 3, 0, 0]} name="Siap Ops" />
                  <Bar dataKey="kurang" fill="#f59e0b" radius={[3, 3, 0, 0]} name="Defisit / Kurang" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Matrix Per Kompi (Slide 5) */}
          <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
            <h2 className="font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>REKAPITULASI KEKUATAN PERSONEL PER KOMPI (SLIDE 5 LAPSAT)</span>
              <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/40 text-amber-400 rounded text-xs font-bold">TOTAL: 670 PERSONEL</span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-bold uppercase">
                    <th className="p-2.5">SUB SATUAN / KOMPI</th>
                    <th className="p-2.5 text-center">DSPP</th>
                    <th className="p-2.5 text-center">SIAP OPS</th>
                    <th className="p-2.5 text-center">KURANG</th>
                    <th className="p-2.5 text-right">PERSENTASE SIAP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  <tr>
                    <td className="p-2.5 font-bold text-slate-100">KOMPI MARKAS</td>
                    <td className="p-2.5 text-center">107</td>
                    <td className="p-2.5 text-center font-bold text-emerald-400">74</td>
                    <td className="p-2.5 text-center text-amber-400">33</td>
                    <td className="p-2.5 text-right">69.1%</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-100">KOMPI A</td>
                    <td className="p-2.5 text-center">101</td>
                    <td className="p-2.5 text-center font-bold text-emerald-400">69</td>
                    <td className="p-2.5 text-center text-amber-400">32</td>
                    <td className="p-2.5 text-right">68.3%</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-100">KOMPI B</td>
                    <td className="p-2.5 text-center">101</td>
                    <td className="p-2.5 text-center font-bold text-emerald-400">63</td>
                    <td className="p-2.5 text-center text-amber-400">38</td>
                    <td className="p-2.5 text-right">62.3%</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-100">KOMPI C</td>
                    <td className="p-2.5 text-center">100</td>
                    <td className="p-2.5 text-center font-bold text-emerald-400">64</td>
                    <td className="p-2.5 text-center text-amber-400">36</td>
                    <td className="p-2.5 text-right">64.0%</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-100">KOMPI BANTUAN</td>
                    <td className="p-2.5 text-center">57</td>
                    <td className="p-2.5 text-center font-bold text-emerald-400">41</td>
                    <td className="p-2.5 text-center text-amber-400">16</td>
                    <td className="p-2.5 text-right">71.9%</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-emerald-300">KOMPI PETERNAKAN</td>
                    <td className="p-2.5 text-center">49</td>
                    <td className="p-2.5 text-center font-bold text-emerald-400">8</td>
                    <td className="p-2.5 text-center text-amber-400">41</td>
                    <td className="p-2.5 text-right">16.3%</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-emerald-300">KOMPI PERTANIAN</td>
                    <td className="p-2.5 text-center">46</td>
                    <td className="p-2.5 text-center font-bold text-emerald-400">6</td>
                    <td className="p-2.5 text-center text-amber-400">40</td>
                    <td className="p-2.5 text-right">13.0%</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-amber-300">KOMPI ZI/KONSTRUKSI</td>
                    <td className="p-2.5 text-center">68</td>
                    <td className="p-2.5 text-center font-bold text-emerald-400">23</td>
                    <td className="p-2.5 text-center text-amber-400">45</td>
                    <td className="p-2.5 text-right">33.8%</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-blue-300">KOMPI MEDIS</td>
                    <td className="p-2.5 text-center">38</td>
                    <td className="p-2.5 text-center font-bold text-emerald-400">25</td>
                    <td className="p-2.5 text-center text-amber-400">13</td>
                    <td className="p-2.5 text-right">65.8%</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-100">MAYON</td>
                    <td className="p-2.5 text-center">1</td>
                    <td className="p-2.5 text-center font-bold text-emerald-400">1</td>
                    <td className="p-2.5 text-center text-slate-500">0</td>
                    <td className="p-2.5 text-right">100.0%</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-100">LF (LUAR FORMASI)</td>
                    <td className="p-2.5 text-center">2</td>
                    <td className="p-2.5 text-center font-bold text-emerald-400">1</td>
                    <td className="p-2.5 text-center text-amber-400">1</td>
                    <td className="p-2.5 text-right">50.0%</td>
                  </tr>
                  <tr className="bg-slate-950 font-bold border-t border-slate-700 text-amber-400">
                    <td className="p-2.5">TOTAL BATALYON</td>
                    <td className="p-2.5 text-center">670</td>
                    <td className="p-2.5 text-center text-emerald-400">373</td>
                    <td className="p-2.5 text-center text-amber-400">296</td>
                    <td className="p-2.5 text-right text-emerald-400">55.7%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. PENDIDIKAN & KURSUS (Slide 5 Detail Keterangan) */}
      {(activeSubmenu === 'dik_kursus' || activeSubmenu === 'kehadiran_personel') && (
        <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wide flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-amber-400" />
              <span>DAFTAR PENDIDIKAN, KURSUS & PENUGASAN KHUSUS (SLIDE 5)</span>
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">Personel Dinas Luar, BP, Pendidikan Spesialisasi & Kursus Organik Yonif TP 897</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
              <span className="text-amber-400 font-bold block">1. DIKPAINTEL</span>
              <p className="text-slate-200">Letda Inf Feri Febrian & Letda Inf Jonathan Isa</p>
            </div>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
              <span className="text-amber-400 font-bold block">2. DIK PA KOMLEK</span>
              <p className="text-slate-200">Letda Cke M Bintang Ihsan R</p>
            </div>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
              <span className="text-amber-400 font-bold block">3. DIKTUKPA</span>
              <p className="text-slate-200">Serka Foni Angria</p>
            </div>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
              <span className="text-amber-400 font-bold block">4. SUS PATIH & TIH SECATA</span>
              <p className="text-slate-200">Letda Inf Julasmi & Letda Inf Edi Hartono</p>
            </div>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
              <span className="text-amber-400 font-bold block">5. AKPER (LF - LUAR FORMASI)</span>
              <p className="text-slate-200">Serda Abel Maulana Alfian</p>
            </div>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
              <span className="text-amber-400 font-bold block">6. LAT SANJAK</span>
              <p className="text-slate-200">Letda Inf Taufik H, Serda Sevenjung S, Serda Mhd Andrean N</p>
            </div>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
              <span className="text-amber-400 font-bold block">7. DIK SPESIALISASI</span>
              <p className="text-slate-200">Pratu Tri Junaldy & Pratu Nofriyan Ananda Ichola</p>
            </div>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
              <span className="text-amber-400 font-bold block">8. BEKTRAM</span>
              <p className="text-slate-200">Serda Fajar B, Serda Mhd Danil, Prada Agryan Rhaka</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. ATLET & PRESTASI PRAJURIT (Slide 6 & Slide 7 Data Lapsat) */}
      {(activeSubmenu === 'atlet_prestasi' || activeSubmenu === 'prestasi_personel' || activeSubmenu === 'prestasi_olahraga' || activeSubmenu === 'penghargaan' || activeSubmenu === 'dok_prestasi') && (
        <div className="space-y-6 font-mono text-xs">
          {/* Slide 7: Prajurit Berprestasi */}
          <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wide flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span>PRAJURIT BERPRESTASI YONIF TP 897 / SINGGALANG (SLIDE 7)</span>
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">Penghargaan Olahraga & Keagamaan Tahun 2026</p>
              </div>
              <span className="px-3 py-1 bg-amber-950 text-amber-300 border border-amber-800 rounded font-bold">JUARA SUMBAR</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 border border-amber-500/30 rounded-xl space-y-2">
                <div className="text-amber-400 font-bold text-sm">PRADA JONA ADRIAN PUTRA</div>
                <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded text-amber-300 font-bold">
                  🏆 JUARA 2 MTQ KE-30 RAMADHAN
                </div>
                <p className="text-slate-300 text-[11px]">Tingkat Kecamatan Lubuk Basung, Kabupaten Agam</p>
              </div>

              <div className="p-4 bg-slate-950 border border-amber-500/30 rounded-xl space-y-2">
                <div className="text-amber-400 font-bold text-sm">SERDA MAIKEL SIMARMATA</div>
                <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded text-amber-300 font-bold">
                  🏆 JUARA 1 UMUM PUTRA POLICE WOMEN RUN 2026
                </div>
                <p className="text-slate-300 text-[11px]">Polres Payakumbuh • Juara 2 ARM Warrior Fun Run 5K • Juara 2 5K ITP Run Padang</p>
              </div>

              <div className="p-4 bg-slate-950 border border-amber-500/30 rounded-xl space-y-2">
                <div className="text-amber-400 font-bold text-sm">SERDA ASAEL GINTING</div>
                <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded text-amber-300 font-bold">
                  🏆 JUARA 2 KAHF OWN THE WAY RUN SUMBAR 2026
                </div>
                <p className="text-slate-300 text-[11px]">Juara 3 Bhayangkara Run Polresta Padang • Juara 2 Bhayangkara Run Padang Panjang</p>
              </div>
            </div>
          </div>

          {/* Slide 6: Rekapitulasi TC Atlet */}
          <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-2 flex justify-between items-center">
              <span>REKAPITULASI TC ATLET YONIF TP 897 (SLIDE 6)</span>
              <span className="text-emerald-400 font-bold">TOTAL: 157 PERSONEL ATLET</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded">
                <div className="text-slate-400">PENCAK SILAT</div>
                <div className="text-xl font-bold text-amber-400 mt-1">12 Org</div>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded">
                <div className="text-slate-400">JUJITSU</div>
                <div className="text-xl font-bold text-amber-400 mt-1">4 Org</div>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded">
                <div className="text-slate-400">KARATE</div>
                <div className="text-xl font-bold text-amber-400 mt-1">3 Org</div>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded">
                <div className="text-slate-400">SEPAK BOLA</div>
                <div className="text-xl font-bold text-amber-400 mt-1">32 Org</div>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded">
                <div className="text-slate-400">MUAYTHAI</div>
                <div className="text-xl font-bold text-amber-400 mt-1">1 Org</div>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded">
                <div className="text-slate-400">TINJU</div>
                <div className="text-xl font-bold text-amber-400 mt-1">10 Org</div>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded">
                <div className="text-slate-400">UJI PETIK</div>
                <div className="text-xl font-bold text-amber-400 mt-1">65 Org</div>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded">
                <div className="text-slate-400">ANGKAT BESI</div>
                <div className="text-xl font-bold text-amber-400 mt-1">1 Org</div>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded">
                <div className="text-slate-400">RENANG</div>
                <div className="text-xl font-bold text-amber-400 mt-1">1 Org</div>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded">
                <div className="text-slate-400">LARI</div>
                <div className="text-xl font-bold text-amber-400 mt-1">1 Org</div>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded">
                <div className="text-slate-400">BADMINTON</div>
                <div className="text-xl font-bold text-amber-400 mt-1">6 Org</div>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded">
                <div className="text-slate-400">BOLA VOLLY</div>
                <div className="text-xl font-bold text-amber-400 mt-1">21 Org</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. KELUARGA & PERSIT (Slide 8 & Slide 9 Data Lapsat) */}
      {activeSubmenu === 'keluarga_persit' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wide flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-400" />
                  <span>REKAPITULASI PERSIT KARTIKA CHANDRA KIRANA YONIF TP 897 (SLIDE 8 & 9)</span>
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">Data Keanggotaan, Domisili, & Kegiatan Persit Satuan</p>
              </div>
              <span className="px-3 py-1 bg-amber-950 text-amber-300 border border-amber-800 rounded font-bold">TOTAL: 670 ANGGOTA</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <span className="text-amber-400 font-bold block">REKAPITULASI STATUS ANGGOTA PERSIT</span>
                <ul className="space-y-1 text-slate-300">
                  <li>● Istri Perwira: <strong>17 Orang</strong></li>
                  <li>● Istri Bintara: <strong>20 Orang</strong></li>
                  <li>● Istri Tamtama: <strong>20 Orang</strong></li>
                  <li>● Duda Cerai Hidup: <strong>1 Orang</strong></li>
                </ul>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <span className="text-blue-400 font-bold block">DOMISILI ANGGOTA PERSIT</span>
                <ul className="space-y-1 text-slate-300">
                  <li>● Rumah Dinas Satuan Lama: <strong>11 KK</strong></li>
                  <li>● Rumah Orang Tua / Keluarga: <strong>21 KK</strong></li>
                  <li>● Rumah Pribadi: <strong>12 KK</strong></li>
                  <li>● Kost / Kontrak (Sekitar Satuan): <strong>13 KK</strong></li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <span className="text-emerald-400 font-bold block">10 KEGIATAN PERSIT YONIF TP 897</span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-[10px]">
                <div className="p-2 bg-slate-900 rounded border border-slate-800">Sulam Peniti</div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800">Vicon Penyuluhan Kes</div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800">Donor Darah</div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800">Pengarahan Persit</div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800">Jumat Berkah</div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800">Rapat Pengurus</div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800">HUT Persit</div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800">Pengurusan Nikah</div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800">Temu Kangen</div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800">Kunker Danrem</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. DATA PERSONEL */}
      {(activeSubmenu === 'pers_data' || activeSubmenu === 'pers_overview') && (
        <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
              DAFTAR & MASTER DATA PERSONEL ORGANIK
            </h2>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-60">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Cari Nama, NRP, Jabatan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1 text-xs bg-slate-950 border border-slate-800 rounded focus:outline-none focus:border-slate-700 text-slate-200"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2 py-1 text-xs bg-slate-950 border border-slate-800 rounded text-slate-300 font-mono"
              >
                <option value="ALL">SEMUA STATUS</option>
                <option value="HADIR">HADIR</option>
                <option value="DINAS_LUAR">DINAS LUAR</option>
                <option value="CUTI">CUTI</option>
                <option value="PENDIDIKAN">PENDIDIKAN</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase bg-slate-950">
                  <th className="py-2.5 px-3">NRP / NAMA</th>
                  <th className="py-2.5 px-3">PANGKAT</th>
                  <th className="py-2.5 px-3">JABATAN & SATUAN</th>
                  <th className="py-2.5 px-3">KUALIFIKASI / DIK</th>
                  <th className="py-2.5 px-3">KEHADIRAN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredPersonnel.map((person) => (
                  <tr key={person.id} className="hover:bg-slate-950/60 transition-colors">
                    <td className="py-2.5 px-3">
                      <div className="font-bold text-slate-200">{person.nama}</div>
                      <div className="text-[10px] font-mono text-slate-500">NRP: {person.nrp}</div>
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-amber-400">
                      {person.pangkat}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="text-slate-200">{person.jabatan}</div>
                      <div className="text-[10px] text-slate-400">{person.satuan}</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex flex-wrap gap-1">
                        {person.kualifikasi.map((k, i) => (
                          <span key={i} className="px-1.5 py-0.2 bg-slate-800 text-slate-300 rounded text-[10px] border border-slate-700 font-mono">
                            {k}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        person.statusKehadiran === 'HADIR' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                        person.statusKehadiran === 'DINAS_LUAR' ? 'bg-blue-950 text-blue-300 border border-blue-800' :
                        'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}>
                        {person.statusKehadiran}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. KEKUATAN PERSONEL */}
      {activeSubmenu === 'pers_strength' && (
        <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-4 text-xs">
          <h2 className="font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-3">
            REKAPITULASI KEKUATAN DSPP VS RIIL PER SATUAN & PANGKAT
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
            <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">PERWIRA (PAMEN / PAMA)</span>
              <p className="text-slate-200">DSPP: 120 | Riil: 114 | Selisih: -6 Personel (95.0%)</p>
            </div>
            <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-2">
              <span className="text-blue-400 font-bold block">BINTARA & TAMTAMA</span>
              <p className="text-slate-200">DSPP: 1.130 | Riil: 1.066 | Selisih: -64 Personel (94.3%)</p>
            </div>
          </div>
        </div>
      )}

      {/* 4. JABATAN */}
      {activeSubmenu === 'pers_positions' && (
        <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-4 text-xs">
          <h2 className="font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-3">
            STRUKTUR JABATAN & FORMASI JABATAN KOSONG
          </h2>
          <p className="text-slate-300">
            Daftar formasi jabatan terisi vs kosong, serta peta usulan mutasi jabatan.
          </p>
        </div>
      )}

      {/* 5. PEMBINAAN PERSONEL */}
      {activeSubmenu === 'pers_development' && (
        <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-4 text-xs">
          <h2 className="font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-3">
            PEMBINAAN KARIR, UKP, MUTASI & PENSIUN
          </h2>
          <p className="text-slate-300">
            Usul Kenaikan Pangkat (UKP) Periode Oktober 2026: 42 Personel Memenuhi Syarat.
          </p>
        </div>
      )}

      {/* 6. KESEGARAN JASMANI & KOMPETENSI */}
      {(activeSubmenu === 'pers_jasmani' || activeSubmenu === 'pers_competency') && (
        <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-4 text-xs font-mono">
          <h2 className="font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-3 flex items-center justify-between">
            <span>KESEGARAN JASMANI (GARJAS) & KUALIFIKASI PRAJURIT</span>
            <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded font-bold">RATA-RATA NILAI: 84.6</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-1">
              <span className="text-slate-400">GARJAS A (LARI 12 MENIT)</span>
              <div className="text-lg font-bold text-emerald-400">Nilai Rata: 86.2</div>
              <p className="text-[10px] text-slate-500">Kategori Baik Sekali</p>
            </div>
            <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-1">
              <span className="text-slate-400">GARJAS B (PULL UP/PUSH UP/SIT UP)</span>
              <div className="text-lg font-bold text-blue-400">Nilai Rata: 83.0</div>
              <p className="text-[10px] text-slate-500">Kategori Baik</p>
            </div>
            <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-1">
              <span className="text-slate-400">GARJAS C (RENANG MILITER)</span>
              <div className="text-lg font-bold text-amber-400">Nilai Rata: 84.5</div>
              <p className="text-[10px] text-slate-500">98.5% Lulus Kualifikasi</p>
            </div>
          </div>
        </div>
      )}

      {/* 7. DISIPLIN & TATA TERTIB */}
      {(activeSubmenu === 'pers_discipline' || activeSubmenu === 'pers_availability') && (
        <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-4 text-xs font-mono">
          <h2 className="font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-3 flex items-center justify-between">
            <span>DISIPLIN, MORIL & TATA TERTIB PRAJURIT</span>
            <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded font-bold">NILAI DISIPLIN: 99.1%</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-1">
              <span className="text-slate-400">ANGKA PELANGGARAN DISIPLIN</span>
              <div className="text-xl font-bold text-emerald-400">0.09% (Sangat Rendah)</div>
              <p className="text-[10px] text-slate-500">Sanksi & Tindakan Pembinaan Berjalan</p>
            </div>
            <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-1">
              <span className="text-slate-400">PRESENSI SIAGA YONIF</span>
              <div className="text-xl font-bold text-blue-400">980 Personel On-Call</div>
              <p className="text-[10px] text-slate-500">Tingkat Kehadiran Jam Komando 100%</p>
            </div>
            <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-1">
              <span className="text-slate-400">PEMBINAAN MENTAL & MORIL</span>
              <div className="text-xl font-bold text-amber-400">24 Jam Konseling / Jam Bintal</div>
              <p className="text-[10px] text-slate-500">Rutin Mingguan Per Kompi</p>
            </div>
          </div>
        </div>
      )}

      {/* 8. ANALITIK & LAPORAN */}
      {activeSubmenu === 'pers_analytics' && (
        <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-4 text-xs">
          <h2 className="font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-3">
            ANALITIK KEKUATAN & PROYEKSI KEBUTUHAN PERSONEL
          </h2>
          <p className="text-slate-300">
            Proyeksi pensiun 3 tahun ke depan dan perencanaan alokasi penerimaan prajurit baru.
          </p>
        </div>
      )}

    </div>
  );
};
