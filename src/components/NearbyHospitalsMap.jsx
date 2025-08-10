// src/components/NearbyHospitalsModal.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149059.png",
  iconSize: [40, 40],
});

const hospitalIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2965/2965567.png",
  iconSize: [40, 40],
});

const FlyToUser = ({ coords }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !coords) return;

    map.flyTo(coords, 13, {
      duration: 1.5,
    });
  }, [map, coords]);

  return null;
};


const NearbyHospitalsModal = ({ open, onClose, hospitals }) => {
  const [userCoords, setUserCoords] = useState(null);

  useEffect(() => {
    if (open) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserCoords([latitude, longitude]);
        },
        (err) => console.error("Error getting location", err)
      );
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4 overflow-auto">
      <div className="bg-white rounded-xl w-full h-full md:w-[90%] md:h-[90%] relative p-4">
        <h2 className="text-2xl font-bold mb-4">Nearby Hospitals</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-red-600 px-4 py-2 rounded-lg"
        >
          Close
        </button>

        {userCoords ? (
          <MapContainer
            center={userCoords}
            zoom={13}
            className="w-full h-[90%] rounded-lg"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            />
            <FlyToUser coords={userCoords} />
            <Marker position={userCoords} icon={userIcon}>
              <Popup>Your Current Location</Popup>
            </Marker>

            {hospitals.map((h, i) => (
              <Marker key={i} position={[h.lat, h.lng]} icon={hospitalIcon}>
                <Popup>
                  <strong>{h.name}</strong>
                  <br />
                  {h.location}
                  <br />
                  {h.phone && <div>📞 {h.phone}</div>}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        ) : (
          <p className="text-center text-lg">Getting your location...</p>
        )}
      </div>
    </div>
  );
};

export default NearbyHospitalsModal;