import React from "react";

export default function Sidebar() {
  return (
    <div className="w-64 overflow-auto bg-green-700 p-4 text-white">
      <h2 className="mb-4 text-xl font-bold">Notícias Ambientais</h2>
      <ul className="space-y-2">
        <li>🌱 Nova política de reciclagem em vigor.</li>
        <li>🌍 Dia Mundial do Meio Ambiente: 5 de junho.</li>
        <li>♻️ Dicas para reduzir o uso de plástico.</li>
        <li>🌳 Campanha de plantio de árvores na cidade.</li>
      </ul>
    </div>
  );
}
