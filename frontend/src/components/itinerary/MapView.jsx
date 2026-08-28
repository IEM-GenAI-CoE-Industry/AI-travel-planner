import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';

// Custom pin marker icon
const customIcon = L.divIcon({
  className: 'custom-pin-marker',
  html: `<div style="background-color: #00696b; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
          <div style="background-color: #5af8fb; width: 8px; height: 8px; border-radius: 50%;"></div>
        </div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, 13);
  }, [center, map]);
  return null;
}

export const MapView = ({ activities }) => {
  const validActivities = activities?.filter(a => a.lat && a.lng) || [];
  const defaultCenter = validActivities.length > 0
    ? [validActivities[0].lat, validActivities[0].lng]
    : [24.5754, 73.6800]; // Udaipur, Rajasthan default

  const polylinePositions = validActivities.map(a => [a.lat, a.lng]);

  return (
    <div className="bg-surface-container-lowest rounded-3xl overflow-hidden ambient-shadow border border-outline-variant/30 h-112.5 relative z-0">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <ChangeView center={defaultCenter} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {validActivities.map((act) => (
          <Marker key={act.id} position={[act.lat, act.lng]} icon={customIcon}>
            <Popup>
              <div className="p-1 font-sans text-xs">
                <span className="font-bold text-primary block">{act.time} • {act.title}</span>
                <span className="text-secondary font-medium block">{act.location}</span>
                <p className="text-gray-600 mt-1">{act.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {polylinePositions.length > 1 && (
          <Polyline
            positions={polylinePositions}
            pathOptions={{ color: '#00696b', weight: 4, opacity: 0.8, dashArray: '8, 8' }}
          />
        )}
      </MapContainer>
    </div>
  );
};
