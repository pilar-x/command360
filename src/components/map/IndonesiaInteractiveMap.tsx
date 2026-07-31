import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Layers, 
  Filter, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  ShieldAlert, 
  MapPin, 
  Eye, 
  Crosshair, 
  Users, 
  Truck, 
  Clock, 
  ChevronRight, 
  X,
  Radio,
  Flame,
  CloudRain,
  Building
} from 'lucide-react';
import { StaffCategory, NavigationMenu, StaffDataRecord } from '../../types';

export interface MapMarkerItem {
  id: string;
  title: string;
  category: StaffCategory;
  locationName: string;
  lat: number;
  lng: number;
  status: 'CRITICAL' | 'ACTIVE' | 'WARNING' | 'NORMAL';
  description: string;
  timestamp: string;
  details?: {
    personnelCount?: number;
    equipmentReady?: string;
    weatherCondition?: string;
    riskScore?: string;
  };
}

export const mockMapMarkers: MapMarkerItem[] = [
  {
    id: 'M-JAMBI-01',
    title: 'Hotspot Karhutla & Alert Kebakaran',
    category: 'INTELIJEN',
    locationName: 'Jambi, Sumatra',
    lat: -1.61,
    lng: 103.61,
    status: 'CRITICAL',
    description: 'Terdeteksi 14 titik panas dengan intensitas tinggi di Sektor Jambi Selatan.',
    timestamp: '10:45 WIB',
    details: { riskScore: 'TINGGI (88%)', weatherCondition: 'Kering, Angin 18 knot', personnelCount: 120 }
  },
  {
    id: 'M-PADANG-02',
    title: 'Siaga Bencana & Cuaca Ekstrem',
    category: 'INTELIJEN',
    locationName: 'Padang, Sumatera Barat',
    lat: -0.949,
    lng: 100.354,
    status: 'WARNING',
    description: 'Peringatan dini gelombang tinggi & potensi banjir pesisir pantai barat.',
    timestamp: '10:30 WIB',
    details: { weatherCondition: 'Hujan Deras & Angin 22 knot', riskScore: 'SEDANG (65%)' }
  },
  {
    id: 'M-MABES-03',
    title: 'Mabes Command Center Utama',
    category: 'PERSONEL',
    locationName: 'DKI Jakarta',
    lat: -6.2088,
    lng: 106.8456,
    status: 'NORMAL',
    description: 'Pusat Komando & Pengendalian Operasi terintegrasi 24/7.',
    timestamp: '10:50 WIB',
    details: { personnelCount: 450, equipmentReady: '100% Standby' }
  },
  {
    id: 'M-NATUNA-04',
    title: 'Patroli Maritim Alur Laut Natuna',
    category: 'OPERASI',
    locationName: 'Kepulauan Natuna',
    lat: 3.9,
    lng: 108.2,
    status: 'ACTIVE',
    description: 'Pengawasan alur laut teritorial oleh Satgas Armada 1 dan Radar Pesisir.',
    timestamp: '10:20 WIB',
    details: { equipmentReady: 'KRI Diponegoro & 2 Patrol Boat', personnelCount: 210 }
  },
  {
    id: 'M-SURABAYA-05',
    title: 'Depo Logistik & Pangkalan Armada',
    category: 'LOGISTIK',
    locationName: 'Surabaya, Jawa Timur',
    lat: -7.2575,
    lng: 112.7521,
    status: 'NORMAL',
    description: 'Penyediaan dan pemeliharaan bekal amunisi & BBM cadangan strategi.',
    timestamp: '09:15 WIB',
    details: { equipmentReady: 'Stock BBM 94%, Bekal Munisi Ready', personnelCount: 380 }
  },
  {
    id: 'M-IKN-06',
    title: 'Pengamanan Obvitnas IKN Nusantara',
    category: 'OPERASI',
    locationName: 'Penajam / Balikpapan, Kaltim',
    lat: -1.2379,
    lng: 116.8529,
    status: 'ACTIVE',
    description: 'Pengamanan jalur vital pembangunan IKN & fasilitas kilang Pertamina.',
    timestamp: '10:10 WIB',
    details: { personnelCount: 320, riskScore: 'AMAN (12%)' }
  },
  {
    id: 'M-POSO-07',
    title: 'Satgas Pam Teritorial & Intel',
    category: 'INTELIJEN',
    locationName: 'Poso, Sulawesi Tengah',
    lat: -1.3959,
    lng: 120.7524,
    status: 'WARNING',
    description: 'Monitoring teritorial rutin dan deteksi dini pergerakan ilegal.',
    timestamp: '08:40 WIB',
    details: { personnelCount: 180, riskScore: 'WASPADA (45%)' }
  },
  {
    id: 'M-AMBON-08',
    title: 'Batalyon Kesiapsiagaan Maluku',
    category: 'PERSONEL',
    locationName: 'Ambon, Maluku',
    lat: -3.6554,
    lng: 128.1906,
    status: 'NORMAL',
    description: 'Latihan kesiapan respon cepat tanggap bencana wilayah timur.',
    timestamp: '07:30 WIB',
    details: { personnelCount: 520, equipmentReady: 'Truk & Alkom Complete' }
  },
  {
    id: 'M-JAYAPURA-09',
    title: 'Pengamanan Perbatasan RI-PNG',
    category: 'OPERASI',
    locationName: 'Jayapura, Papua',
    lat: -2.5489,
    lng: 140.7196,
    status: 'ACTIVE',
    description: 'Patroli pilar batas negara dan pelayanan kesehatan terpadu masyarakat.',
    timestamp: '10:00 WIB',
    details: { personnelCount: 410, riskScore: 'TERKENDALI (30%)' }
  },
  {
    id: 'M-BALI-10',
    title: 'Pengamanan Event VVIP Regional',
    category: 'OPERASI',
    locationName: 'Denpasar, Bali',
    lat: -8.6705,
    lng: 115.2126,
    status: 'NORMAL',
    description: 'Ring pengamanan gabungan konferensi internasional & obvit wisata.',
    timestamp: '09:50 WIB',
    details: { personnelCount: 290 }
  }
];

