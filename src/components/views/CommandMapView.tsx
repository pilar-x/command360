import React, { useState } from 'react';
import { 
  MapPin, 
  Layers, 
  Flame, 
  ShieldAlert, 
  Navigation, 
  Clock, 
  Play, 
  Pause, 
  Maximize2, 
  Eye, 
  Compass, 
  Crosshair,
  Building,
  Radio,
  CloudRain
} from 'lucide-react';
import { mockIncidents, mockPersonnel } from '../../data/mockData';
import { MapLayerConfig, StaffDataRecord } from '../../types';
import { IndonesiaInteractiveMap } from '../map/IndonesiaInteractiveMap';

interface CommandMapViewProps {
  publishedRecords?: StaffDataRecord[];
}

export const CommandMapView: React.FC<CommandMapViewProps> = ({
  publishedRecords = []
}) => {
  return (
    <div className="space-y-4">
      
      {/* Map Control Bar */}
      <div className="p-3 sm:p-4 rounded-lg bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
          <h1 className="text-xs sm:text-sm font-extrabold text-slate-100 uppercase tracking-wide">
            COMMAND MAP • FULL INTERACTIVE GEO-SPATIAL OVERVIEW
          </h1>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
            WGS84 / LEAFLET GIS
          </span>
        </div>
      </div>

      {/* Main Interactive Map View */}
      <IndonesiaInteractiveMap 
        publishedRecords={publishedRecords}
        heightClass="h-[650px]"
      />

    </div>
  );
};

