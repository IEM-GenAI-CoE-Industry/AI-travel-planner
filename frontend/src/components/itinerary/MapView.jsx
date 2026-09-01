import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix default Leaflet icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Component to dynamically fit bounds of markers
function ChangeView({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds && bounds.length > 0) {
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [bounds, map]);
  return null;
}

export const MapView = ({ activities }) => {
  const validStops = activities?.filter(a => a.lat && a.lng) || [];
  const defaultCenter = validStops.length > 0 ? [validStops[0].lat, validStops[0].lng] : [24.5854, 73.7125];
  const polylinePositions = validStops.map(a => [a.lat, a.lng]);
  const bounds = validStops.map(a => [a.lat, a.lng]);

  return (
    <div className="bg-surface-container-lowest p-2 rounded-3xl ambient-shadow border border-outline-variant/30 overflow-hidden h-[450px] relative z-0">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full rounded-2xl z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {bounds.length > 0 && <ChangeView bounds={bounds} />}

        {/* Route Polyline */}
        {polylinePositions.length > 1 && (
          <Polyline
            positions={polylinePositions}
            color="#00696b"
            weight={3}
            dashArray="6, 8"
            opacity={0.8}
          />
        )}

        {/* Pinpoint Markers */}
        {validStops.map((stop, idx) => (
          <Marker key={stop.id || idx} position={[stop.lat, stop.lng]}>
            <Popup>
              <div className="p-1 text-xs">
                <span className="font-bold text-primary block">{stop.title}</span>
                <span className="text-outline text-[11px] block">{stop.time} • {stop.location}</span>
                <span className="font-semibold text-emerald-700 block mt-1">₹{stop.cost?.toLocaleString()}</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
