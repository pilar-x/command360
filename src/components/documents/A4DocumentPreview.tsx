import React from 'react';
import { GeneratedDocument, DocClassification } from '../../types';
import { Shield, CheckCircle2, FileText, Award, Calendar, Layers } from 'lucide-react';

interface A4DocumentPreviewProps {
  doc: Partial<GeneratedDocument>;
  zoomLevel?: number; // percentage e.g. 100
  showFactBadges?: boolean;
}

export const A4DocumentPreview: React.FC<A4DocumentPreviewProps> = ({
  doc,
  zoomLevel = 100,
  showFactBadges = true
}) => {
  const scale = zoomLevel / 100;

  const getClassificationBadge = (cls?: DocClassification) => {
    switch (cls) {
      case 'Rahasia':
        return 'text-red-700 border-red-500 bg-red-50';
      case 'Terbatas':
        return 'text-amber-700 border-amber-500 bg-amber-50';
      default:
        return 'text-slate-700 border-slate-400 bg-slate-50';
    }
  };

  const docTypeLower = (doc.docType || '').toLowerCase();
  const titleLower = (doc.title || '').toLowerCase();

  // Helper to check document category/type
  const isKeputusanolPeraturan = docTypeLower.includes('keputusan') || 
                                docTypeLower.includes('peraturan') || 
                                docTypeLower.includes('instruksi') || 
                                docTypeLower.includes('salinan') || 
                                docTypeLower.includes('petikan');

  const isPrinhar = docTypeLower.includes('perintah harian') || docTypeLower.includes('prinhar');
  const isTelegramOnly = (docTypeLower.includes('telegram') && !docTypeLower.includes('surat telegram')) || docTypeLower === 't';
  const isSuratTelegram = docTypeLower.includes('surat telegram') || docTypeLower.includes('st/') || docTypeLower.startsWith('st ') || docTypeLower === 'st';
  const isTelegram = isTelegramOnly || isSuratTelegram;
  const isNotaDinas = docTypeLower.includes('nota dinas') || docTypeLower.includes('nd');
  const isLaporan = docTypeLower.includes('laporan') || docTypeLower.startsWith('lap ') || docTypeLower === 'lap';
  const isSuratPengantar = docTypeLower.includes('pengantar') || docTypeLower.includes('speng');
  const isSuratIzinJalan = docTypeLower.includes('izin jalan') || docTypeLower.includes('surat jalan') || docTypeLower.includes('sij/') || docTypeLower.startsWith('sij ') || docTypeLower === 'sij';
  const isSuratIzin = (docTypeLower.includes('surat izin') || docTypeLower.startsWith('si/') || docTypeLower.startsWith('si ') || docTypeLower === 'si' || docTypeLower.includes('izin')) && !isSuratIzinJalan;
  const isSuratJalanOrIzin = (docTypeLower.includes('surat keterangan') || docTypeLower.includes('sket')) && !isSuratIzin && !isSuratIzinJalan;
  const isTelaahanStaf = docTypeLower.includes('telaahan') || docTypeLower.includes('telstaf');
  const isBeritaAcara = docTypeLower.includes('berita acara') || docTypeLower.includes('sertijab');
  const isPiagamOrSertifikat = docTypeLower.includes('piagam') || docTypeLower.includes('sertifikat') || docTypeLower.includes('ijazah');

  return (
    <div className="w-full overflow-x-auto pb-6 flex justify-center bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono">
      <div 
        style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
        className="w-[210mm] min-h-[297mm] bg-white text-slate-900 shadow-2xl p-[20mm] font-serif relative flex flex-col justify-between border border-slate-300 transition-transform duration-200"
      >
        {/* ========================================================================= */}
        {/* CLASSIFICATION TOP BADGE */}
        {/* ========================================================================= */}
        <div className="text-center font-sans font-bold text-xs uppercase tracking-widest mb-4">
          <span className={`px-4 py-0.5 border rounded font-mono text-[10px] ${getClassificationBadge(doc.classification)}`}>
            [ KLASIFIKASI: {doc.classification || 'BIASA'} ]
          </span>
        </div>

        {/* ========================================================================= */}
        {/* HEADER: KOP SURAT / KOP NAMA JABATAN (JU NIS CAJ-06) */}
        {/* ========================================================================= */}
        {isPrinhar || isPiagamOrSertifikat ? (
          /* Kop Nama Jabatan Kasad / Komandan (Center with Emblem) */
          <div className="text-center font-sans space-y-1 mb-6 border-b-2 border-slate-900 pb-4">
            <div className="flex justify-center mb-1">
              <div className="w-12 h-12 bg-amber-500/20 border-2 border-amber-600 rounded-full flex items-center justify-center text-amber-700 font-bold text-xs">
                ★ ★ ★ ★
              </div>
            </div>
            <div className="font-extrabold text-sm uppercase tracking-widest text-slate-950">
              {doc.fromSender?.toUpperCase() || 'KEPALA STAF ANGKATAN DARAT'}
            </div>
          </div>
        ) : isSuratPengantar ? (
          /* Kop Nama Badan for Surat Pengantar (Top Left Kop with Underline, Top Right Tempat/Tanggal - CONTOH 27) */
          <div className="mb-4 font-sans flex justify-between items-start">
            <div className="inline-block border-b-2 border-slate-900 pb-0.5">
              <div className="font-extrabold text-[11px] uppercase tracking-wider text-slate-900 leading-tight">
                TENTARA NASIONAL INDONESIA ANGKATAN DARAT
              </div>
              <div className="font-extrabold text-xs uppercase tracking-wider text-slate-950 leading-tight">
                {doc.fromSender?.includes('Batalyon') ? 'YONIF TP 897 / SINGGALANG' : doc.fromSender?.toUpperCase() || 'MARKAS BESAR ANGKATAN DARAT'}
              </div>
            </div>
            <div className="text-xs text-slate-900 font-medium pt-1">
              {doc.location || 'Padang'}, &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {doc.date || 'Juli 2026'}
            </div>
          </div>
        ) : isNotaDinas || isTelegram || isLaporan || isSuratIzin || isSuratIzinJalan ? (
          /* Kop Nama Badan for Nota Dinas, Telegram, Laporan, Surat Izin & Surat Izin Jalan (Top Left with Underline, CONTOH 22, 23, 24, 25, 28 & 29) */
          <div className="mb-4 font-sans">
            <div className="inline-block border-b-2 border-slate-900 pb-0.5">
              <div className="font-extrabold text-[11px] uppercase tracking-wider text-slate-900 leading-tight">
                TENTARA NASIONAL INDONESIA ANGKATAN DARAT
              </div>
              <div className="font-extrabold text-xs uppercase tracking-wider text-slate-950 leading-tight">
                {doc.fromSender?.includes('Batalyon') ? 'YONIF TP 897 / SINGGALANG' : doc.fromSender?.toUpperCase() || 'MARKAS BESAR ANGKATAN DARAT'}
              </div>
            </div>
          </div>
        ) : (
          /* Kop Nama Badan (Left Aligned - 2 Lines + Rule Line) */
          <div className="border-b-2 border-slate-900 pb-3 mb-5 flex justify-between items-start font-sans">
            <div>
              <div className="font-extrabold text-[11px] uppercase tracking-wider text-slate-900 leading-tight">
                TENTARA NASIONAL INDONESIA ANGKATAN DARAT
              </div>
              <div className="font-extrabold text-xs uppercase tracking-wider text-slate-950 leading-tight">
                {doc.fromSender?.includes('Batalyon') ? 'KODAM XX/TIB • YONIF TP 897/SINGGALANG' : doc.fromSender || 'MARKAS BESAR ANGKATAN DARAT'}
              </div>
              <div className="text-[9px] text-slate-600 font-serif italic mt-0.5">
                {doc.location || 'Padang'}, Sumatera Barat • Juknis Minu TNI AD No. PT: CAJ-06
              </div>
            </div>

            <div className="text-right font-mono text-[10px] text-slate-700">
              <div>Derajat: <span className="font-extrabold text-slate-900 uppercase">{doc.priority || 'BIASA'}</span></div>
              <div>Lampiran: {doc.lampiranList && doc.lampiranList.length > 0 ? `${doc.lampiranList.length} Lembar` : '-'}</div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TITLE & DOCUMENT NUMBER (FORMAT SPECIFIC) */}
        {/* ========================================================================= */}

        {/* FORMAT 1: SURAT TELEGRAM (CONTOH 24 JUKNIS) */}
        {isSuratTelegram ? (
          <div className="font-sans space-y-2 mb-2">
            <div className="text-center font-extrabold text-base tracking-widest uppercase text-slate-950 mb-3">
              SURAT TELEGRAM
            </div>

            <div className="font-sans text-xs mb-2 pl-1 font-mono">
              <div className="flex justify-between items-start mb-1">
                <div className="flex gap-2">
                  <span className="font-bold w-24">DARI</span>
                  <span>: {doc.fromSender?.toUpperCase() || 'KASAD'}</span>
                </div>
                <div className="flex gap-2 pr-2">
                  <span className="font-bold">DERAJAT</span>
                  <span>: {doc.priority?.toUpperCase() || 'KILAT'}</span>
                </div>
              </div>

              <div className="flex justify-between items-start mb-1">
                <div className="flex gap-2">
                  <span className="font-bold w-24">KEPADA</span>
                  <div className="whitespace-pre-line font-medium">
                    : {doc.toRecipient ? (
                      doc.toRecipient.includes('\n') ? doc.toRecipient.toUpperCase() : `1. ${doc.toRecipient.toUpperCase()}\n  2. PANGDAM XX/TIB\n  3. DST .`
                    ) : '1. PANGDAM XX/TIB\n  2. DANYONIF TP 897\n  3. DST .'}
                  </div>
                </div>
                <div className="flex gap-2 pr-2">
                  <span className="font-bold">KLASIFIKASI</span>
                  <span>: {doc.classification?.toUpperCase() || 'BIASA'}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <span className="font-bold w-24">TEMBUSAN</span>
                <div className="whitespace-pre-line font-medium">
                  : {doc.tembusanList && doc.tembusanList.length > 0 ? (
                    doc.tembusanList.map((t, idx) => `${idx + 1}. ${t.toUpperCase()}`).join('\n  ')
                  ) : '1. WAKASAD\n  2. IRJENAD\n  3. DST .'}
                </div>
              </div>
            </div>

            {/* Garis Pemisah Sepanjang Baris */}
            <div className="border-b-2 border-slate-900 my-2"></div>

            <div className="font-mono text-xs font-bold flex justify-between items-center my-2">
              <span>NOMOR: {doc.documentNumber || 'ST/142/VII/2026'}</span>
              <span>TGL: {doc.date ? doc.date.replace(/ /g, '-').toUpperCase() : '30-07-2026'}</span>
            </div>
          </div>
        ) : isTelegramOnly ? (
          /* FORMAT 1B: TELEGRAM (CONTOH 23 JUKNIS) */
          <div className="font-sans space-y-2 mb-2">
            <div className="text-center font-extrabold text-base tracking-widest uppercase text-slate-950 mb-3">
              TELEGRAM
            </div>

            <div className="font-sans text-xs space-y-1.5 mb-2 pl-1 font-mono">
              <div className="flex gap-2">
                <span className="font-bold w-24">DARI</span>
                <span>: {doc.fromSender?.toUpperCase() || 'KASAD'}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold w-24">KEPADA</span>
                <div className="whitespace-pre-line font-medium">
                  : {doc.toRecipient ? (
                    doc.toRecipient.includes('\n') ? doc.toRecipient.toUpperCase() : `1. ${doc.toRecipient.toUpperCase()}\n  2. PANGDAM XX/TIB\n  3. DST .`
                  ) : '1. PANGDAM XX/TIB\n  2. DANYONIF TP 897\n  3. DST .'}
                </div>
              </div>
              <div className="flex gap-2">
                <span className="font-bold w-24">TEMBUSAN</span>
                <div className="whitespace-pre-line font-medium">
                  : {doc.tembusanList && doc.tembusanList.length > 0 ? (
                    doc.tembusanList.map((t, idx) => `${idx + 1}. ${t.toUpperCase()}`).join('\n  ')
                  ) : '1. WAKASAD\n  2. IRJENAD\n  3. DST .'}
                </div>
              </div>
            </div>

            {/* Garis Pemisah Sepanjang Baris */}
            <div className="border-b-2 border-slate-900 my-2"></div>

            <div className="font-mono text-xs font-bold space-y-1 my-2">
              <div>KLASIFIKASI: {doc.classification?.toUpperCase() || 'BIASA'}</div>
              <div className="flex justify-between items-center">
                <span>NOMOR : {doc.documentNumber || 'TR/142/VII/2026'}</span>
                <span>TGL: {doc.date ? doc.date.replace(/ /g, '-').toUpperCase() : '30-07-2026'}</span>
              </div>
            </div>
          </div>
        ) : isSuratPengantar ? (
          /* FORMAT 8: SURAT PENGANTAR (CONTOH 27 JUKNIS) */
          <div className="font-sans text-xs space-y-3 mb-4 my-2">
            <div className="flex justify-between items-start">
              {/* Left Side: Nomor & Klasifikasi */}
              <div className="space-y-1 w-1/2">
                <div className="flex gap-2">
                  <span className="font-semibold w-20">Nomor</span>
                  <span>: {doc.documentNumber || 'B/ Speng- 14 /VII/2026'}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold w-20">Klasifikasi</span>
                  <span>: {doc.classification || 'Biasa'}</span>
                </div>
              </div>

              {/* Right Side: Kepada Yth. & Alamat */}
              <div className="w-1/2 pl-8 space-y-0.5">
                <div className="pl-6">Kepada</div>
                <div className="flex gap-1">
                  <span className="font-semibold">Yth.</span>
                  <div className="font-medium">
                    {doc.toRecipient || 'Panglima Kodam XX/Tib'}
                  </div>
                </div>
                <div className="pl-6">di</div>
                <div className="pl-12 font-medium">
                  {doc.location || 'Padang'}
                </div>
              </div>
            </div>

            {/* Title centered */}
            <div className="text-center font-extrabold text-sm uppercase tracking-wider text-slate-950 pt-2">
              SURAT PENGANTAR
            </div>
          </div>
        ) : isNotaDinas ? (
          /* FORMAT 2: NOTA DINAS (CONTOH 22 JUKNIS) */
          <div className="font-sans my-3">
            <div className="text-center font-extrabold text-base tracking-wider uppercase text-slate-950">
              Nota Dinas
            </div>
            <div className="text-center font-sans text-xs font-bold text-slate-900 mb-4">
              Nomor {doc.documentNumber || 'B/ND-45/VII/2026/Sops'}
            </div>

            <div className="font-sans text-xs space-y-2 mb-2 pl-2">
              <div className="flex gap-2">
                <span className="font-bold w-24">Kepada Yth.</span>
                <span>: {doc.toRecipient || 'Asisten Operasi Kasad'}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold w-24">Dari</span>
                <span>: {doc.fromSender || 'Kasubditbincab Ditajenad'}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold w-24">Perihal</span>
                <span className="font-bold underline">: {doc.perihal || doc.title || 'Laporan Kesiapsiagaan Dan Rencana Latihan'}</span>
              </div>
            </div>

            <div className="border-b-2 border-slate-900 my-3"></div>
          </div>
        ) : isLaporan ? (
          /* FORMAT 7: LAPORAN (CONTOH 25 JUKNIS) */
          <div className="text-center my-4 font-sans space-y-1">
            <div className="text-sm font-extrabold tracking-wider uppercase text-slate-950">
              LAPORAN TENTANG
            </div>
            <div className="text-sm font-extrabold tracking-wider uppercase text-slate-950 underline max-w-xl mx-auto">
              {doc.perihal?.toUpperCase() || doc.title?.toUpperCase() || 'PELAKSANAAN TUGAS DAN KESIAPSIAGAAN SATUAN'}
            </div>
          </div>
        ) : isSuratIzinJalan ? (
          /* FORMAT 10: SURAT IZIN JALAN (CONTOH 29 JUKNIS) */
          <div className="text-center my-3 font-sans space-y-1">
            <div className="text-sm font-extrabold tracking-wider uppercase text-slate-950">
              SURAT IZIN JALAN
            </div>
            <div className="text-xs font-mono font-bold text-slate-800">
              Nomor SIJ/ {doc.documentNumber || '24 /VII/2026'}
            </div>
          </div>
        ) : isSuratIzin ? (
          /* FORMAT 9: SURAT IZIN (CONTOH 28 JUKNIS) */
          <div className="text-center my-3 font-sans space-y-1">
            <div className="text-sm font-extrabold tracking-wider uppercase text-slate-950">
              SURAT IZIN
            </div>
            <div className="text-xs font-mono font-bold text-slate-800">
              Nomor SI/ {doc.documentNumber || '18 /VII/2026'}
            </div>
          </div>
        ) : isKeputusanolPeraturan ? (
          /* FORMAT 3: KEPUTUSAN / PERATURAN / INSTRUKSI */
          <div className="text-center my-3 font-sans space-y-1.5">
            <div className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
              {doc.docType?.includes('Peraturan') ? 'PERATURAN' : doc.docType?.includes('Instruksi') ? 'INSTRUKSI' : 'KEPUTUSAN'} KEPALA STAF ANGKATAN DARAT
            </div>
            <div className="text-xs font-mono font-bold text-slate-800">
              Nomor {doc.documentNumber || 'Kep/548/VI/2026'}
            </div>
            <div className="text-xs font-serif italic text-slate-700">tentang</div>
            <h2 className="text-sm font-extrabold uppercase text-slate-950 max-w-lg mx-auto leading-tight">
              {doc.perihal || doc.title}
            </h2>
            {doc.docType?.includes('Peraturan') && (
              <div className="text-[10px] font-bold text-slate-800 pt-1 tracking-widest">
                DENGAN RAHMAT TUHAN YANG MAHA ESA
              </div>
            )}
            <div className="text-xs font-bold uppercase text-slate-900 pt-1">
              KEPALA STAF ANGKATAN DARAT,
            </div>
          </div>
        ) : isTelaahanStaf ? (
          /* FORMAT 4: TELAAHAN STAF */
          <div className="text-center my-3 font-sans space-y-1">
            <div className="text-sm font-extrabold underline uppercase text-slate-950">
              TELAAHAN STAF
            </div>
            <div className="text-xs font-serif italic font-bold text-slate-800">TENTANG</div>
            <h2 className="text-xs font-extrabold uppercase text-slate-900 max-w-lg mx-auto">
              {doc.perihal || doc.title}
            </h2>
            <div className="text-[10px] font-mono text-slate-600 pt-1">
              NOMOR: {doc.documentNumber || 'TS/12/VII/2026/Sops'}
            </div>
          </div>
        ) : isPiagamOrSertifikat ? (
          /* FORMAT 5: PIAGAM PENGHARGAAN / SERTIFIKAT */
          <div className="text-center my-4 font-sans space-y-2">
            <div className="text-lg font-extrabold tracking-widest uppercase underline text-slate-950">
              {doc.docType?.toUpperCase() || 'PIAGAM PENGHARGAAN'}
            </div>
            <div className="text-xs font-mono font-bold text-slate-800">
              NOMOR {doc.documentNumber || 'PP/08/VII/2026'}
            </div>
            <p className="text-xs font-serif italic text-slate-800 pt-2">
              Memberikan penghargaan sebesar-besarnya kepada:
            </p>
          </div>
        ) : (
          /* FORMAT 6: SURAT PERINTAH / SURAT DINAS STANDARD */
          <div className="text-center my-3 font-sans space-y-1">
            <h1 className="text-sm font-extrabold uppercase underline tracking-wider text-slate-950">
              {doc.docType ? doc.docType.toUpperCase() : 'SURAT PERINTAH'}
            </h1>
            <div className="text-xs font-mono font-bold text-slate-800">
              NOMOR: {doc.documentNumber || 'Sprin/ 142 / VII / 2026'}
            </div>
            {doc.perihal && (
              <div className="text-xs font-serif italic text-slate-700 pt-1">
                Perihal: {doc.perihal}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* KONSIDERANS SECTION (MENIMBANG / MENGINGAT / MEMPERHATIKAN) */}
        {/* ========================================================================= */}
        {isKeputusanolPeraturan && (
          <div className="text-xs font-serif space-y-2 my-3">
            <div className="grid grid-cols-12 gap-2">
              <span className="font-bold font-sans text-slate-900 col-span-3">Menimbang</span>
              <span className="col-span-9 text-slate-900 leading-relaxed">
                : a. bahwa dalam rangka alih tugas dan kelancaran organisasi, perlu dikeluarkan {doc.docType};<br/>
                &nbsp;&nbsp;b. bahwa nama yang tercantum dalam keputusan ini memenuhi syarat jabatan.
              </span>
            </div>
            <div className="grid grid-cols-12 gap-2">
              <span className="font-bold font-sans text-slate-900 col-span-3">Mengingat</span>
              <span className="col-span-9 text-slate-900 leading-relaxed">
                : 1. Keputusan Kasad No. Kep/430/X/2013 tentang Garminu AD;<br/>
                &nbsp;&nbsp;2. Keputusan Kasad No. Kep/548/VI/2016 tentang Juknis Tuldis AD.
              </span>
            </div>
            <div className="text-center font-sans font-extrabold text-xs tracking-widest my-2 uppercase">
              MEMUTUSKAN:
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* DASAR LIST (FOR SURAT PERINTAH / SURAT TUGAS / SURAT EDARAN) */}
        {/* ========================================================================= */}
        {!isKeputusanolPeraturan && !isTelegram && !isPrinhar && !isLaporan && !isSuratIzin && !isSuratIzinJalan && doc.dasarList && doc.dasarList.length > 0 && (
          <div className="text-xs space-y-1.5 my-3">
            <div className="font-sans font-bold text-slate-900 uppercase">DASAR / RUJUKAN:</div>
            <ol className="list-decimal pl-6 space-y-1 text-slate-800 leading-relaxed font-serif">
              {doc.dasarList.map((dasar, idx) => (
                <li key={idx}>
                  <span>{dasar}</span>
                  {showFactBadges && (
                    <span className="inline-flex items-center gap-0.5 ml-2 text-[9px] font-mono px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded border border-emerald-300">
                      <CheckCircle2 className="w-2.5 h-2.5" /> VERIFIED
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MAIN CONTENT / URAIAN BODY */}
        {/* ========================================================================= */}
        <div className="text-xs space-y-3 my-3 flex-1">
          {isSuratPengantar ? (
            /* SPECIAL LAYOUT: SURAT PENGANTAR TABLE (CONTOH 27 JUKNIS) */
            <div className="space-y-3 font-sans">
              <table className="w-full border-collapse border border-slate-900 text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-950 font-bold uppercase">
                    <th className="border border-slate-900 p-2 w-12 text-center">NO.</th>
                    <th className="border border-slate-900 p-2 text-center">ISI</th>
                    <th className="border border-slate-900 p-2 w-32 text-center">BANYAKNYA</th>
                    <th className="border border-slate-900 p-2 text-center">KETERANGAN</th>
                  </tr>
                  <tr className="bg-slate-100 text-slate-700 text-[10px] font-mono">
                    <th className="border border-slate-900 p-1 text-center">1</th>
                    <th className="border border-slate-900 p-1 text-center">2</th>
                    <th className="border border-slate-900 p-1 text-center">3</th>
                    <th className="border border-slate-900 p-1 text-center">4</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="align-top">
                    <td className="border border-slate-900 p-3 text-center font-mono">1.</td>
                    <td className="border border-slate-900 p-3 font-serif text-slate-900 leading-relaxed">
                      {doc.title || doc.perihal || 'Laporan Kesiapsiagaan Operasional dan Evaluasi Latihan Satuan Triwulan II TA 2026.'}
                    </td>
                    <td className="border border-slate-900 p-3 text-center font-mono text-slate-900">
                      1 (satu) berkas
                    </td>
                    <td className="border border-slate-900 p-3 font-serif text-slate-900 leading-relaxed">
                      {doc.uraianContent || 'Dikirim dengan hormat untuk dijadikan pedoman dan bahan pertimbangan pimpinan.'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : isTelegram ? (
            /* SPECIAL LAYOUT: CONTOH 23 TELEGRAM BODY (Arial 10 Uppercase / TTK format) */
            <div className="font-mono text-xs uppercase leading-relaxed tracking-wide text-slate-900 space-y-2 text-justify p-1">
              {doc.uraianContent ? (
                <div className="whitespace-pre-line">{doc.uraianContent.toUpperCase()}</div>
              ) : (
                <div className="space-y-2">
                  <p>AAA TTK DASAR TTK DUA</p>
                  <p className="pl-4">SATU TTK SURAT PERINTAH KASAD NOMOR SPRIN/134/I/2026 TANGGAL 18 JANUARI 2026 TTK</p>
                  <p className="pl-4">DUA TTK PERINTAH PANGDAM XX/TIB TENTANG KESIAPSIAGAAN OPERASIONAL TTK</p>
                  <p>BBB TTK SEHUBUNGAN DASAR DI ATAS KMA KEPADA ADALAH SBG BERIKUT TTK DUA</p>
                  <p className="pl-4">SATU TTK MELAKSANAKAN APEL KESIAPSIAGAAN BENCANA ALAM PADA TANGGAL 30 JULI 2026 TTK</p>
                  <p className="pl-4">DUA TTK MELAPORKAN HASIL PELAKSANAAN DENGAN KESEMPATAN PERTAMA TTK</p>
                  <p>CCC TTK KOORDINASI TEKNIS DILAKSANAKAN DENGAN PASI OPS SATUAN TTK</p>
                  <p>DDD TTK UMP TTK AN KASAD KMA ASOPS KRM TTK HBS</p>
                </div>
              )}
            </div>
          ) : isSuratJalanOrIzin ? (
            /* SPECIAL LAYOUT: SURAT IZIN JALAN / SURAT KETERANGAN GRID */
            <div className="space-y-3 font-sans">
              <div className="font-bold text-slate-900 uppercase">DIBERIKAN KEPADA / MENERANGKAN BAHWA:</div>
              <div className="p-3 bg-slate-50 border border-slate-300 rounded space-y-1.5 font-serif">
                <div className="grid grid-cols-6"><span className="font-bold col-span-2">Nama Lengkap</span><span className="col-span-4">: {doc.toRecipient || 'Sertu Danang Setiawan'}</span></div>
                <div className="grid grid-cols-6"><span className="font-bold col-span-2">Pangkat / NRP</span><span className="col-span-4">: Sertu / 2105013474</span></div>
                <div className="grid grid-cols-6"><span className="font-bold col-span-2">Jabatan / Kesatuan</span><span className="col-span-4">: Danru 2 Ki-A / Yonif TP 897</span></div>
                <div className="grid grid-cols-6"><span className="font-bold col-span-2">Tempat Tujuan</span><span className="col-span-4">: {doc.location || 'Padang - Agam'}</span></div>
                <div className="grid grid-cols-6"><span className="font-bold col-span-2">Keperluan / Maksud</span><span className="col-span-4">: {doc.perihal || doc.maksud}</span></div>
                <div className="grid grid-cols-6"><span className="font-bold col-span-2">Waktu / Berangkat</span><span className="col-span-4">: {doc.waktu || doc.date}</span></div>
              </div>
              <div className="whitespace-pre-line text-slate-900 font-serif leading-relaxed text-justify pt-2">
                {doc.uraianContent}
              </div>
            </div>
          ) : isLaporan ? (
            /* SPECIAL LAYOUT: CONTOH 25 LAPORAN BODY */
            <div className="space-y-3 font-serif text-xs text-slate-900 leading-relaxed">
              <div>
                <div className="font-sans font-bold uppercase text-slate-950">A. PENDAHULUAN</div>
                <div className="pl-4 space-y-1 mt-1">
                  <div>
                    <span className="font-sans font-semibold">1. Umum. </span>
                    <span>Bahwa laporan ini disusun sebagai bentuk pertanggungjawaban pelaksanaan tugas kedinasan di lingkungan TNI Angkatan Darat.</span>
                  </div>
                  <div>
                    <span className="font-sans font-semibold">2. Maksud dan Tujuan. </span>
                    <span>{doc.maksud || `Maksud laporan ini untuk memberikan gambaran pelaksanaan kegiatan, sedangkan tujuannya sebagai bahan pertimbangan pimpinan dalam menentukan kebijakan.`}</span>
                  </div>
                  <div>
                    <span className="font-sans font-semibold">3. Ruang Lingkup dan Tata Urut. </span>
                    <span>Laporan ini meliputi pendahuluan, kegiatan yang dilaksanakan, hasil yang dicapai, kesimpulan dan saran, serta penutup.</span>
                  </div>
                  <div>
                    <span className="font-sans font-semibold">4. Dasar. </span>
                    <span>
                      {doc.dasarList && doc.dasarList.length > 0 
                        ? doc.dasarList.join('; ') 
                        : 'Surat Perintah dan Petunjuk Teknis Tata Tulisan Dinas TNI Angkatan Darat (PT: CAJ-06).'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="font-sans font-bold uppercase text-slate-950">B. KEGIATAN YANG DILAKSANAKAN</div>
                <div className="pl-4 mt-1 text-justify whitespace-pre-line">
                  {doc.uraianContent || 'Melaksanakan seluruh tahapan operasi/kegiatan sesuai rencana kerja dan perintah komando atas secara tertib dan terukur.'}
                </div>
              </div>

              <div>
                <div className="font-sans font-bold uppercase text-slate-950">C. HASIL YANG DICAPAI</div>
                <div className="pl-4 mt-1 text-justify">
                  Seluruh sasaran kegiatan dapat diselesaikan dengan aman, tertib, dan memenuhi target kinerja yang ditetapkan satuan.
                </div>
              </div>

              <div>
                <div className="font-sans font-bold uppercase text-slate-950">D. KESIMPULAN DAN SARAN</div>
                <div className="pl-4 mt-1 space-y-1">
                  <div><span className="font-sans font-semibold">1. Kesimpulan. </span>Pelaksanaan tugas berjalan lancar dengan koordinasi lintas staf yang efektif.</div>
                  <div><span className="font-sans font-semibold">2. Saran. </span>Disarankan agar dukungan logistik dan alokasi personel terus dioptimalkan untuk kegiatan mendatang.</div>
                </div>
              </div>

              <div>
                <div className="font-sans font-bold uppercase text-slate-950">E. PENUTUP</div>
                <div className="pl-4 mt-1 text-justify">
                  Demikian Laporan ini dibuat sebagai bahan masukan dan pertimbangan pimpinan.
                </div>
              </div>
            </div>
          ) : isSuratIzinJalan ? (
            /* SPECIAL LAYOUT: CONTOH 29 SURAT IZIN JALAN BODY */
            <div className="space-y-2.5 font-serif text-xs text-slate-900 leading-relaxed">
              <div className="font-sans font-semibold text-slate-950 mb-1">Diberikan Kepada :</div>
              
              <div className="space-y-1.5 pl-2">
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-4 font-sans font-medium">Nama</span>
                  <span className="col-span-8 font-semibold text-slate-950">: {doc.toRecipient || 'Sertu Danang Setiawan'}</span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-4 font-sans font-medium">Pangkat, Korps, NRP</span>
                  <span className="col-span-8">: {doc.pangkatNrp || 'Sertu / Inf / 2105013474'}</span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-4 font-sans font-medium">Jabatan</span>
                  <span className="col-span-8">: {doc.jabatan || 'Danru 2 Ki-A'}</span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-4 font-sans font-medium">Kesatuan</span>
                  <span className="col-span-8">: {doc.kesatuan || 'Yonif TP 897 / Singgalang'}</span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-4 font-sans font-medium">Pengikut</span>
                  <div className="col-span-8">
                    {doc.pengikutList && doc.pengikutList.length > 0 ? (
                      doc.pengikutList.map((p, idx) => (
                        <div key={idx}>: {idx + 1}. {p}</div>
                      ))
                    ) : (
                      <div className="space-y-0.5">
                        <div>: 1. Serda Budianto (Wadanru)</div>
                        <div className="pl-2.5">2. Kopda Ahmad (Pengemudi)</div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-4 font-sans font-medium">Pergi dari</span>
                  <span className="col-span-8">: {doc.location || 'Padang'}</span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-4 font-sans font-medium">Tempat Tujuan</span>
                  <span className="col-span-8">: {doc.tujuan || 'Bukittinggi - Agam'}</span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-4 font-sans font-medium">Keperluan</span>
                  <span className="col-span-8">: {doc.perihal || doc.maksud || 'Melaksanakan tugas koordinasi lapangan dan patroli pengawasan teritorial.'}</span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-4 font-sans font-medium">Berkendaraan</span>
                  <span className="col-span-8">: {doc.kendaraan || 'Dinas (Roda 4 Land Cruiser)'}</span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-4 font-sans font-medium">Berangkat tanggal</span>
                  <span className="col-span-8">: {doc.date || '30 Juli 2026'}</span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-4 font-sans font-medium">Kembali tanggal</span>
                  <span className="col-span-8">: {doc.kembaliDate || '05 Agustus 2026'}</span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-4 font-sans font-medium">Catatan</span>
                  <span className="col-span-8">: {doc.uraianContent || 'Menjaga tata tertib, mengutamakan faktor keamanan, dan melapor ke Kodim/Koramil setempat.'}</span>
                </div>
              </div>
            </div>
          ) : isSuratIzin ? (
            /* SPECIAL LAYOUT: CONTOH 28 SURAT IZIN BODY */
            <div className="space-y-3 font-serif text-xs text-slate-900 leading-relaxed">
              {/* Dasar */}
              <div className="flex gap-2">
                <span className="font-sans font-semibold w-28">Dasar</span>
                <div className="flex-1 space-y-0.5">
                  {doc.dasarList && doc.dasarList.length > 0 ? (
                    doc.dasarList.map((d, idx) => (
                      <div key={idx} className="flex gap-1">
                        <span>{idx + 1}.</span>
                        <span>{d}</span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex gap-1">
                        <span>1.</span>
                        <span>Pertimbangan pimpinan Batalyon Infanteri TP 897 / Singgalang.</span>
                      </div>
                      <div className="flex gap-1">
                        <span>2.</span>
                        <span>Petunjuk Teknis Minu TNI AD No. PT: CAJ-06 tentang Tata Tulis Dinas.</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Pertimbangan */}
              <div className="flex gap-2">
                <span className="font-sans font-semibold w-28">Pertimbangan</span>
                <div className="flex-1 space-y-0.5">
                  {doc.pertimbanganList && doc.pertimbanganList.length > 0 ? (
                    doc.pertimbanganList.map((p, idx) => (
                      <div key={idx} className="flex gap-1">
                        <span>{idx + 1}.</span>
                        <span>{p}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex gap-1">
                      <span>1.</span>
                      <span>Bahwa untuk kepentingan kedinasan dan urusan keluarga yang bersangkutan, perlu dikeluarkan Surat Izin.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* DIIZINKAN centered bold */}
              <div className="text-center font-sans font-extrabold text-sm uppercase tracking-widest text-slate-950 py-2">
                DIIZINKAN
              </div>

              {/* Kepada */}
              <div className="flex gap-2">
                <span className="font-sans font-semibold w-28">Kepada</span>
                <div className="flex-1 space-y-0.5">
                  <div className="flex gap-1">
                    <span>1.</span>
                    <span>
                      <strong className="font-sans">{doc.toRecipient || 'Sertu Danang Setiawan'}</strong> — NRP {doc.nrp || '2105013474'}, Jabatan Danru 2 Ki-A Yonif TP 897.
                    </span>
                  </div>
                </div>
              </div>

              {/* Untuk */}
              <div className="flex gap-2">
                <span className="font-sans font-semibold w-28">Untuk</span>
                <div className="flex-1 space-y-1">
                  <div className="flex gap-1">
                    <span>a.</span>
                    <span>{doc.perihal || doc.maksud || 'Melaksanakan izin dinas / urusan keluarga di daerah Padang - Agam.'}</span>
                  </div>
                  <div className="flex gap-1">
                    <span>b.</span>
                    <span>{doc.waktu || 'Berlaku mulai tanggal 30 Juli 2026 s.d. 05 Agustus 2026.'}</span>
                  </div>
                  <div className="flex gap-1">
                    <span>c.</span>
                    <span>{doc.uraianContent || 'Menjaga nama baik TNI AD dan melaporkan diri kepada pejabat teritorial setempat.'}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : isTelaahanStaf ? (
            /* SPECIAL LAYOUT: TELAAHAN STAF */
            <div className="space-y-3 font-serif">
              <div><strong className="font-sans">1. PERSOALAN:</strong><p className="pl-4 text-justify mt-0.5">{doc.maksud || doc.perihal}</p></div>
              <div><strong className="font-sans">2. PRAANGGAPAN:</strong><p className="pl-4 text-justify mt-0.5">Bahwa alokasi personel dan sarpras siap dioperasikan dalam waktu 24 jam.</p></div>
              <div><strong className="font-sans">3. FAKTA-FAKTA YANG MEMENGARUHI:</strong><p className="pl-4 text-justify mt-0.5">{doc.uraianContent}</p></div>
              <div><strong className="font-sans">4. KESIMPULAN:</strong><p className="pl-4 text-justify mt-0.5">Langkah taktis penanganan berjalan efektif jika didukung koordinasi teritorial.</p></div>
              <div><strong className="font-sans">5. SARAN TINDAKAN:</strong><p className="pl-4 text-justify mt-0.5">Disarankan Komandan menerbitkan Surat Perintah resmi.</p></div>
            </div>
          ) : (
            /* STANDARD BODY CONTENT */
            <div className="whitespace-pre-line text-slate-900 font-serif leading-relaxed text-justify border-l-2 border-slate-200 pl-4 py-1">
              {doc.uraianContent || (
                <span className="text-slate-400 italic">
                  [Uraian dokumen belum dihasilkan. Silakan isi parameter data dan tekan tombol Generate AI.]
                </span>
              )}
            </div>
          )}
        </div>

        {/* Fact Verification Summary Box (If showFactBadges) */}
        {showFactBadges && doc.factVerification && (
          <div className="my-3 p-2.5 bg-slate-50 border border-slate-300 rounded font-sans text-[10px] space-y-1">
            <div className="font-bold text-slate-800 flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald-600" />
              <span>COMMAND360 FACT CHECK & JUKNIS MILITER AUDIT:</span>
            </div>
            <div className="flex flex-wrap gap-2 text-[9px] font-mono">
              <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                🟢 Verified System Facts: {doc.factVerification.verifiedFacts?.length || 0}
              </span>
              <span className="text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                🟡 Operator Inputs: {doc.factVerification.userInputFacts?.length || 0}
              </span>
              {doc.factVerification.missingFacts && doc.factVerification.missingFacts.length > 0 && (
                <span className="text-red-700 bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                  🔴 Missing Required Info: {doc.factVerification.missingFacts.length}
                </span>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SIGNATURE & ENDORSEMENT BLOCK (TAJUK TANDA TANGAN JUKNIS) */}
        {/* ========================================================================= */}
        {isTelegram ? (
          <div className="w-full space-y-2 font-sans mt-4">
            <div className="border-b-2 border-slate-900 my-2"></div>
            <div className="flex justify-end">
              <div className="text-center font-sans space-y-1 min-w-[220px]">
                <div className="text-xs font-bold uppercase text-slate-950">
                  {doc.fromSender?.includes('Batalyon') ? 'KOMANDAN BATALYON INFANTERI TP 897,' : doc.fromSender ? `${doc.fromSender.toUpperCase()},` : 'AN. KASAD\nASOPS,'}
                </div>

                <div className="my-2 py-1 flex justify-center">
                  {doc.workflowStage === 'APPROVED' || doc.workflowStage === 'FINAL' ? (
                    <div className="border-2 border-emerald-600 text-emerald-700 font-extrabold text-[9px] px-2 py-0.5 rounded uppercase tracking-wider rotate-[-2deg] flex items-center gap-1 shadow-sm">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>DISAHKAN & VERIFIED</span>
                    </div>
                  ) : (
                    <div className="border border-dashed border-slate-400 text-slate-400 font-mono text-[9px] px-2 py-1 rounded">
                      [DRAFT TELEGRAM]
                    </div>
                  )}
                </div>

                <div className="text-xs font-extrabold uppercase text-slate-950">
                  {doc.approvedBy || doc.createdBy || 'SAOR J. LUMBANBATU'}
                </div>
                <div className="text-xs font-bold uppercase text-slate-900">
                  LETNAN KOLONEL INF
                </div>
              </div>
            </div>
          </div>
        ) : isSuratPengantar ? (
          <div className="mt-6 pt-3 flex justify-between items-end font-sans">
            {/* Left Side: Tembusan with Underline */}
            <div className="text-xs text-slate-900 space-y-1">
              <div className="inline-block border-b border-slate-900 pb-1 pr-6">
                <div className="font-bold">Tembusan:</div>
                <ol className="list-none space-y-0.5 pl-1 font-serif text-[11px]">
                  {doc.tembusanList && doc.tembusanList.length > 0 ? (
                    doc.tembusanList.map((t, idx) => (
                      <li key={idx}>{idx + 1}. {t}</li>
                    ))
                  ) : (
                    <>
                      <li>1. Kasad</li>
                      <li>2. Pangdam XX/Tib</li>
                      <li>3. Aster Kasad</li>
                    </>
                  )}
                </ol>
              </div>
            </div>

            {/* Right Side: Pengirim + Nama Jabatan + Stamp + Nama + Pangkat */}
            <div className="text-center font-sans space-y-1 min-w-[220px]">
              <div className="text-xs text-slate-900 font-medium">
                Pengirim
              </div>
              <div className="text-xs font-bold text-slate-950 leading-snug">
                {doc.fromSender ? `${doc.fromSender},` : 'Komandan Batalyon Infanteri TP 897,'}
              </div>

              {/* Stamp / Verified Signature Badge */}
              <div className="my-2 py-1.5 flex justify-center">
                {doc.workflowStage === 'APPROVED' || doc.workflowStage === 'FINAL' ? (
                  <div className="border-2 border-emerald-600 text-emerald-700 font-extrabold text-[10px] px-3 py-1 rounded uppercase tracking-wider rotate-[-2deg] flex items-center gap-1 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>DISAHKAN & VERIFIED COMMAND360</span>
                  </div>
                ) : (
                  <div className="border border-dashed border-slate-400 text-slate-400 font-mono text-[9px] px-2.5 py-2 rounded">
                    [DRAFT - BELUM DITANDATANGANI]
                  </div>
                )}
              </div>

              <div className="text-xs font-bold text-slate-950">
                {doc.approvedBy || doc.createdBy || 'Saor J. Lumbanbatu'}
              </div>
              <div className="text-[11px] text-slate-800 font-medium">
                Letnan Kolonel Inf
              </div>
            </div>
          </div>
        ) : isSuratIzin || isSuratIzinJalan ? (
          <div className="mt-6 pt-3 flex justify-between items-end font-sans">
            {/* Left Side: Tembusan with Underline */}
            <div className="text-xs text-slate-900 space-y-1">
              <div className="inline-block border-b border-slate-900 pb-1 pr-6">
                <div className="font-bold">Tembusan:</div>
                <ol className="list-none space-y-0.5 pl-1 font-serif text-[11px]">
                  {doc.tembusanList && doc.tembusanList.length > 0 ? (
                    doc.tembusanList.map((t, idx) => (
                      <li key={idx}>{idx + 1}. {t}</li>
                    ))
                  ) : (
                    <>
                      <li>1. Kasad</li>
                      <li>2. Pangdam XX/Tib</li>
                      <li>3. Danrem 032/Wbr</li>
                    </>
                  )}
                </ol>
              </div>
            </div>

            {/* Right Side: Dikeluarkan di / pada tanggal + Underline + Signature */}
            <div className="text-center font-sans space-y-1 min-w-[240px]">
              <div className="text-xs text-slate-900 font-medium">
                Dikeluarkan di {doc.location || 'Padang'}
              </div>
              <div className="text-xs text-slate-900 font-medium pb-1 border-b border-slate-900">
                pada tanggal {doc.date || '30 Juli 2026'}
              </div>
              <div className="text-xs font-bold text-slate-950 pt-1 leading-snug">
                {doc.fromSender ? `${doc.fromSender},` : 'Komandan Batalyon Infanteri TP 897,'}
              </div>

              {/* Stamp / Verified Signature Badge */}
              <div className="my-2 py-1.5 flex justify-center">
                {doc.workflowStage === 'APPROVED' || doc.workflowStage === 'FINAL' ? (
                  <div className="border-2 border-emerald-600 text-emerald-700 font-extrabold text-[10px] px-3 py-1 rounded uppercase tracking-wider rotate-[-2deg] flex items-center gap-1 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>DISAHKAN & VERIFIED COMMAND360</span>
                  </div>
                ) : (
                  <div className="border border-dashed border-slate-400 text-slate-400 font-mono text-[9px] px-2.5 py-2 rounded">
                    [DRAFT - BELUM DITANDATANGANI]
                  </div>
                )}
              </div>

              <div className="text-xs font-bold text-slate-950">
                {doc.approvedBy || doc.createdBy || 'Saor J. Lumbanbatu'}
              </div>
              <div className="text-[11px] text-slate-800 font-medium">
                Letnan Kolonel Inf
              </div>
            </div>
          </div>
        ) : isLaporan ? (
          <div className="mt-6 pt-3 flex justify-end font-sans">
            <div className="text-center font-sans space-y-1 min-w-[240px]">
              <div className="text-xs text-slate-900 font-medium">
                {doc.location || 'Padang'}, {doc.date || '30 Juli 2026'}
              </div>
              <div className="text-xs font-bold text-slate-950 pt-1 leading-snug">
                {doc.fromSender ? `${doc.fromSender},` : 'Komandan Batalyon Infanteri TP 897,'}
              </div>

              {/* Stamp / Verified Signature Badge */}
              <div className="my-2 py-1.5 flex justify-center">
                {doc.workflowStage === 'APPROVED' || doc.workflowStage === 'FINAL' ? (
                  <div className="border-2 border-emerald-600 text-emerald-700 font-extrabold text-[10px] px-3 py-1 rounded uppercase tracking-wider rotate-[-2deg] flex items-center gap-1 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>DISAHKAN & VERIFIED COMMAND360</span>
                  </div>
                ) : (
                  <div className="border border-dashed border-slate-400 text-slate-400 font-mono text-[9px] px-2.5 py-2 rounded">
                    [DRAFT - BELUM DITANDATANGANI]
                  </div>
                )}
              </div>

              <div className="text-xs font-bold text-slate-950">
                {doc.approvedBy || doc.createdBy || 'Saor J. Lumbanbatu'}
              </div>
              <div className="text-[11px] text-slate-800 font-medium">
                Letnan Kolonel Inf
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 pt-3 flex justify-between items-end font-sans">
            <div className="text-[10px] text-slate-600 font-mono space-y-1">
              {doc.tembusanList && doc.tembusanList.length > 0 && !isNotaDinas && (
                <div>
                  <div className="font-bold text-slate-800">TEMBUSAN:</div>
                  <ol className="list-decimal pl-4 space-y-0.5">
                    {doc.tembusanList.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            <div className="text-center font-sans space-y-1 min-w-[220px]">
              <div className="text-xs text-slate-800">
                Dikeluarkan di : {doc.location || 'Padang'}
              </div>
              <div className="text-xs text-slate-800 font-semibold">
                Pada tanggal : {doc.date || '30 Juli 2026'}
              </div>
              <div className="text-xs font-bold uppercase text-slate-950 pt-2 leading-snug">
                {doc.fromSender || 'KOMANDAN BATALYON INFANTERI TP 897'}
              </div>

              {/* Stamp / Verified Signature Badge */}
              <div className="my-2 py-1.5 flex justify-center">
                {doc.workflowStage === 'APPROVED' || doc.workflowStage === 'FINAL' ? (
                  <div className="border-2 border-emerald-600 text-emerald-700 font-extrabold text-[10px] px-3 py-1 rounded uppercase tracking-wider rotate-[-2deg] flex items-center gap-1 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>DISAHKAN & VERIFIED COMMAND360</span>
                  </div>
                ) : (
                  <div className="border border-dashed border-slate-400 text-slate-400 font-mono text-[9px] px-2.5 py-2 rounded">
                    [DRAFT - BELUM DITANDATANGANI]
                  </div>
                )}
              </div>

              <div className="text-xs font-extrabold uppercase text-slate-950 underline">
                {doc.approvedBy || doc.createdBy || 'LETKOL INF SAOR J. LUMBANBATU'}
              </div>
              <div className="text-[10px] text-slate-600 font-mono">
                NRP. 11040019280782
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* FOOTER & PAGE NUMBER */}
        {/* ========================================================================= */}
        <div className="border-t border-slate-200 mt-6 pt-2 flex justify-between items-center text-[9px] font-mono text-slate-500">
          <div>COMMAND360 AI DOCUMENT GENERATOR • KODAM XX/TIB • PT: CAJ-06</div>
          <div>KLASIFIKASI: <span className="font-bold">{doc.classification || 'BIASA'}</span> • HALAMAN 1 / 1</div>
        </div>

        {/* Classification Bottom Header */}
        <div className="text-center font-sans font-bold text-xs uppercase tracking-widest mt-1">
          <span className={`px-4 py-0.5 border rounded font-mono text-[9px] ${getClassificationBadge(doc.classification)}`}>
            [ KLASIFIKASI: {doc.classification || 'BIASA'} ]
          </span>
        </div>

      </div>
    </div>
  );
};
