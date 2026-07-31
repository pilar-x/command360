import React, { useState } from 'react';
import { 
  Building2, 
  Sprout, 
  Layers, 
  Hammer, 
  HeartPulse, 
  Shield, 
  Crosshair, 
  Users, 
  Truck, 
  CheckCircle2, 
  MapPin, 
  BarChart, 
  Calendar,
  AlertTriangle,
  FileText,
  Search
} from 'lucide-react';

interface SatuanViewProps {
  activeSubmenu?: string;
  onNavigateSubmenu?: (sub: string) => void;
}

export const SatuanView: React.FC<SatuanViewProps> = ({
  activeSubmenu = 'ki_peternakan',
  onNavigateSubmenu
}) => {
  const [activeCompany, setActiveCompany] = useState<string>(activeSubmenu);

  // Sync state if prop changes
  React.useEffect(() => {
    if (activeSubmenu) {
      setActiveCompany(activeSubmenu);
    }
  }, [activeSubmenu]);

  const handleSelectCompany = (compKey: string) => {
    setActiveCompany(compKey);
    if (onNavigateSubmenu) {
      onNavigateSubmenu(compKey);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Submenu Mode: DATA SATUAN / SEJARAH SATUAN */}
      {(activeSubmenu === 'data_satuan' || activeSubmenu === 'sejarah_satuan') && (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-6 font-mono text-xs">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Shield className="w-10 h-10 text-amber-400" />
              </div>
              <div>
                <span className="text-amber-400 font-bold uppercase tracking-widest text-[11px]">PROFILE PROFIL SATUAN</span>
                <h1 className="text-2xl font-black text-slate-100 tracking-tight">YONIF TP 897 / SINGGALANG</h1>
                <p className="text-slate-400 text-xs mt-1">BATALYON INFANTERI TERITORIAL PEMBANGUNAN • SEMBOYAN: <span className="text-amber-400 font-bold">"BERANI BENAR BERHASIL"</span></p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-lg text-xs font-bold">
                KODAM XX / TIB • KOREM 032 / WBR
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-amber-400 text-sm flex items-center gap-2 uppercase">
                <Users className="w-4 h-4" />
                <span>PIMPINAAN SATUAN (KOMANDO)</span>
              </h3>
              <div className="space-y-2 pt-1">
                <div className="p-3 bg-slate-900 rounded border border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="text-[10px] text-slate-400">DANYONIF TP 897/SINGGALANG</div>
                    <div className="text-sm font-extrabold text-slate-100">LETKOL INF SAOR J. LUMBANBATU</div>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded text-[10px] font-bold">KOMANDAN</span>
                </div>
                <div className="p-3 bg-slate-900 rounded border border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="text-[10px] text-slate-400">WADANYONIF TP 897/SINGGALANG</div>
                    <div className="text-sm font-extrabold text-slate-100">KAPTEN INF YULIANTO YOSE I L</div>
                  </div>
                  <span className="px-2 py-0.5 bg-blue-950 text-blue-400 border border-blue-800 rounded text-[10px] font-bold">WADANYON</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-blue-400 text-sm flex items-center gap-2 uppercase">
                <Building2 className="w-4 h-4" />
                <span>RINGKASAN DISLOKASI MAKOYON</span>
              </h3>
              <div className="space-y-2 text-xs">
                <p className="text-slate-300"><strong className="text-slate-100">Lokasi Makoyon:</strong> Lubuk Basung, Kabupaten Agam, Sumatera Barat</p>
                <p className="text-slate-300"><strong className="text-slate-100">Total Personel:</strong> 670 Personel (373 Siap Ops)</p>
                <p className="text-slate-300"><strong className="text-slate-100">Luas Pangkalan & Pangan:</strong> 4 Hektar Lahan Utama + 250 Ha Sektor Binaan</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submenu Mode: STRUKTUR ORGANISASI */}
      {activeSubmenu === 'struktur_org' && (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-6 font-mono text-xs">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-lg font-extrabold text-slate-100 uppercase flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              <span>STRUKTUR ORGANISASI YONIF TP 897 / SINGGALANG</span>
            </h2>
            <p className="text-slate-400 text-xs mt-0.5">Berdasarkan SKEP Komando Batalyon Infanteri Teritorial Pembangunan</p>
          </div>

          {/* Org Chart Visual (Matching Slide 4) */}
          <div className="space-y-6">
            {/* Level 1: Danyon & Wadanyon */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-full max-w-md p-3.5 bg-red-950/80 border-2 border-red-600 rounded-xl text-center shadow-lg">
                <div className="text-[10px] text-red-300 uppercase font-bold tracking-widest">DANYONIF</div>
                <div className="text-base font-black text-slate-100">LETKOL INF SAOR J. LUMBANBATU</div>
              </div>
              <div className="w-0.5 h-4 bg-slate-700" />
              <div className="w-full max-w-md p-3 bg-red-950/60 border border-red-700 rounded-xl text-center">
                <div className="text-[10px] text-red-300 uppercase font-bold tracking-widest">WADANYONIF</div>
                <div className="text-sm font-bold text-slate-100">KAPTEN INF YULIANTO YOSE I L</div>
              </div>
            </div>

            <div className="w-full h-0.5 bg-slate-800 my-4" />

            {/* Level 2: Para Pasi Staf */}
            <div>
              <h3 className="text-xs font-bold text-amber-400 uppercase mb-3 text-center">UNSUR STAF & DOKTER</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded text-center">
                  <div className="text-[9px] text-amber-400 font-bold">PASI INTEL</div>
                  <div className="text-xs font-bold text-slate-200 mt-1">Ws. LETDA INF HASRUL</div>
                </div>
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded text-center">
                  <div className="text-[9px] text-amber-400 font-bold">PASI OPSLAT</div>
                  <div className="text-xs font-bold text-slate-200 mt-1">Ws. LETDA INF JONATHAN ISA</div>
                </div>
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded text-center">
                  <div className="text-[9px] text-amber-400 font-bold">PASI PERS</div>
                  <div className="text-xs font-bold text-slate-200 mt-1">Ws. LETDA CKE M BINTANG</div>
                </div>
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded text-center">
                  <div className="text-[9px] text-amber-400 font-bold">PASI LOG</div>
                  <div className="text-xs font-bold text-slate-200 mt-1">Ws. LETDA CBA VIRADARMA</div>
                </div>
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded text-center">
                  <div className="text-[9px] text-amber-400 font-bold">DOKTER</div>
                  <div className="text-xs font-bold text-slate-400 mt-1">-</div>
                </div>
              </div>
            </div>

            <div className="w-full h-0.5 bg-slate-800 my-4" />

            {/* Level 3: Para Danki */}
            <div>
              <h3 className="text-xs font-bold text-emerald-400 uppercase mb-3 text-center">UNSUR PELAKSANA (KOMPI-KOMPI)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                <div className="p-2 bg-slate-950 border border-slate-800 rounded text-center">
                  <div className="text-[9px] text-emerald-400 font-bold">DANKI KOMPI MARKAS</div>
                  <div className="text-[11px] font-bold text-slate-200 mt-0.5">KAPT INF ZUL EFENDI</div>
                </div>
                <div className="p-2 bg-slate-950 border border-slate-800 rounded text-center">
                  <div className="text-[9px] text-emerald-400 font-bold">DANKI KOMPI A</div>
                  <div className="text-[11px] font-bold text-slate-200 mt-0.5">Ws. LETDA INF JUL ASMI</div>
                </div>
                <div className="p-2 bg-slate-950 border border-slate-800 rounded text-center">
                  <div className="text-[9px] text-emerald-400 font-bold">DANKI KOMPI B</div>
                  <div className="text-[11px] font-bold text-slate-200 mt-0.5">Ws. LETDA INF ICHWAN F</div>
                </div>
                <div className="p-2 bg-slate-950 border border-slate-800 rounded text-center">
                  <div className="text-[9px] text-emerald-400 font-bold">DANKI KOMPI C</div>
                  <div className="text-[11px] font-bold text-slate-200 mt-0.5">Ws. LETDA INF FERI FEBRIAN</div>
                </div>
                <div className="p-2 bg-slate-950 border border-slate-800 rounded text-center">
                  <div className="text-[9px] text-emerald-400 font-bold">DANKI KOMPI BANTUAN</div>
                  <div className="text-[11px] font-bold text-slate-200 mt-0.5">Ws. LETDA INF ADIK PEBRI</div>
                </div>
                <div className="p-2 bg-slate-950 border border-emerald-900 rounded text-center">
                  <div className="text-[9px] text-emerald-300 font-bold">DANKI TERNAK</div>
                  <div className="text-[11px] font-bold text-slate-200 mt-0.5">Ws. LETDA INF RUDI H PURBA</div>
                </div>
                <div className="p-2 bg-slate-950 border border-emerald-900 rounded text-center">
                  <div className="text-[9px] text-emerald-300 font-bold">DANKI TANI</div>
                  <div className="text-[11px] font-bold text-slate-200 mt-0.5">Ws. LETDA INF A IRWAN</div>
                </div>
                <div className="p-2 bg-slate-950 border border-amber-900 rounded text-center">
                  <div className="text-[9px] text-amber-300 font-bold">DANKI ZI</div>
                  <div className="text-[11px] font-bold text-slate-200 mt-0.5">Ws. LETDA CZI R CHANIAGO</div>
                </div>
                <div className="p-2 bg-slate-950 border border-blue-900 rounded text-center">
                  <div className="text-[9px] text-blue-300 font-bold">DANKI MEDIS</div>
                  <div className="text-[11px] font-bold text-slate-200 mt-0.5">KAPTEN CKM FRENGKY H</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submenu Mode: PEJABAT SATUAN */}
      {activeSubmenu === 'pejabat_satuan' && (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-6 font-mono text-xs">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-lg font-extrabold text-slate-100 uppercase flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-400" />
              <span>DAFTAR PEJABAT SATUAN YONIF TP 897 / SINGGALANG</span>
            </h2>
            <p className="text-slate-400 text-xs mt-0.5">Pejabat Utama Komando, Staf, & Komandan Kompi Pelaksana</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950 text-slate-400">
                  <th className="p-3">JABATAN</th>
                  <th className="p-3">NAMA PEJABAT</th>
                  <th className="p-3">PANGKAT / KORPS</th>
                  <th className="p-3">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                <tr className="bg-red-950/20">
                  <td className="p-3 font-bold text-amber-400">DANYONIF</td>
                  <td className="p-3 font-extrabold text-slate-100">LETKOL INF SAOR J. LUMBANBATU</td>
                  <td className="p-3">LETKOL INF</td>
                  <td className="p-3 text-emerald-400 font-bold">DEFINITIF</td>
                </tr>
                <tr className="bg-red-950/10">
                  <td className="p-3 font-bold text-amber-400">WADANYONIF</td>
                  <td className="p-3 font-bold text-slate-100">KAPTEN INF YULIANTO YOSE I L</td>
                  <td className="p-3">KAPTEN INF</td>
                  <td className="p-3 text-emerald-400 font-bold">DEFINITIF</td>
                </tr>
                <tr>
                  <td className="p-3 text-amber-300">PASI INTEL</td>
                  <td className="p-3">Ws. LETDA INF HASRUL</td>
                  <td className="p-3">LETDA INF</td>
                  <td className="p-3 text-amber-400">Ws (Watsap)</td>
                </tr>
                <tr>
                  <td className="p-3 text-amber-300">PASI OPSLAT</td>
                  <td className="p-3">Ws. LETDA INF JONATHAN ISA</td>
                  <td className="p-3">LETDA INF</td>
                  <td className="p-3 text-amber-400">Ws (Watsap)</td>
                </tr>
                <tr>
                  <td className="p-3 text-amber-300">PASI PERS</td>
                  <td className="p-3">Ws. LETDA CKE M BINTANG</td>
                  <td className="p-3">LETDA CKE</td>
                  <td className="p-3 text-amber-400">Ws (Watsap)</td>
                </tr>
                <tr>
                  <td className="p-3 text-amber-300">PASI LOG</td>
                  <td className="p-3">Ws. LETDA CBA VIRADARMA</td>
                  <td className="p-3">LETDA CBA</td>
                  <td className="p-3 text-amber-400">Ws (Watsap)</td>
                </tr>
                <tr>
                  <td className="p-3 text-emerald-300">DANKI KOMPI MARKAS</td>
                  <td className="p-3">KAPT INF ZUL EFENDI</td>
                  <td className="p-3">KAPTEN INF</td>
                  <td className="p-3 text-emerald-400 font-bold">DEFINITIF</td>
                </tr>
                <tr>
                  <td className="p-3 text-emerald-300">DANKI KOMPI A</td>
                  <td className="p-3">Ws. LETDA INF JUL ASMI</td>
                  <td className="p-3">LETDA INF</td>
                  <td className="p-3 text-amber-400">Ws (Watsap)</td>
                </tr>
                <tr>
                  <td className="p-3 text-emerald-300">DANKI KOMPI B</td>
                  <td className="p-3">Ws. LETDA INF ICHWAN F</td>
                  <td className="p-3">LETDA INF</td>
                  <td className="p-3 text-amber-400">Ws (Watsap)</td>
                </tr>
                <tr>
                  <td className="p-3 text-emerald-300">DANKI KOMPI C</td>
                  <td className="p-3">Ws. LETDA INF FERI FEBRIAN</td>
                  <td className="p-3">LETDA INF</td>
                  <td className="p-3 text-amber-400">Ws (Watsap)</td>
                </tr>
                <tr>
                  <td className="p-3 text-emerald-300">DANKI KOMPI BANTUAN</td>
                  <td className="p-3">Ws. LETDA INF ADIK PEBRI</td>
                  <td className="p-3">LETDA INF</td>
                  <td className="p-3 text-amber-400">Ws (Watsap)</td>
                </tr>
                <tr>
                  <td className="p-3 text-emerald-300">DANKI TERNAK</td>
                  <td className="p-3">Ws. LETDA INF RUDI H PURBA</td>
                  <td className="p-3">LETDA INF</td>
                  <td className="p-3 text-amber-400">Ws (Watsap)</td>
                </tr>
                <tr>
                  <td className="p-3 text-emerald-300">DANKI TANI</td>
                  <td className="p-3">Ws. LETDA INF A IRWAN</td>
                  <td className="p-3">LETDA INF</td>
                  <td className="p-3 text-amber-400">Ws (Watsap)</td>
                </tr>
                <tr>
                  <td className="p-3 text-emerald-300">DANKI ZI</td>
                  <td className="p-3">Ws. LETDA CZI R CHANIAGO</td>
                  <td className="p-3">LETDA CZI</td>
                  <td className="p-3 text-amber-400">Ws (Watsap)</td>
                </tr>
                <tr>
                  <td className="p-3 text-emerald-300">DANKI MEDIS</td>
                  <td className="p-3">KAPTEN CKM FRENGKY H</td>
                  <td className="p-3">KAPTEN CKM</td>
                  <td className="p-3 text-emerald-400 font-bold">DEFINITIF</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Submenu Mode: DISLOKASI SATUAN */}
      {activeSubmenu === 'dislokasi_satuan' && (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-6 font-mono text-xs">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-lg font-extrabold text-slate-100 uppercase flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-400" />
              <span>DISLOKASI SATUAN & JARAK TEMPUH YONIF TP 897</span>
            </h2>
            <p className="text-slate-400 text-xs mt-0.5">Laporan Dislokasi Markas Awal (MA) vs Lokasi Pangkalan Definitif (Slide 3)</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
              <h3 className="font-bold text-amber-400 text-sm">SEKTOR DISLOKASI MA YONIF TP 897</h3>
              <p className="text-slate-300 leading-relaxed">
                Markas Awal (MA) Yonif TP 897 berdislokasi di Lubuk Basung, Kab. Agam, Sumbar, dengan akses ke instansi komando atas dan satuan jajaran.
              </p>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded text-amber-300">
                ● MA YONIF TP 897 &rarr; LOK YON: <strong>14,3 KM (25 MNT)</strong>
              </div>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
              <h3 className="font-bold text-blue-400 text-sm">JARAK TEMPUH KE INSTANSI LAIN</h3>
              <ul className="space-y-1.5 text-slate-300 text-xs">
                <li className="p-2 bg-slate-900 rounded border border-slate-800">● MA KE KODIM 0304/AGAM : <strong>66 KM (2 JAM 12 MNT)</strong></li>
                <li className="p-2 bg-slate-900 rounded border border-slate-800">● MA KE SECATA B : <strong>97 KM (2 JAM 17 MNT)</strong></li>
                <li className="p-2 bg-slate-900 rounded border border-slate-800">● MA KE YONIF 131/BS : <strong>101 KM (3 JAM 6 MNT)</strong></li>
                <li className="p-2 bg-slate-900 rounded border border-slate-800">● MA KE KODIM 0308/PADANG PARIAMAN : <strong>56 KM (1 JAM 9 MNT)</strong></li>
                <li className="p-2 bg-slate-900 rounded border border-slate-800">● MA KE YONIF 133/YS : <strong>96 KM (2 JAM 4 MNT)</strong></li>
                <li className="p-2 bg-slate-900 rounded border border-slate-800">● MA KE KODAM XX/TIB : <strong>101 KM (2 JAM 12 MNT)</strong></li>
                <li className="p-2 bg-slate-900 rounded border border-slate-800">● MA KE KOREM 032/WBR : <strong>101 KM (2 JAM 12 MNT)</strong></li>
                <li className="p-2 bg-slate-900 rounded border border-slate-800">● MA KE KODIM 03012/KOTA PADANG : <strong>103 KM (2 JAM 14 MNT)</strong></li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Default Company View for ORGANISASI KOMPI or specific company submenus */}
      {(activeSubmenu === 'organisasi_kompi' || !['data_satuan', 'sejarah_satuan', 'struktur_org', 'pejabat_satuan', 'dislokasi_satuan'].includes(activeSubmenu || '')) && (
        <>
          {/* Top Banner */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-blue-400 font-semibold uppercase tracking-wider mb-1">
                <Building2 className="w-4 h-4 text-blue-400" />
                <span>Unsur Pelaksana Yonif TP • Territorial & Combat Execution Units</span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-100 uppercase tracking-wide">
                DASHBOARD KOMPI-KOMPI YONIF TP
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Monitoring Kesiapan, Produksi & Operasional Kompi Peternakan, Pertanian, Zeni/Konstruksi, Medis/Keslap, Kompi Markas, Kompi A, Kompi B, Kompi C, dan Kompi Bantuan.
              </p>
            </div>

            {/* Company Quick Selector Tabs */}
            <div className="flex items-center gap-1.5 flex-wrap overflow-x-auto pb-1 max-w-full">
              {[
                { id: 'ki_peternakan', label: 'KOMPI PETERNAKAN', color: 'border-emerald-700 text-emerald-400' },
                { id: 'ki_pertanian', label: 'KOMPI PERTANIAN', color: 'border-emerald-700 text-emerald-300' },
                { id: 'ki_zeni', label: 'KOMPI ZENI/KONSTRUKSI', color: 'border-amber-700 text-amber-300' },
                { id: 'ki_medis', label: 'KOMPI MEDIS/KESLAP', color: 'border-blue-700 text-blue-300' },
                { id: 'kima', label: 'KOMPI MARKAS', color: 'border-slate-700 text-slate-300' },
                { id: 'kipana', label: 'KOMPI A', color: 'border-slate-700 text-slate-300' },
                { id: 'kipanb', label: 'KOMPI B', color: 'border-slate-700 text-slate-300' },
                { id: 'kipanc', label: 'KOMPI C', color: 'border-slate-700 text-slate-300' },
                { id: 'kiban', label: 'KOMPI BANTUAN', color: 'border-slate-700 text-slate-300' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => handleSelectCompany(item.id)}
                  className={`px-2.5 py-1 text-[11px] font-mono font-bold rounded border transition-all shrink-0 ${
                    activeCompany === item.id 
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow' 
                      : `bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800`
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 1. KOMPI PETERNAKAN */}
      {/* ------------------------------------------------------------- */}
      {activeCompany === 'ki_peternakan' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400 uppercase">Peleton Unggas</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-emerald-400">12.500 Ekor</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Ayam Layer & Broiler (Produksi 8.200 Telur/Hari)</p>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400 uppercase">Peleton Ruminansia</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-blue-400">320 Ekor</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Sapi Potong & Kambing Perah (Kelahiran: +12 Bln Ini)</p>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400 uppercase">Peleton Perikanan</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-amber-400">18 Ton / Bln</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Ikan Nila, Gurame & Nila Merah (12 Kolam Aktif)</p>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400 uppercase">Stok Pakan & Kantong Log</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-emerald-400">45 Hari</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Silase & Pakan Terintegrasi Mandiri</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
            
            {/* Table Details */}
            <div className="lg:col-span-2 p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
              <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-3 flex items-center justify-between">
                <span>REKAPITULASI SEKTOR PETERNAKAN & PERIKANAN</span>
                <span className="text-xs font-mono text-emerald-400">STATUS: TARGET 100% TERCAPAI</span>
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase bg-slate-950">
                      <th className="py-2.5 px-3">PELETON / KOMODITAS</th>
                      <th className="py-2.5 px-3">POPULASI</th>
                      <th className="py-2.5 px-3">PRODUKSI HARIAN</th>
                      <th className="py-2.5 px-3">KESEHATAN TERNAK</th>
                      <th className="py-2.5 px-3">DISTRIBUSI LOGISTIK</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    <tr className="hover:bg-slate-950/60">
                      <td className="py-2.5 px-3 font-bold text-slate-200">Ton Unggas (Ayam Layer)</td>
                      <td className="py-2.5 px-3 text-emerald-400 font-bold">8.000 Ekor</td>
                      <td className="py-2.5 px-3 text-slate-200">7.200 Butir Telur</td>
                      <td className="py-2.5 px-3 text-emerald-400">Vaksinasi Complete</td>
                      <td className="py-2.5 px-3 text-slate-300">Dapur Satuan & Pasar Rakyat</td>
                    </tr>
                    <tr className="hover:bg-slate-950/60">
                      <td className="py-2.5 px-3 font-bold text-slate-200">Ton Unggas (Ayam Broiler)</td>
                      <td className="py-2.5 px-3 text-emerald-400 font-bold">4.500 Ekor</td>
                      <td className="py-2.5 px-3 text-slate-200">Panen Bekala (45 Hari)</td>
                      <td className="py-2.5 px-3 text-emerald-400">Kondisi Baik</td>
                      <td className="py-2.5 px-3 text-slate-300">Cadangan Bekal Pangan Yonif</td>
                    </tr>
                    <tr className="hover:bg-slate-950/60">
                      <td className="py-2.5 px-3 font-bold text-slate-200">Ton Ruminansia (Sapi Simental)</td>
                      <td className="py-2.5 px-3 text-emerald-400 font-bold">180 Ekor</td>
                      <td className="py-2.5 px-3 text-slate-200">Penggemukan (+1.2kg/hr)</td>
                      <td className="py-2.5 px-3 text-emerald-400">Bebas PMK</td>
                      <td className="py-2.5 px-3 text-slate-300">Program Kedaulatan Daging</td>
                    </tr>
                    <tr className="hover:bg-slate-950/60">
                      <td className="py-2.5 px-3 font-bold text-slate-200">Ton Perikanan (Nila & Patin)</td>
                      <td className="py-2.5 px-3 text-emerald-400 font-bold">120.000 Biji</td>
                      <td className="py-2.5 px-3 text-slate-200">600 kg / Hari</td>
                      <td className="py-2.5 px-3 text-emerald-400">Sirkulasi Air Bioflok</td>
                      <td className="py-2.5 px-3 text-slate-300">Pengolahan Tepung Ikan Yonif</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Side Card */}
            <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-3 font-mono">
              <h3 className="font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-2">
                KANTONG LOGISTIK & PAKAN TERINTEGRASI
              </h3>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Kompi Peternakan mengolah limbah pertanian Kompi Pertanian menjadi pakan konsentrat & fermentasi jerami (silase), menghemat biaya pakan hingga 65%.
              </p>
              <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-1 text-[11px]">
                <div className="text-amber-400 font-bold">LOKASI KANDANG UTAMA:</div>
                <div className="text-slate-300">Sektor Selatan Pangkalan Yonif TP (Koordinat Taktis 0.542, 101.458)</div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. KOMPI PERTANIAN */}
      {/* ------------------------------------------------------------- */}
      {activeCompany === 'ki_pertanian' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400 uppercase">Luas Total Lahan TP</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-emerald-400">250 Hektar</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">210 Ha Aktif, 40 Ha Pengembangan</p>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400 uppercase">Padi & Palawija</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-blue-400">140 Ha</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Estimasi Panen: 840 Ton Gabah</p>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400 uppercase">Sayur & Buah</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-amber-400">45 Ha</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Cabai, Tomat, Jagung, Semangka</p>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400 uppercase">Tanaman Industri</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-emerald-400">25 Ha</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Kelapa Sawit & Serai Wangi</p>
            </div>
          </div>

          <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-4 text-xs">
            <h2 className="font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>PROGRES MUSIM TANAM & TANGGAL PERKIRAAN PANEN</span>
              <span className="text-xs font-mono text-emerald-400">IRIGASI: DUKUNGAN POMPANISASI ZENI 100%</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-2">
                <div className="font-bold text-emerald-400 text-sm">PELETON PADI & PALAWIJA</div>
                <p className="text-slate-300 text-[11px]">Musim Tanam III (Varietas Inpari 32). Tanam: 15 Mei 2026. Perkiraan Panen: 20 Agustus 2026.</p>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full" style={{ width: '75%' }} />
                </div>
                <div className="text-[10px] font-mono text-slate-400">Progres Pertumbuhan: 75% (Fase Pengisian Bulir)</div>
              </div>

              <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-2">
                <div className="font-bold text-amber-400 text-sm">PELETON SAYUR & BUAH</div>
                <p className="text-slate-300 text-[11px]">Hortikultura Terpadu. Panen Harian: 1.5 Ton Sayur Segar untuk Dapur Batalyon & Pasar Lokal.</p>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full" style={{ width: '90%' }} />
                </div>
                <div className="text-[10px] font-mono text-slate-400">Progres Panen: 90% (Panen Bergilir)</div>
              </div>

              <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-2">
                <div className="font-bold text-blue-400 text-sm">PELETON TANAMAN INDUSTRI</div>
                <p className="text-slate-300 text-[11px]">Penyulingan Serai Wangi & Bio-energi. Kapasitas Produksi Minyak: 250 Litre/Bulan.</p>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-400 h-full" style={{ width: '60%' }} />
                </div>
                <div className="text-[10px] font-mono text-slate-400">Progres Penyulingan: 60%</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. KOMPI ZENI / KONSTRUKSI */}
      {/* ------------------------------------------------------------- */}
      {activeCompany === 'ki_zeni' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400 uppercase">Kesiapan Alat Berat (Alkon)</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-emerald-400">12 / 14 Unit</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Excavator, Dozer, Grader, Crane Ready</p>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400 uppercase">Proyek Infrastruktur Aktif</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-amber-400">4 Proyek</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Jembatan Taktis, Irigasi & Rumah Dinas</p>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400 uppercase">Suplai Air Bersih (Bekair)</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-blue-400">120.000 L / Hr</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Instalasi Water Treatment Pangkalan</p>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400 uppercase">Daya Listrik & Solar Cell</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-emerald-400">450 kVA</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Genset Cadangan + Solar PV 50kW</p>
            </div>
          </div>

          <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-4 text-xs font-mono">
            <h2 className="font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-3">
              STATUS PROYEK KONSTRUKSI & FASILITAS YONIF TP
            </h2>

            <div className="space-y-3">
              <div className="p-3 bg-slate-950 rounded border border-slate-800 flex flex-col sm:flex-row justify-between gap-3">
                <div>
                  <div className="font-bold text-slate-200">Proyek 01: Pembangunan Saluran Irigasi Lahan Pertanian Sektor Utara</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Penanggung Jawab: Ton Konstruksi 1 • Target Selesai: 15 Agustus 2026</div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-emerald-400 font-bold">Progres 88%</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px]">TIDAK ADA KENDALA</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded border border-slate-800 flex flex-col sm:flex-row justify-between gap-3">
                <div>
                  <div className="font-bold text-slate-200">Proyek 02: Perbaikan Akses Jalan Taktis & Jembatan Belly Sektor Barat</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Penanggung Jawab: Ton Alkon 2 • Target Selesai: 5 September 2026</div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-amber-400 font-bold">Progres 64%</span>
                  <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 text-[10px]">ON SCHEDULE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4. KOMPI MEDIS / KESLAP */}
      {/* ------------------------------------------------------------- */}
      {activeCompany === 'ki_medis' && (
        <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-4 text-xs font-mono">
          <h2 className="font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-3 flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-emerald-400" />
            KOMPI MEDIS / KESLAP (PELAKSANA KESEHATAN LAPANGAN)
          </h2>
          <p className="text-slate-300">
            Terdiri dari Peleton Tempat Perobatan (Patob), Peleton Evakuasi, dan Peleton Kesehatan Bantuan (Kesban) untuk penyiapan poskes lapangan, ambulans taktis, serta pelayanan medis teritorial.
          </p>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 5. OTHER REGULAR COMPANIES (KIMA, KIPAN A-C, KIBAN) */}
      {/* ------------------------------------------------------------- */}
      {['kima', 'kipana', 'kipanb', 'kipanc', 'kipan1', 'kipan2', 'kipan3', 'kiban'].includes(activeCompany) && (
        <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-4 text-xs font-mono">
          <h2 className="font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-3 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-amber-400" />
              STATUS KESIAPSIAGAAN & OPERASIONAL {
                activeCompany === 'kipana' || activeCompany === 'kipan1' ? 'KOMPI A' :
                activeCompany === 'kipanb' || activeCompany === 'kipan2' ? 'KOMPI B' :
                activeCompany === 'kipanc' || activeCompany === 'kipan3' ? 'KOMPI C' :
                activeCompany === 'kima' ? 'KOMPI MARKAS (KIMA)' :
                activeCompany === 'kiban' ? 'KOMPI BANTUAN' :
                activeCompany.toUpperCase()
              }
            </span>
            <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded font-bold">
              SIAP TEMPURI / READY
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-3 bg-slate-950 rounded border border-slate-800">
              <div className="text-slate-400">KOMANDAN KOMPI</div>
              <div className="text-sm font-bold text-slate-100 mt-1">
                {activeCompany === 'kipana' || activeCompany === 'kipan1' ? 'Ws. Letda Inf Jul Asmi' :
                 activeCompany === 'kipanb' || activeCompany === 'kipan2' ? 'Ws. Letda Inf Ichwan F' :
                 activeCompany === 'kipanc' || activeCompany === 'kipan3' ? 'Ws. Letda Inf Feri Febrian' :
                 activeCompany === 'ki_peternakan' ? 'Ws. Letda Inf Rudi H Purba' :
                 activeCompany === 'ki_pertanian' ? 'Ws. Letda Inf A Irwan' :
                 activeCompany === 'ki_zeni' ? 'Ws. Letda Czi R Chaniago' :
                 activeCompany === 'ki_medis' ? 'Kapten Ckm Frengky H' :
                 activeCompany === 'kima' ? 'Kapten Inf Zul Efendi' : 'Ws. Letda Inf Adik Pebri'}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Sektor Dislokasi Yonif TP 897</div>
            </div>

            <div className="p-3 bg-slate-950 rounded border border-slate-800">
              <div className="text-slate-400">PERSONEL RIILL & SIAP OPS</div>
              <div className="text-xl font-bold text-emerald-400 mt-1">
                {activeCompany === 'kima' ? '107 Org (74 Siap Ops)' : 
                 activeCompany === 'kipana' ? '101 Org (69 Siap Ops)' :
                 activeCompany === 'kipanb' ? '101 Org (63 Siap Ops)' :
                 activeCompany === 'kipanc' ? '100 Org (64 Siap Ops)' :
                 activeCompany === 'kiban' ? '57 Org (41 Siap Ops)' :
                 activeCompany === 'ki_peternakan' ? '49 Org (8 Siap Ops)' :
                 activeCompany === 'ki_pertanian' ? '46 Org (6 Siap Ops)' :
                 activeCompany === 'ki_zeni' ? '68 Org (23 Siap Ops)' :
                 activeCompany === 'ki_medis' ? '38 Org (25 Siap Ops)' : '100 Org'}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">373 Total Siap Ops Satuan</div>
            </div>

            <div className="p-3 bg-slate-950 rounded border border-slate-800">
              <div className="text-slate-400">SENJATA & ALKAPSUS</div>
              <div className="text-xl font-bold text-emerald-400 mt-1">SIAP OPERASIONAL</div>
              <div className="text-[10px] text-slate-500 mt-1">Senjata ARQ-160 & Alkapsus TP Ready</div>
            </div>

            <div className="p-3 bg-slate-950 rounded border border-slate-800">
              <div className="text-slate-400">PROGRAM & DISLOKASI</div>
              <div className="text-sm font-bold text-amber-400 mt-1">
                {activeCompany === 'kipana' || activeCompany === 'kipan1' ? 'Dislokasi Lubuk Basung' :
                 activeCompany === 'kipanb' || activeCompany === 'kipan2' ? 'Dislokasi Lubuk Basung' :
                 activeCompany === 'kipanc' || activeCompany === 'kipan3' ? 'Dislokasi Lubuk Basung' :
                 activeCompany === 'kima' ? 'Makoyon Agam' : 'Dislokasi Sektor Batalyon'}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Lubuk Basung, Agam, Sumbar</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
