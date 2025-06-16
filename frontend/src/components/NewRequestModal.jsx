import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function LocationPicker({ setPosition, setAddress }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&format=json`,
      )
        .then((res) => res.json())
        .then((data) => {
          setAddress(data.display_name || "");
        });
    },
  });
  return null;
}

function MapUpdater({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position && map) {
      map.flyTo(position, 16);
    }
  }, [position]);

  return null;
}

export default function NewRequestModal({ onClose, onSave }) {
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState([]);
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const typingTimeout = useRef(null);

  useEffect(() => {
    if (address.length < 5) return;

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      setLoading(true);
      fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          address,
        )}&format=json&limit=1`,
      )
        .then((res) => res.json())
        .then((data) => {
          if (data && data[0]) {
            setPosition({
              lat: parseFloat(data[0].lat),
              lng: parseFloat(data[0].lon),
            });
          }
        })
        .finally(() => setLoading(false));
    }, 800);
  }, [address]);

  const handlePhotoChange = (e) => {
    setPhotos([...e.target.files]);
  };

  const handleSave = async () => {
    if (!address || !position || photos.length === 0) {
      alert("Preencha todos os campos e adicione pelo menos uma foto.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("address", address);
      formData.append("location", JSON.stringify(position));
      for (let i = 0; i < photos.length; i++) {
        formData.append("photos", photos[i]);
      }

      const response = await fetch("http://localhost:3000/requests", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const err = await response.text();
        console.error("Erro ao salvar requisição:", err);
        alert("Erro ao salvar requisição: " + err);
        return;
      }

      const savedRequest = await response.json();
      console.log("Requisição salva com sucesso:", savedRequest);

      if (onSave) onSave(savedRequest);
      onClose();
    } catch (err) {
      console.error("Erro no envio:", err);
      alert("Erro no envio: " + err.message);
    }
  };

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="max-h-[80vh] w-full max-w-xl overflow-y-auto rounded bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-bold">Nova Requisição</h2>

        <label className="mb-2 block">Endereço:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mb-2 w-full rounded border p-2"
        />
        {loading && (
          <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
            <span className="h-4 w-4 animate-spin rounded-full border-t-2 border-b-2 border-gray-500"></span>
            Buscando endereço no mapa...
          </div>
        )}

        <label className="mb-2 block">Fotos:</label>
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
            <LocationPicker setPosition={setPosition} setAddress={setAddress} />
            <MapUpdater position={position} />
            {position && <Marker position={position} />}
          </MapContainer>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded bg-gray-300 px-4 py-2 transition-colors hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="rounded bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
