import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  FileText, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Copy, 
  RefreshCw,
  Zap,
  ShieldCheck,
  Search,
  Mic,
  Paperclip,
  Database,
  ArrowLeft
} from 'lucide-react';
import { mockExecutiveData } from '../../data/mockData';
import { UserRole } from '../../types';

interface CommandAiViewProps {
  userRole: UserRole;
  onBack?: () => void;
}

export const CommandAiView: React.FC<CommandAiViewProps> = ({ userRole, onBack }) => {
  const [activeTab, setActiveTab] = useState<'CHAT' | 'BRIEF' | 'ANALYSIS' | 'GENERATOR'>('CHAT');
  const [inputPrompt, setInputPrompt] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'USER' | 'AI'; text: string; time: string; sources?: string[] }>>([
    {
      sender: 'AI',
      text: `Siap Komandan/Pimpinan. Saya COMMAND AI Assistant. 

Saya terhubung secara langsung dengan data fusion 4 Staf COMMAND360 (Intelijen, Operasi, Personel, dan Logistik). 

Anda dapat mengajukan pertanyaan taktis, meminta analisis kecenderungan ancaman, atau membuat draf laporan eksekutif.`,
      time: '16:00',
      sources: ['Staf 2 Intelijen', 'Staf 3 Operasi', 'Staf 1 Personel', 'Staf 4 Logistik']
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Generator State
  const [docType, setDocType] = useState('KONSEP_SURAT');
  const [generatedDoc, setGeneratedDoc] = useState<string | null>(null);
  const [isGeneratingDoc, setIsGeneratingDoc] = useState(false);

  const handleSendChat = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputPrompt.trim() || isLoading) return;

    const userText = inputPrompt;
    setInputPrompt('');
    const nowTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    setChatMessages(prev => [...prev, { sender: 'USER', text: userText, time: nowTime }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/command-ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userText,
          context: {
            metrics: mockExecutiveData,
            role: userRole
          }
        })
      });
      const data = await res.json();
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'AI',
          text: data.response || 'Permintaan diproses oleh COMMAND AI.',
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          sources: ['Live Database Fusion', 'Gemini 3.6 Flash']
        }
      ]);
    } catch (err) {
      console.error(err);
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'AI',
          text: 'Maaf, terjadi kendala komunikasi dengan server COMMAND AI.',
          time: nowTime
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateDocument = async () => {
    setIsGeneratingDoc(true);
    try {
      const res = await fetch('/api/command-ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Buatkan draf ${docType} resmi pimpinan terkait kesiapsiagaan operasional dan pengamanan wilayah. Lengkap dengan struktur nomor surat, pertimbangan, instruksi taktis, dan penutup.`,
          role: userRole,
          context: mockExecutiveData
        })
      });
      const data = await res.json();
      setGeneratedDoc(data.response);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingDoc(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-20 lg:pb-0">
      
      {/* Header Banner */}
      <div className="p-3.5 sm:p-5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white shrink-0 min-w-[36px] min-h-[36px] flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-amber-400 font-semibold uppercase tracking-wider mb-0.5 sm:mb-1">
              <Bot className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>COMMAND AI Engine • Gemini 3.6 Flash</span>
            </div>
            <h1 className="text-base sm:text-xl font-extrabold text-slate-100">
              COMMAND AI ASSISTANT & DECISION GENERATOR
            </h1>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded border border-slate-800 text-xs font-mono overflow-x-auto">
          <button
            onClick={() => setActiveTab('CHAT')}
            className={`px-2.5 py-1.5 rounded font-semibold whitespace-nowrap transition-colors min-h-[36px] ${
              activeTab === 'CHAT' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tanya COMMAND360
          </button>
          <button
            onClick={() => setActiveTab('BRIEF')}
            className={`px-2.5 py-1.5 rounded font-semibold whitespace-nowrap transition-colors min-h-[36px] ${
              activeTab === 'BRIEF' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            AI Briefing
          </button>
          <button
            onClick={() => setActiveTab('ANALYSIS')}
            className={`px-2.5 py-1.5 rounded font-semibold whitespace-nowrap transition-colors min-h-[36px] ${
              activeTab === 'ANALYSIS' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            AI Analisis
          </button>
          <button
            onClick={() => setActiveTab('GENERATOR')}
            className={`px-2.5 py-1.5 rounded font-semibold whitespace-nowrap transition-colors min-h-[36px] ${
              activeTab === 'GENERATOR' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Generator Dokumen
          </button>
        </div>
      </div>

      {/* Tab 1: Chat Assistant */}
      {activeTab === 'CHAT' && (
        <div className="p-3 sm:p-5 bg-slate-900 border border-slate-800 rounded-lg space-y-3 sm:space-y-4 h-[calc(100vh-230px)] min-h-[480px] sm:min-h-[580px] flex flex-col justify-between">
          
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 sm:pr-2">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${
                  msg.sender === 'USER' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[92%] sm:max-w-[85%] p-3 sm:p-3.5 rounded-xl text-xs font-sans whitespace-pre-line leading-relaxed shadow-sm ${
                    msg.sender === 'USER'
                      ? 'bg-amber-500 text-slate-950 font-medium'
                      : 'bg-slate-950 border border-slate-800 text-slate-200'
                  }`}
                >
                  {msg.sender === 'AI' && (
                    <div className="flex items-center justify-between text-[10px] font-mono text-amber-400 font-bold mb-1.5 pb-1 border-b border-slate-800">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        <span>COMMAND AI</span>
                      </div>
                      <span className="text-[9px] text-slate-500 font-mono">VERIFIKASI PIMPINAN</span>
                    </div>
                  )}
                  {msg.text}

                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-slate-900/80 flex items-center gap-1.5 flex-wrap text-[10px] font-mono text-slate-400">
                      <Database className="w-3 h-3 text-amber-400" />
                      <span>Sumber:</span>
                      {msg.sources.map((s, idx) => (
                        <span key={idx} className="px-1.5 py-0.2 bg-slate-900 text-slate-300 rounded border border-slate-800">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[10px] font-mono text-slate-500 mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-amber-400 font-mono p-3 bg-slate-950 border border-slate-800 rounded-lg max-w-[240px]">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Menganalisis Data Fusion COMMAND360...</span>
              </div>
            )}
          </div>

          {/* Suggested Prompts */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] text-slate-400 font-mono">
            <span className="shrink-0 text-slate-500 text-[10px]">Saran:</span>
            <button
              onClick={() => setInputPrompt('Berapa skor kesiapan satuan dan status materiil kritis terkini?')}
              className="px-2.5 py-1 bg-slate-950 border border-slate-800 hover:border-amber-500/50 text-slate-300 rounded-full shrink-0 text-[10px] whitespace-nowrap min-h-[32px] flex items-center"
            >
              Kesiapan Satuan & Material Kritis
            </button>
            <button
              onClick={() => setInputPrompt('Berikan ringkasan ancaman karhutla dan lokasi hotspot terkini.')}
              className="px-2.5 py-1 bg-slate-950 border border-slate-800 hover:border-amber-500/50 text-slate-300 rounded-full shrink-0 text-[10px] whitespace-nowrap min-h-[32px] flex items-center"
            >
              Ancaman Karhutla & Hotspot
            </button>
            <button
              onClick={() => setInputPrompt('Tampilkan evaluasi arahan pimpinan yang terlambat.')}
              className="px-2.5 py-1 bg-slate-950 border border-slate-800 hover:border-amber-500/50 text-slate-300 rounded-full shrink-0 text-[10px] whitespace-nowrap min-h-[32px] flex items-center"
            >
              Arahan Pimpinan Terlambat
            </button>
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendChat} className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => alert('Fitur Lampiran Dokumen Siap Dimuat')}
              className="p-2 sm:p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 rounded-lg shrink-0 min-w-[40px] min-h-[40px] flex items-center justify-center"
              title="Unggah / Lampirkan Dokumen"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsRecording(!isRecording)}
              className={`p-2 sm:p-2.5 bg-slate-950 border border-slate-800 rounded-lg shrink-0 min-w-[40px] min-h-[40px] flex items-center justify-center transition-colors ${
                isRecording ? 'text-red-400 border-red-800 bg-red-950/60 animate-pulse' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Masukan Suara (Voice Command)"
            >
              <Mic className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ask COMMAND360..."
              className="flex-1 px-3 sm:px-4 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500/50 min-h-[40px]"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="px-3.5 sm:px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-lg transition-colors flex items-center gap-1.5 shrink-0 min-h-[40px]"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">SEND</span>
            </button>
          </form>

        </div>
      )}

      {/* Tab 4: Generator Dokumen */}
      {activeTab === 'GENERATOR' && (
        <div className="p-4 sm:p-5 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-slate-100 uppercase">
                AI Generator Konsep Surat, Laporan & Ringkasan
              </h2>
              <p className="text-[11px] text-slate-400">
                Pilih jenis dokumen dan AI akan menggenerasi draf berbasis data fusion COMMAND360.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="px-3 py-1.5 bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded font-mono min-h-[36px]"
              >
                <option value="KONSEP_SURAT">KONSEP SURAT DIREKTIF</option>
                <option value="LAPORAN_EKSEKUTIF">LAPORAN EKSEKUTIF PIMPINAN</option>
                <option value="NOTULEN_RAPAT">NOTULEN RAPAT STAF</option>
                <option value="SITUATION_BRIEF">SITUATION BRIEFING</option>
              </select>

              <button
                onClick={handleGenerateDocument}
                disabled={isGeneratingDoc}
                className="px-4 py-1.5 bg-amber-500 text-slate-950 font-bold text-xs rounded hover:bg-amber-400 transition-colors flex items-center gap-2 min-h-[36px]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isGeneratingDoc ? 'Menggenerasi...' : 'Generasi Draf'}</span>
              </button>
            </div>
          </div>

          {generatedDoc ? (
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-amber-400 border-b border-slate-900 pb-2">
                <span className="text-[10px] sm:text-xs">[DRAF AI GENERATED • PERLU VERIFIKASI]</span>
                <button
                  onClick={() => navigator.clipboard.writeText(generatedDoc)}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200"
                >
                  <Copy className="w-3 h-3" />
                  <span>Salin Teks</span>
                </button>
              </div>

              <div className="whitespace-pre-line text-slate-200 leading-relaxed font-sans text-xs">
                {generatedDoc}
              </div>

              <div className="pt-3 border-t border-slate-900 flex flex-wrap justify-end gap-2">
                <button className="px-3 py-2 bg-slate-800 text-slate-300 rounded text-xs font-semibold hover:bg-slate-700 min-h-[36px]">
                  Simpan ke Document Center
                </button>
                <button className="px-3 py-2 bg-emerald-600 text-white rounded text-xs font-semibold hover:bg-emerald-500 min-h-[36px]">
                  Setujui & Terbitkan
                </button>
              </div>
            </div>
          ) : (
            <div className="p-10 sm:p-12 text-center bg-slate-950 rounded-lg border border-dashed border-slate-800 text-slate-500 font-mono text-xs">
              Klik tombol "Generasi Draf" untuk membuat konsep surat/laporan secara otomatis.
            </div>
          )}
        </div>
      )}

      {activeTab !== 'CHAT' && activeTab !== 'GENERATOR' && (
        <div className="p-8 text-center bg-slate-900 rounded-lg border border-slate-800 text-slate-400 font-mono text-xs">
          Modul AI [{activeTab}] Siap Digunakan. Data terintegrasi dengan Gemini 3.6 Flash.
        </div>
      )}

    </div>
  );
};