interface IndonesiaInteractiveMapProps {
  onNavigate?: (menu: NavigationMenu, submenu?: string) => void;
  targetMarkerId?: string | null;
  heightClass?: string;
  isCompact?: boolean;
  publishedRecords?: StaffDataRecord[];
}

export const IndonesiaInteractiveMap: React.FC<IndonesiaInteractiveMapProps> = ({
  onNavigate,
  targetMarkerId,
  heightClass = 'h-[360px] sm:h-[450px] lg:h-[500px]',
  isCompact = false,
  publishedRecords = []
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  // Merge static markers with published records from Staff Input & Verification System
  const convertedPublishedMarkers: MapMarkerItem[] = publishedRecords
    .filter(r => r.workflowStatus === 'PUBLISHED' && r.lat && r.lng)
    .map(r => ({
      id: r.id,
      title: r.title,
      category: r.staffCategory,
      locationName: r.locationName,
      lat: r.lat,
      lng: r.lng,
      status: r.priority === 'KRITIS' ? 'CRITICAL' : r.priority === 'TINGGI' ? 'WARNING' : 'ACTIVE',
      description: r.description,
      timestamp: r.time + ' WIB',
      details: {
        personnelCount: r.personnelCount,
        equipmentReady: r.unitName
      }
    }));

  const allMapMarkers = [...mockMapMarkers, ...convertedPublishedMarkers];

  const [mapTileStyle, setMapTileStyle] = useState<'DARK' | 'SATELLITE' | 'TERRAIN'>('DARK');
  const [selectedStaffFilter, setSelectedStaffFilter] = useState<StaffCategory | 'ALL'>('ALL');
  const [activeLayers, setActiveLayers] = useState({
    boundaries: true,
    units: true,
    hotspots: true,
    weather: true,
    infrastructure: true
  });

  const [selectedMarker, setSelectedMarker] = useState<MapMarkerItem | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTimeStr, setCurrentTimeStr] = useState('');
  const [isLayerDrawerOpen, setIsLayerDrawerOpen] = useState(false);

  // Live WIB clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTimeStr(now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // already initialized

    // Center approx Indonesia: -2.5, 118
    const map = L.map(mapContainerRef.current, {
      center: [-2.5, 118],
      zoom: 5,
      zoomControl: false,
      attributionControl: false
    });

    mapInstanceRef.current = map;

    // Default CartoDB Dark Matter tile
    const darkTileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd'
    });
    darkTileLayer.addTo(map);

    // Initial markers rendering
    renderMapMarkers(map, allMapMarkers, selectedStaffFilter);

    // Invalidate size after mount to prevent grey tiles
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [allMapMarkers.length]);

  // Tile Switcher Handler
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    if (mapTileStyle === 'DARK') {
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd'
      }).addTo(map);
    } else if (mapTileStyle === 'SATELLITE') {
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18
      }).addTo(map);
    } else {
      L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17
      }).addTo(map);
    }
  }, [mapTileStyle]);

  // Handle Staff Filter change or Layer changes or publishedRecords updates
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    renderMapMarkers(map, allMapMarkers, selectedStaffFilter);
  }, [selectedStaffFilter, activeLayers, publishedRecords]);

  // Handle Target Marker trigger (LOCATE feature from Critical Alert or AI)
  useEffect(() => {
    if (!targetMarkerId || !mapInstanceRef.current) return;
    const item = allMapMarkers.find(m => m.id === targetMarkerId || m.locationName.toLowerCase().includes(targetMarkerId.toLowerCase()));
    if (item && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([item.lat, item.lng], 8, { duration: 1.5 });
      setSelectedMarker(item);
      const m = markersRef.current[item.id];
      if (m) {
        m.openPopup();
      }
    }
  }, [targetMarkerId, allMapMarkers]);

  const getMarkerColor = (status: MapMarkerItem['status']) => {
    switch (status) {
      case 'CRITICAL': return '#ef4444'; // Red
      case 'WARNING': return '#f59e0b'; // Amber
      case 'ACTIVE': return '#3b82f6'; // Blue
      case 'NORMAL': return '#10b981'; // Emerald
      default: return '#f59e0b';
    }
  };

  const renderMapMarkers = (
    map: L.Map, 
    items: MapMarkerItem[], 
    filter: StaffCategory | 'ALL'
  ) => {
    // Clear existing markers
    Object.values(markersRef.current).forEach(m => (m as L.Marker).remove());
    markersRef.current = {};

    items.forEach((item) => {
      if (filter !== 'ALL' && item.category !== filter) return;

      const color = getMarkerColor(item.status);
      const isCritical = item.status === 'CRITICAL';

      // Custom HTML Marker Icon with Tactical HUD Ring
      const customIcon = L.divIcon({
        className: 'custom-tactical-marker',
        html: `
          <div style="position: relative; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;">
            <div style="
              position: absolute; 
              inset: 0; 
              border-radius: 50%; 
              background-color: ${color}; 
              opacity: 0.35; 
              ${isCritical ? 'animation: hud-ping 1.5s infinite;' : ''}
            "></div>
            <div style="
              width: 14px; 
              height: 14px; 
              border-radius: 50%; 
              background-color: ${color}; 
              border: 2px solid #07090e; 
              box-shadow: 0 0 10px ${color};
            "></div>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const popupHtml = `
        <div style="padding: 12px; min-width: 220px; font-family: sans-serif;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; font-size: 10px; font-family: monospace;">
            <span style="color: ${color}; font-weight: bold;">[${item.category}]</span>
            <span style="color: #94a3b8;">${item.timestamp}</span>
          </div>
          <h4 style="font-size: 13px; font-weight: 800; color: #f8fafc; margin-bottom: 4px;">${item.title}</h4>
          <p style="font-size: 11px; color: #cbd5e1; margin-bottom: 8px; line-height: 1.3;">${item.description}</p>
          <div style="font-size: 10px; color: #f59e0b; font-family: monospace; background: rgba(7,9,14,0.8); padding: 4px 6px; border-radius: 4px; border: 1px solid rgba(245,158,11,0.2);">
            📍 ${item.locationName} (${item.lat.toFixed(2)}, ${item.lng.toFixed(2)})
          </div>
        </div>
      `;

      const marker = L.marker([item.lat, item.lng], { icon: customIcon }).addTo(map);
      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        setSelectedMarker(item);
      });

      markersRef.current[item.id] = marker;
    });
  };

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([-2.5, 118], 5, { duration: 1.2 });
      setSelectedMarker(null);
    }
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  return (
    <div className={`relative rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl flex flex-col transition-all ${
      isFullscreen ? 'fixed inset-0 z-50 p-2 sm:p-4 bg-slate-950/98 rounded-none border-none' : ''
    }`}>
      
      {/* 1. MAP HEADER BAR */}
      <div className="p-2.5 sm:p-3.5 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 z-10 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs sm:text-sm font-extrabold text-slate-100 tracking-wider uppercase flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>COMMAND MAP INDONESIA</span>
              </h2>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 hidden xs:inline">
                LIVE
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono hidden sm:block">
              SITUATIONAL OVERVIEW • {currentTimeStr || '10:52:14 WIB'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 text-xs font-mono">
          
          {/* Tile Mode Switcher */}
          <div className="hidden xs:flex items-center bg-slate-950 p-0.5 rounded border border-slate-800">
            <button
              onClick={() => setMapTileStyle('DARK')}
              className={`px-2 py-0.5 text-[10px] rounded transition-colors font-bold ${
                mapTileStyle === 'DARK' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              DARK
            </button>
            <button
              onClick={() => setMapTileStyle('SATELLITE')}
              className={`px-2 py-0.5 text-[10px] rounded transition-colors font-bold ${
                mapTileStyle === 'SATELLITE' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              SAT
            </button>
          </div>

          {/* Layer Filter Trigger */}
          <button
            onClick={() => setIsLayerDrawerOpen(!isLayerDrawerOpen)}
            className={`px-2.5 py-1 rounded border text-[11px] font-semibold flex items-center gap-1 transition-colors min-h-[32px] ${
              isLayerDrawerOpen ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Layers</span>
          </button>

          {/* Reset Map */}
          <button
            onClick={handleResetView}
            className="p-1.5 rounded bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-amber-400 min-w-[32px] min-h-[32px] flex items-center justify-center"
            title="Reset Peta Ke Seluruh Indonesia"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => {
              setIsFullscreen(!isFullscreen);
              setTimeout(() => mapInstanceRef.current?.invalidateSize(), 200);
            }}
            className="p-1.5 rounded bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-amber-400 min-w-[32px] min-h-[32px] flex items-center justify-center"
            title={isFullscreen ? 'Keluar Layar Penuh' : 'Peta Layar Penuh'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 2. STAFF FILTER BAR */}
      <div className="px-3 py-1.5 bg-slate-900/90 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono shrink-0">
        <span className="text-slate-500 uppercase shrink-0 text-[10px]">STAF FILTER:</span>
        <button
          onClick={() => setSelectedStaffFilter('ALL')}
          className={`px-2.5 py-0.5 rounded transition-all font-semibold shrink-0 min-h-[28px] ${
            selectedStaffFilter === 'ALL'
              ? 'bg-amber-500 text-slate-950 font-extrabold'
              : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          SEMUA ({mockMapMarkers.length})
        </button>
        <button
          onClick={() => setSelectedStaffFilter('INTELIJEN')}
          className={`px-2.5 py-0.5 rounded transition-all font-semibold shrink-0 min-h-[28px] flex items-center gap-1 ${
            selectedStaffFilter === 'INTELIJEN'
              ? 'bg-amber-500 text-slate-950 font-extrabold'
              : 'bg-slate-950 text-amber-400/80 hover:text-amber-300 border border-slate-800'
          }`}
        >
          <Eye className="w-3 h-3" /> INTELIJEN
        </button>
        <button
          onClick={() => setSelectedStaffFilter('OPERASI')}
          className={`px-2.5 py-0.5 rounded transition-all font-semibold shrink-0 min-h-[28px] flex items-center gap-1 ${
            selectedStaffFilter === 'OPERASI'
              ? 'bg-purple-500 text-slate-950 font-extrabold'
              : 'bg-slate-950 text-purple-400/80 hover:text-purple-300 border border-slate-800'
          }`}
        >
          <Crosshair className="w-3 h-3" /> OPERASI
        </button>
        <button
          onClick={() => setSelectedStaffFilter('PERSONEL')}
          className={`px-2.5 py-0.5 rounded transition-all font-semibold shrink-0 min-h-[28px] flex items-center gap-1 ${
            selectedStaffFilter === 'PERSONEL'
              ? 'bg-blue-500 text-slate-950 font-extrabold'
              : 'bg-slate-950 text-blue-400/80 hover:text-blue-300 border border-slate-800'
          }`}
        >
          <Users className="w-3 h-3" /> PERSONEL
        </button>
        <button
          onClick={() => setSelectedStaffFilter('LOGISTIK')}
          className={`px-2.5 py-0.5 rounded transition-all font-semibold shrink-0 min-h-[28px] flex items-center gap-1 ${
            selectedStaffFilter === 'LOGISTIK'
              ? 'bg-emerald-500 text-slate-950 font-extrabold'
              : 'bg-slate-950 text-emerald-400/80 hover:text-emerald-300 border border-slate-800'
          }`}
        >
          <Truck className="w-3 h-3" /> LOGISTIK
        </button>
      </div>

      {/* 3. MAP CANVAS & OVERLAYS CONTAINER */}
      <div className={`relative w-full ${isFullscreen ? 'flex-1 min-h-[500px]' : heightClass}`}>
        
        {/* Leaflet Map DOM Container */}
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* On-Map Manual Zoom Controls */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
          <button
            onClick={handleZoomIn}
            className="w-8 h-8 rounded bg-slate-900/90 text-slate-200 border border-slate-700/80 hover:bg-amber-500 hover:text-slate-950 font-extrabold text-base flex items-center justify-center shadow-md backdrop-blur-sm"
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            className="w-8 h-8 rounded bg-slate-900/90 text-slate-200 border border-slate-700/80 hover:bg-amber-500 hover:text-slate-950 font-extrabold text-base flex items-center justify-center shadow-md backdrop-blur-sm"
          >
            -
          </button>
        </div>

        {/* Layers Drawer Overlay */}
        {isLayerDrawerOpen && (
          <div className="absolute top-3 left-3 z-20 w-64 bg-slate-950/95 border border-slate-800 rounded-lg p-3 shadow-2xl backdrop-blur-md animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">MAP LAYER CONFIG</span>
              <button onClick={() => setIsLayerDrawerOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1.5 text-xs">
              <label className="flex items-center justify-between p-1.5 rounded hover:bg-slate-900 cursor-pointer">
                <span className="text-slate-300">Batas Administrasi / AO</span>
                <input type="checkbox" defaultChecked className="accent-amber-500" />
              </label>
              <label className="flex items-center justify-between p-1.5 rounded hover:bg-slate-900 cursor-pointer">
                <span className="text-slate-300">Pos & Pangkalan Satuan</span>
                <input type="checkbox" defaultChecked className="accent-amber-500" />
              </label>
              <label className="flex items-center justify-between p-1.5 rounded hover:bg-slate-900 cursor-pointer">
                <span className="text-slate-300">Hotspot Karhutla / Bencana</span>
                <input type="checkbox" defaultChecked className="accent-amber-500" />
              </label>
              <label className="flex items-center justify-between p-1.5 rounded hover:bg-slate-900 cursor-pointer">
                <span className="text-slate-300">Infrastruktur & Obvitnas</span>
                <input type="checkbox" defaultChecked className="accent-amber-500" />
              </label>
            </div>
          </div>
        )}

        {/* Selected Marker Regional Side Overview Card */}
        {selectedMarker && (
          <div className="absolute bottom-3 left-3 right-3 sm:right-auto z-10 max-w-sm bg-slate-950/95 border border-amber-500/50 rounded-xl p-3.5 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">
                  REGIONAL OVERVIEW • {selectedMarker.category}
                </span>
              </div>
              <button 
                onClick={() => setSelectedMarker(null)} 
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-sm font-extrabold text-slate-100">{selectedMarker.title}</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{selectedMarker.description}</p>

            {selectedMarker.details && (
              <div className="mt-2.5 pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[10px] font-mono">
                {selectedMarker.details.personnelCount && (
                  <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                    <span className="text-slate-500 block">PERSONEL:</span>
                    <span className="text-blue-400 font-bold">{selectedMarker.details.personnelCount} Org</span>
                  </div>
                )}
                {selectedMarker.details.riskScore && (
                  <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                    <span className="text-slate-500 block">RISK LEVEL:</span>
                    <span className="text-red-400 font-bold">{selectedMarker.details.riskScore}</span>
                  </div>
                )}
              </div>
            )}

            <div className="mt-3 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500">📍 {selectedMarker.locationName}</span>
              {onNavigate && (
                <button
                  onClick={() => onNavigate(selectedMarker.category as NavigationMenu)}
                  className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] rounded flex items-center gap-1"
                >
                  <span>BUKA DASHBOARD STAF</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
