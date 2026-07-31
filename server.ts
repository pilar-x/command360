import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Google GenAI
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

// API routes
app.get("/command360.html", (req, res) => {
  res.sendFile(path.join(process.cwd(), "command360.html"));
});

app.get("/standalone", (req, res) => {
  res.sendFile(path.join(process.cwd(), "command360.html"));
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "COMMAND360 Backend", timestamp: new Date().toISOString() });
});

// COMMAND AI Chat Endpoint
app.post("/api/command-ai/chat", async (req, res) => {
  try {
    const { prompt, context, role } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    if (!ai) {
      return res.status(503).json({
        error: "Gemini API Key is not configured. Please add GEMINI_API_KEY in secrets.",
        response: `[DEMO MODE / NO API KEY] Pertanyaan Anda: "${prompt}" telah diterima. Dalam mode simulasi COMMAND360: Berdasarkan data fusion Intelijen, Operasi, Personel, dan Logistik terkini, kondisi kesiapan satuan secara keseluruhan berada pada angka **91.8% (SIAP TINGGI)**.`,
      });
    }

    const systemInstruction = `
Anda adalah COMMAND AI - Asisten Intelijen & Kepemimpinan Eksekutif untuk Sistem COMMAND360 (Pusat Komando & Informasi Staf Terpadu).
Peran pengguna saat ini: ${role || "Pimpinan Eksekutif / Komandan"}.
Konteks data fusion COMMAND360:
${context ? JSON.stringify(context, null, 2) : "Semua staf (Intelijen, Operasi, Personel, Logistik) dalam kondisi Siap Sedia."}

Pedoman Jawaban:
1. Berikan jawaban dalam bahasa Indonesia yang ringkas, tegas, terstruktur, profesional, dan bergaya militer/eksekutif.
2. Selalu sertakan label "[AI GENERATED - VERIFIKASI PIMPINAN DIBUTUHKAN]" pada rekomendasi atau analisis taktis.
3. Gunakan format poin-poin tebal (bullet points) untuk kemudahan scannability pimpinan.
4. Sertakan referensi sumber data jika relevan (misal: "Sumber Data: Staf Personel DSPP vs Riil, Laporan Harian Staf Ops").
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.2,
      },
    });

    res.json({
      response: response.text,
      timestamp: new Date().toISOString(),
      model: "gemini-3.6-flash",
    });
  } catch (error: any) {
    console.error("Error in /api/command-ai/chat:", error);
    res.status(500).json({
      error: "Gagal memproses permintaan COMMAND AI",
      details: error?.message || "Unknown error",
    });
  }
});

// COMMAND AI Brief Generator Endpoint
app.post("/api/command-ai/brief", async (req, res) => {
  try {
    const { briefType, staffData } = req.body; // briefType: 'morning' | 'daily' | 'executive' | 'situation'

    if (!ai) {
      return res.json({
        title: `EXECUTIVE BRIEF (${(briefType || "DAILY").toUpperCase()})`,
        summary: `Ringkasan Situasi Terintegrasi COMMAND360 (${new Date().toLocaleDateString("id-ID")}):\n• INTELIJEN: Wilayah kondusif, 2 hotspot karhutla dalam penanganan.\n• OPERASI: 8 Kegiatan Berjalan, Kesiapan Satuan 92.4%.\n• PERSONEL: DSPP 1.250 / Riil 1.180 (94.4%). 12 Personel Dinas Luar.\n• LOGISTIK: Stok Bekal Amunisi & BBM Aman, 3 Ranmor dalam Preventive Maintenance.`,
        recommendations: [
          "Pertahankan tingkat kesiapsiagaan Satuan Penindak.",
          "Lakukan pengecekan rutin terhadap suku cadang ranmor.",
          "Tingkatkan patroli terpadu di area rawan karhutla.",
        ],
        isAiGenerated: true,
      });
    }

    const systemInstruction = `
Anda adalah COMMAND AI Generator untuk Laporan Singkat Pimpinan (Executive Brief).
Buat ringkasan eksekutif berjenjang berdasarkan data fusion 4 staf (Intel, Ops, Pers, Log).
Jenis Brief: ${briefType || "Executive Brief"}.
Format JSON output:
{
  "title": "Judul Brief",
  "summary": "Ringkasan situasi utama 3-4 paragraf/poin",
  "criticalAlerts": ["Daftar alert kritis jika ada"],
  "recommendations": ["Rekomendasi taktis/strategis pimpinan"],
  "staffHighlights": {
    "intel": "Highlight Intelijen",
    "ops": "Highlight Operasi",
    "pers": "Highlight Personel",
    "log": "Highlight Logistik"
  }
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Generate ${briefType} brief based on current staff metrics: ${JSON.stringify(staffData || {})}`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    let data;
    try {
      data = JSON.parse(response.text || "{}");
    } catch (e) {
      data = { title: "Executive Brief", summary: response.text };
    }

    res.json({ ...data, isAiGenerated: true, generatedAt: new Date().toISOString() });
  } catch (error: any) {
    console.error("Error in /api/command-ai/brief:", error);
    res.status(500).json({ error: "Gagal membuat brief" });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[COMMAND360] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
