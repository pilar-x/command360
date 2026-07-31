import { GeneratedDocument } from '../types';

/**
 * Triggers a client-side file download in the browser using a Blob object.
 */
export function downloadFile(filename: string, content: string, mimeType = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Downloads a reference document/SOP/Doctrine in formatted military layout.
 */
export function downloadReferenceDoc(
  title: string,
  category: string,
  bodyText?: string,
  metadata?: { id?: string; clearance?: string; version?: string; date?: string; author?: string }
) {
  const fileHeader = `================================================================================
TENTARA NASIONAL INDONESIA ANGKATAN DARAT
PEDOMAN PETUNJUK TEKNIS TULISAN DINAS (JUKNIS TULDIS PT: CAJ-06)
================================================================================

JUDUL DOKUMEN REFERENSI : ${title.toUpperCase()}
KATEGORI REFERENSI      : ${category.toUpperCase()}
KLASIFIKASI KEAMANAN    : ${metadata?.clearance || 'TERBATAS'}
NOMOR / VERSI           : ${metadata?.id || 'REF-2026'} (${metadata?.version || 'v1.0'})
TANGGAL DITERBITKAN     : ${metadata?.date || '30 Juli 2026'}
PENANGGUNG JAWAB        : ${metadata?.author || 'STAF KOMANDO YONIF 897'}

--------------------------------------------------------------------------------
1. LEMBAR PENGESAHAN & PERSYARATAN JUKNIS
--------------------------------------------------------------------------------
Dokumen referensi ini merupakan produk resmi yang tersimpan di Vault Referensi Taktis Command360.
Penggunaan referensi ini wajib memperhatikan tingkat kerahasiaan dan petunjuk komando.

--------------------------------------------------------------------------------
2. ISI & PEDOMAN TAKTIS
--------------------------------------------------------------------------------
${bodyText || `A. UMUM
1) Bahwa dokumen referensi ini diterbitkan sebagai pedoman standar operasional prosedur (SOP), petunjuk teknis, dan arahan taktis bagi prajurit dan satuan jajaran.
2) Setiap perwira dan komandan bawahan wajib mempelajari serta memedomani isi referensi ini dalam setiap tahap perencanaan dan pelaksanaan tugas.

B. MAKSUD DAN TUJUAN
1) Maksud: Memberikan kerangka kerja operasional yang baku, terukur, dan terverifikasi sesuai Juknis Minu TNI AD.
2) Tujuan: Menjamin keseragaman tindakan, keselamatan personel, dan efisiensi koordinasi empat staf.

C. KETENTUAN DAN PROSEDUR PELAKSANAAN
1) Kesiapsiagaan Personel: Memastikan seluruh anggota memahami prosedur keselamatan dan urutan tindakan taktis.
2) Koordinasi Lintas Staf: Menghubungkan jalur komunikasi antara Staf Intelijen, Operasi, Personel, dan Logistik secara real-time.
3) Pelaporan berkala: Setiap perkembangan wajib dilaporkan berjenjang sesuai jalur komando.

D. PENUTUP
Demikian pedoman referensi ini dibuat untuk dipedomani dan dilaksanakan sebagaimana mestinya.`}

================================================================================
COMMAND360 MILITARY OPERATIONAL SYSTEM • OFFICIAL REFERENCE VAULT
================================================================================`;

  const safeFilename = `${category}_${title.replace(/[^a-zA-Z0-9_\-]/g, '_')}.txt`;
  downloadFile(safeFilename, fileHeader);
}

/**
 * Downloads a GeneratedDocument as a formatted MS Word (.doc) file adhering to TNI AD Juknis Tuldis (PT: CAJ-06).
 */
