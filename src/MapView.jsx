import React from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const startIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  iconSize: [32, 32],
});
const endIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32],
});

const MapView = ({ routeCoords, startCoords, endCoords }) => {
  const center = startCoords
    ? [startCoords.lat, startCoords.lng]
    : [23.0225, 72.5714];

  const calculateDistance = (coords) => {
    if (coords.length < 2) return 0;
    let dist = 0;
    for (let i = 1; i < coords.length; i++) {
      const [lat1, lon1] = coords[i - 1];
      const [lat2, lon2] = coords[i];
      const R = 6371e3;
      const φ1 = (lat1 * Math.PI) / 180;
      const φ2 = (lat2 * Math.PI) / 180;
      const Δφ = ((lat2 - lat1) * Math.PI) / 180;
      const Δλ = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(Δφ / 2) ** 2 +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      dist += R * c;
    }
    return dist / 1000;
  };

  const distance = calculateDistance(routeCoords).toFixed(2);

  return (
    <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {routeCoords.length > 0 && (
        <>
          <Polyline positions={routeCoords} color="blue" />
          {startCoords && (
            <Marker position={[startCoords.lat, startCoords.lng]} icon={startIcon}>
              <Popup>Start Point</Popup>
            </Marker>
          )}
          {endCoords && (
            <Marker position={[endCoords.lat, endCoords.lng]} icon={endIcon}>
              <Popup>End Point</Popup>
            </Marker>
          )}
        </>
      )}

      {routeCoords.length > 1 && (
        <div className="leaflet-top leaflet-right absolute top-2 right-2 p-2 bg-white rounded shadow-md z-[1000] text-sm">
          🛣️ Distance: <strong>{distance} km</strong>
        </div>
      )}
    </MapContainer>
  );
};

export default MapView;
