import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { WorkerProfile } from '../types';
import { Phone, MapPin } from 'lucide-react';

// Custom SVG marker icon to avoid missing image module error
const createCustomIcon = (color: string) => L.divIcon({
  html: `<svg width="30" height="42" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          <circle cx="12" cy="9" r="3" fill="white"/>
        </svg>`,
  className: 'custom-marker-icon',
  iconSize: [30, 42],
  iconAnchor: [15, 42],
  popupAnchor: [0, -40],
});

const userIcon = createCustomIcon('#3b82f6'); // blue
const workerIcon = createCustomIcon('#10b981'); // emerald

interface MapProps {
  center: [number, number];
  workers: WorkerProfile[];
  userLocation: [number, number] | null;
}

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function Map({ center, workers, userLocation }: MapProps) {
  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden border border-slate-200 shadow-sm">
      <MapContainer center={center} zoom={13} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeView center={center} />
        
        {userLocation && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup>
              <div className="font-semibold">Your Location</div>
            </Popup>
          </Marker>
        )}

        {workers.map((worker) => (
          <Marker 
            key={worker.id} 
            position={[worker.location.lat, worker.location.lng]}
            icon={workerIcon}
          >
            <Popup>
              <div className="p-1 min-w-[150px]">
                <h3 className="font-bold text-lg text-slate-900">{worker.name}</h3>
                <p className="text-sm text-slate-600 mb-2">{worker.category} • {worker.skills}</p>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                  <MapPin size={14} />
                  <span>{worker.village}, {worker.pincode}</span>
                </div>
                <a 
                  href={`tel:${worker.mobile}`}
                  className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors no-underline"
                >
                  <Phone size={16} />
                  Call Now
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
