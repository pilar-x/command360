import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Search, MapPin, Check, Crosshair } from 'lucide-react';

interface LocationPickerMapProps {
  initialLat?: number;
  initialLng?: number;
  initialLocationName?: string;
  initialRegion?: string;
  onSelectLocation: (location: {
    lat: number;
    lng: number;
    locationName: string;
    region: string;
  }) => void;
  onClose?: () => void;
}

const INDONESIA_PRESETS = [
  { name: 'Pekanbaru, Riau', region: 'Riau', lat: 0.5310, lng: 101.4474 },
  { name: 'Kampar, Riau', region: 'Riau', lat: 0.3340, lng: 101.0250 },
  { name: 'Dumai, Riau', region: 'Riau', lat: 1.6810, lng: 101.4490 },
  { name: 'Balikpapan, Kaltim', region: 'Kalimantan Timur', lat: -1.2379, lng: 116.8529 },
  { name: 'Pontianak, Kalbar', region: 'Kalimantan Barat', lat: -0.0263, lng: 109.3425 },
  { name: 'Jakarta Pusat', region: 'DKI Jakarta', lat: -6.1805, lng: 106.8284 },
  { name: 'Surabaya, Jatim', region: 'Jawa Timur', lat: -7.2575, lng: 112.7521 },
  { name: 'Medan, Sumut', region: 'Sumatera Utara', lat: 3.5952, lng: 98.6722 },
  { name: 'Makassar, Sulsel', region: 'Sulawesi Selatan', lat: -5.1477, lng: 119.4327 },
  { name: 'Jayapura, Papua', region: 'Papua', lat: -2.5489, lng: 140.7196 },
  { name: 'Natuna, Kepri', region: 'Kepulauan Riau', lat: 3.9000, lng: 108.2000 },
  { name: 'Jambi Selatan', region: 'Jambi', lat: -1.6100, lng: 103.6100 },
];

export const LocationPickerMap: React.FC<LocationPickerMapProps> = ({
  initialLat = 0.5310,
  initialLng = 101.4474,
  initialLocationName = 'Pekanbaru, Riau',
  initialRegion = 'Riau',
  onSelectLocation,
  onClose
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const [currentLat, setCurrentLat] = useState<number>(initialLat);
  const [currentLng, setCurrentLng] = useState<number>(initialLng);
  const [locationName, setLocationName] = useState<string>(initialLocationName);
  const [region, setRegion] = useState<string>(initialRegion);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<typeof INDONESIA_PRESETS>([]);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [initialLat, initialLng],
      zoom: 8,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 19
    }).addTo(map);

    // Custom Icon
    const customIcon = L.divIcon({
      className: 'location-picker-marker',
      html: `
        <div style="
          width: 32px;
          height: 32px;
          background-color: #f59e0b;
          border: 3px solid #ffffff;
          border-radius: 50%;
          box-shadow: 0 0 15px rgba(245, 158, 11, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: grab;
        ">
          <div style="width: 8px; height: 8px; background-color: #090d16; border-radius: 50%;"></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    const marker = L.marker([initialLat, initialLng], {
      draggable: true,
      icon: customIcon
    }).addTo(map);

    markerRef.current = marker;
    mapRef.current = map;

    // Handle marker drag
    marker.on('dragend', (e) => {
      const pos = e.target.getLatLng();
      const newLat = parseFloat(pos.lat.toFixed(5));
      const newLng = parseFloat(pos.lng.toFixed(5));
      setCurrentLat(newLat);
      setCurrentLng(newLng);
      // Auto assign estimated label
      setLocationName(`Koordinat Custom (${newLat}, ${newLng})`);
    });

    // Handle map click
    map.on('click', (e) => {
      const newLat = parseFloat(e.latlng.lat.toFixed(5));
      const newLng = parseFloat(e.latlng.lng.toFixed(5));
      marker.setLatLng([newLat, newLng]);
      setCurrentLat(newLat);
      setCurrentLng(newLng);
      setLocationName(`Koordinat Terpilih (${newLat}, ${newLng})`);
    });

    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Handle Search
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    const filtered = INDONESIA_PRESETS.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.region.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const selectPresetLocation = (preset: typeof INDONESIA_PRESETS[0]) => {
    setCurrentLat(preset.lat);
    setCurrentLng(preset.lng);
    setLocationName(preset.name);
    setRegion(preset.region);
    setSearchQuery('');
    setSearchResults([]);

    if (mapRef.current && markerRef.current) {
      mapRef.current.setView([preset.lat, preset.lng], 11);
      markerRef.current.setLatLng([preset.lat, preset.lng]);
    }
  };

  const handleConfirm = () => {
    onSelectLocation({
      lat: currentLat,
      lng: currentLng,
      locationName: locationName,
      region: region
    });
    if (onClose) onClose();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl space-y-3 p-3 sm:p-4 text-slate-100">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Crosshair className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-100">
            Interactive Location & Coordinate Selector
          </h3>
        </div>
        <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
          GIS MAP PICKER
        </div>
      </div>

      {/* Search Input & Quick Preset Buttons */}
      <div className="space-y-2 relative">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Cari Kota, Kab/Kota, Provinsi di Indonesia..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-amber-500 font-sans"
          />
        </div>

        {/* Search Results Dropdown */}
        {searchResults.length > 0 && (
          <div className="absolute left-0 right-0 top-10 bg-slate-950 border border-slate-800 rounded-lg shadow-xl z-50 max-h-48 overflow-y-auto py-1">
            {searchResults.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => selectPresetLocation(preset)}
                className="w-full text-left px-3 py-2 text-xs hover:bg-slate-800 text-slate-200 flex items-center justify-between transition-colors border-b border-slate-900 last:border-0"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-semibold">{preset.name}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">{preset.region}</span>
              </button>
            ))}
          </div>
        )}

        {/* Quick Presets Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-mono">
          <span className="text-slate-500 shrink-0">Presest:</span>
          {INDONESIA_PRESETS.slice(0, 5).map((preset, i) => (
            <button
              key={i}
              type="button"
              onClick={() => selectPresetLocation(preset)}
              className="px-2 py-1 rounded bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 shrink-0 transition-colors"
            >
              {preset.name.split(',')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-[260px] sm:h-[300px] rounded-lg overflow-hidden border border-slate-800 shadow-inner">
        <div ref={mapContainerRef} className="w-full h-full" />
        <div className="absolute top-2 right-2 bg-slate-950/90 backdrop-blur px-2.5 py-1 rounded text-[10px] font-mono border border-slate-800 text-amber-400 z-[400] shadow">
          KLIK AJA PETA / GESER MARKER
        </div>
      </div>

      {/* Selected Coordinates & Details Bar */}
      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
        <div>
          <span className="text-slate-500 text-[10px] block">LOKASI / WILAYAH</span>
          <span className="text-slate-200 font-bold truncate block">{locationName} ({region})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-slate-500 text-[10px] block">LATITUDE</span>
            <span className="text-amber-400 font-bold">{currentLat}</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block">LONGITUDE</span>
            <span className="text-amber-400 font-bold">{currentLng}</span>
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="flex items-center justify-end gap-2 pt-1">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Batal
          </button>
        )}
        <button
          type="button"
          onClick={handleConfirm}
          className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 shadow"
        >
          <Check className="w-4 h-4" />
          <span>GUNAKAN LOKASI INI</span>
        </button>
      </div>

    </div>
  );
};
