import React, { useState } from "react";

function RequestDetails({ request, onClose, onUpdate }) {
  const [address, setAddress] = useState(request.address);
  const [photos, setPhotos] = useState(request.photos);

  const handlePhotoChange = (e) => {
    setPhotos([...e.target.files]);
  };

  const handleSave = () => {
    const updated = {
      ...request,
      address,
      photos,
    };
    onUpdate(updated);
  };

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="w-full max-w-xl rounded bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-bold">Detalhes da Requisição</h2>

        <label className="mb-2 block">Endereço:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mb-4 w-full rounded border p-2"
        />

        <label className="mb-2 block">Fotos atuais:</label>
        <div className="mb-4 flex flex-wrap gap-2">
          {photos &&
            photos.length > 0 &&
            Array.from(photos).map((file, i) => (
              <img
                key={i}
                src={URL.createObjectURL(file)}
                alt="foto"
                className="h-20 w-20 rounded object-cover"
              />
            ))}
        </div>

        <label className="mb-2 block">Substituir fotos:</label>
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

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="rounded bg-gray-300 px-4 py-2">
            Voltar
          </button>
          <button
            onClick={handleSave}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Salvar edição
          </button>
        </div>
      </div>
    </div>
  );
}

export default RequestDetails;
