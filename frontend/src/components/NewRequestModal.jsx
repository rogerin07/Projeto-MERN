import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function LocationPicker({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return null;
}

export default function NewRequestModal({ onClose, onSave }) {
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState([]);
  const [position, setPosition] = useState(null);

  const handlePhotoChange = (e) => {
    setPhotos([...e.target.files]);
  };

  const handleSave = () => {
    const newRequest = {
      id: Date.now(),
      address,
      photos,
      location: position,
      createdAt: new Date().toISOString(),
    };
    onSave(newRequest);
  };

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="w-full max-w-xl rounded bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-bold">Nova Requisição</h2>

        <label className="mb-2 block">Endereço:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mb-4 w-full rounded border p-2"
        />

        <label className="mb-2 block">Anexar fotos:</label>
        <div className="mb-4">
          <label className="inline-block cursor-pointer rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Selecionar fotos
            <input
              type="file"
              multiple
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>
        </div>

        {photos.length > 0 && (
          <div className="mb-4">
            <label className="mb-2 block">Pré-visualização:</label>
            <div className="flex flex-wrap gap-2">
              {photos.map((file, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(file)}
                  alt="prévia"
                  className="h-20 w-20 rounded object-cover"
                />
              ))}
            </div>
          </div>
        )}

        <label className="mb-2 block">
          Selecione no mapa (caso não saiba o endereço exato):
        </label>
        <div className="mb-4 h-64">
          <MapContainer
            center={[-15.793889, -47.882778]}
            zoom={13}
            style={{ height: "100%" }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationPicker setPosition={setPosition} />
            {position && <Marker position={position} />}
          </MapContainer>
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="rounded bg-gray-300 px-4 py-2">
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="rounded bg-green-600 px-4 py-2 text-white"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