export function downloadDocumentAsDocx(doc: Partial<GeneratedDocument>) {
  const docTitle = doc.title || doc.docType || 'DOKUMEN_OFFICIAL';
  const docNum = (doc.documentNumber || '001_2026').replace(/\//g, '_');
  const filename = `${doc.docType || 'SURAT'}_${docNum}.doc`;

  const htmlContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${docTitle}</title>
      <style>
        @page {
          size: 210mm 297mm;
          margin: 20.3mm 15.2mm 12.7mm 25.4mm;
        }
        body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.5; color: #000; }
        .header { font-family: 'Arial', sans-serif; text-align: left; border-bottom: 2px solid #000; padding-bottom: 6px; margin-bottom: 18px; }
        .title { text-align: center; font-family: 'Arial', sans-serif; font-weight: bold; font-size: 13pt; text-decoration: underline; margin-top: 15px; text-transform: uppercase; }
        .subtitle { text-align: center; font-family: 'Arial', sans-serif; font-weight: bold; font-size: 11pt; margin-bottom: 20px; }
        .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 11pt; font-family: 'Arial', sans-serif; }
        .meta-table td { padding: 3px 0; vertical-align: top; }
        .section-title { font-family: 'Arial', sans-serif; font-weight: bold; font-size: 11pt; margin-top: 15px; margin-bottom: 5px; text-transform: uppercase; }
        .content { font-family: 'Times New Roman', serif; text-align: justify; white-space: pre-wrap; margin-bottom: 25px; line-height: 1.6; }
        .signature-block { margin-top: 40px; float: right; text-align: center; width: 260px; font-size: 11pt; font-family: 'Arial', sans-serif; }
        .classification-stamp { text-align: center; font-weight: bold; font-family: monospace; padding: 4px 10px; border: 1px solid #000; display: inline-block; margin-bottom: 15px; font-size: 10pt; }
        .tembusan { font-family: 'Arial', sans-serif; font-size: 10pt; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div style="text-align: center;">
        <span class="classification-stamp">[ KLASIFIKASI: ${doc.classification || 'BIASA'} ]</span>
      </div>

      <div class="header">
        <strong>TENTARA NASIONAL INDONESIA ANGKATAN DARAT</strong><br>
        <strong>KODAM XX / TIB • BATALYON INFANTERI TP 897 / SINGGALANG</strong><br>
        <span style="font-size: 9pt; font-style: italic;">Jl. Lintas Sumatera Km 12, Padang - Sumatera Barat • PT: CAJ-06</span>
      </div>

      <div class="title">${doc.docType || 'SURAT PERINTAH'}</div>
      <div class="subtitle">NOMOR: ${doc.documentNumber || 'Sprin/101/VII/2026'}</div>

      <table class="meta-table">
        <tr><td width="110"><strong>DARI</strong></td><td width="10">:</td><td>${doc.fromSender || 'KOMANDAN BATALYON INFANTERI TP 897'}</td></tr>
        <tr><td><strong>KEPADA</strong></td><td>:</td><td>${doc.toRecipient || 'SELURUH PERWIRA STAF & DANRAMIL/DANPA'}</td></tr>
        <tr><td><strong>PERIHAL</strong></td><td>:</td><td>${doc.perihal || doc.title || '-'}</td></tr>
        <tr><td><strong>TANGGAL</strong></td><td>:</td><td>${doc.location || 'Padang'}, ${doc.date || '30 Juli 2026'}</td></tr>
      </table>

      ${doc.dasarList && doc.dasarList.length > 0 ? `
        <div class="section-title">DASAR / RUJUKAN:</div>
        <ol style="margin-top: 4px; padding-left: 20px;">
          ${doc.dasarList.map(d => `<li style="margin-bottom: 3px;">${d}</li>`).join('')}
        </ol>
      ` : ''}

      <div class="section-title">ISI / URAIAN DOKUMEN:</div>
      <div class="content">${doc.uraianContent || ''}</div>

      ${doc.lampiranList && doc.lampiranList.length > 0 ? `
        <div class="section-title">LAMPIRAN:</div>
        <ul style="padding-left: 20px;">
          ${doc.lampiranList.map(l => `<li>${l}</li>`).join('')}
        </ul>
      ` : ''}

      <div class="signature-block">
        <div>Dikeluarkan di: ${doc.location || 'Padang'}</div>
        <div>Pada tanggal: ${doc.date || '30 Juli 2026'}</div>
        <br>
        <strong>${doc.fromSender || 'KOMANDAN BATALYON INFANTERI TP 897'}</strong>
        <br><br><br><br>
        <u><strong>${doc.approvedBy || doc.createdBy || 'LETKOL INF SAOR J. LUMBANBATU'}</strong></u><br>
        <span>NRP. 11040019280782</span>
      </div>

      ${doc.tembusanList && doc.tembusanList.length > 0 ? `
        <div class="tembusan">
          <strong>TEMBUSAN:</strong>
          <ol style="padding-left: 18px; margin-top: 4px;">
            ${doc.tembusanList.map(t => `<li>${t}</li>`).join('')}
          </ol>
        </div>
      ` : ''}

      <br><br>
      <div style="text-align: center; font-size: 9pt; font-family: monospace; color: #555; border-top: 1px solid #ccc; pt: 8px;">
        [ KLASIFIKASI: ${doc.classification || 'BIASA'} ] • DITERBITKAN DENGAN AI DOCUMENT GENERATOR COMMAND360 JUKNIS MINU AD
      </div>
    </body>
    </html>
  `;

  downloadFile(filename, htmlContent, 'application/msword');
}

/**
 * Opens a print-friendly document modal/window or generates PDF via browser print API.
 */
export function downloadDocumentAsPdf(doc: Partial<GeneratedDocument>) {
  const printWindow = window.open('', '_blank', 'width=900,height=1000');
  if (!printWindow) {
    alert('Pop-up browser terblokir. Izinkan pop-up untuk mencetak / export PDF.');
    return;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${doc.title || doc.docType || 'Dokumen Resmi TNI AD'}</title>
      <style>
        @page { 
          size: A4; 
          margin-top: 20.3mm;
          margin-bottom: 12.7mm;
          margin-left: 25.4mm;
          margin-right: 15.2mm;
        }
        body { font-family: 'Times New Roman', serif; font-size: 12pt; color: #000; background: #fff; line-height: 1.5; padding: 15px; }
        .class-badge { text-align: center; font-family: monospace; font-weight: bold; margin-bottom: 15px; font-size: 10pt; }
        .kop { border-bottom: 2px solid #000; padding-bottom: 6px; margin-bottom: 18px; font-family: 'Arial', sans-serif; }
        .kop-title { font-weight: bold; font-size: 11pt; text-transform: uppercase; }
        .doc-title { text-align: center; font-family: 'Arial', sans-serif; font-weight: bold; font-size: 13pt; text-decoration: underline; text-transform: uppercase; margin-top: 12px; }
        .doc-num { text-align: center; font-family: monospace; font-weight: bold; font-size: 11pt; margin-bottom: 18px; }
        .meta-row { display: flex; margin-bottom: 5px; font-family: 'Arial', sans-serif; font-size: 11pt; }
        .meta-label { width: 120px; font-weight: bold; }
        .section-header { font-family: 'Arial', sans-serif; font-weight: bold; text-transform: uppercase; margin-top: 18px; margin-bottom: 6px; font-size: 11pt; }
        .content-body { white-space: pre-wrap; text-align: justify; font-size: 12pt; line-height: 1.6; border-left: 2px solid #ddd; padding-left: 14px; margin-bottom: 25px; }
        .sig-container { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px; page-break-inside: avoid; }
        .sig-box { text-align: center; width: 250px; font-family: 'Arial', sans-serif; font-size: 11pt; }
        .stamp { border: 2px solid #059669; color: #059669; font-weight: bold; font-size: 10pt; padding: 4px 10px; display: inline-block; margin: 12px 0; transform: rotate(-2deg); }
        @media print {
          body { padding: 0; }
        }
      </style>
    </head>
    <body>
      <div class="class-badge">[ KLASIFIKASI: ${doc.classification || 'BIASA'} ]</div>
      
      <div class="kop">
        <div class="kop-title">TENTARA NASIONAL INDONESIA ANGKATAN DARAT</div>
        <div class="kop-title">KODAM XX / TIB • BATALYON INFANTERI TP 897 / SINGGALANG</div>
        <div style="font-size: 9pt; font-style: italic;">Jl. Lintas Sumatera Km 12, Padang - Sumatera Barat • Juknis Minu AD PT: CAJ-06</div>
      </div>

      <div class="doc-title">${doc.docType || 'SURAT PERINTAH'}</div>
      <div class="doc-num">NOMOR: ${doc.documentNumber || 'Sprin/101/VII/2026'}</div>

      <div class="meta-row"><span class="meta-label">DARI</span><span>: ${doc.fromSender || 'KOMANDAN BATALYON INFANTERI TP 897'}</span></div>
      <div class="meta-row"><span class="meta-label">KEPADA</span><span>: ${doc.toRecipient || 'SELURUH PERWIRA STAF & DANRAMIL'}</span></div>
      <div class="meta-row"><span class="meta-label">PERIHAL</span><span>: ${doc.perihal || doc.title || '-'}</span></div>
      <div class="meta-row"><span class="meta-label">TANGGAL</span><span>: ${doc.location || 'Padang'}, ${doc.date || '30 Juli 2026'}</span></div>

      ${doc.dasarList && doc.dasarList.length > 0 ? `
        <div class="section-header">DASAR / RUJUKAN:</div>
        <ol style="margin-top: 4px; padding-left: 20px;">
          ${doc.dasarList.map(d => `<li style="margin-bottom: 2px;">${d}</li>`).join('')}
        </ol>
      ` : ''}

      <div class="section-header">ISI / URAIAN DOKUMEN:</div>
      <div class="content-body">${doc.uraianContent || ''}</div>

      <div class="sig-container">
        <div>
          ${doc.tembusanList && doc.tembusanList.length > 0 ? `
            <div style="font-family: Arial, sans-serif; font-size: 10pt;">
              <strong>TEMBUSAN:</strong>
              <ol style="padding-left: 16px; margin-top: 4px;">
                ${doc.tembusanList.map(t => `<li>${t}</li>`).join('')}
              </ol>
            </div>
          ` : ''}
        </div>

        <div class="sig-box">
          <div>Dikeluarkan di: ${doc.location || 'Padang'}</div>
          <div>Pada tanggal: ${doc.date || '30 Juli 2026'}</div>
          <div style="font-weight: bold; margin-top: 6px;">${doc.fromSender || 'KOMANDAN BATALYON INFANTERI TP 897'}</div>
          
          <div class="stamp">DISAHKAN & VERIFIED COMMAND360</div>
          <br>
          <div style="font-weight: bold; text-decoration: underline;">${doc.approvedBy || doc.createdBy || 'LETKOL INF SAOR J. LUMBANBATU'}</div>
          <div style="font-size: 9pt; font-family: monospace;">NRP. 11040019280782</div>
        </div>
      </div>

      <br><br>
      <div style="text-align: center; font-size: 9pt; font-family: monospace; color: #555; border-top: 1px solid #ccc; pt: 8px;">
        [ KLASIFIKASI: ${doc.classification || 'BIASA'} ] • JUKNIS TULISAN DINAS TNI AD PT: CAJ-06
      </div>

      <script>
        window.onload = function() {
          window.print();
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}
