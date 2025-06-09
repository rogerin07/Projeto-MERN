import React from "react";
import SLAProgress from "./SLAProgress";

function RequestPanel({ requests, onNewRequest, onSelectRequest }) {
  return (
    <div className="rounded bg-white p-4 shadow">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Minhas Requisições</h2>
        <button
          onClick={onNewRequest}
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Nova Requisição
        </button>
      </div>
      <ul className="space-y-4">
        {requests.map((req, idx) => (
          <li
            key={idx}
            className="cursor-pointer rounded border p-3 shadow hover:bg-gray-100"
            onClick={() => onSelectRequest(req)}
          >
            <p>
              <strong>Endereço:</strong> {req.address}
            </p>
            <p>
              <strong>Data:</strong>{" "}
              {new Date(req.createdAt).toLocaleDateString()}
            </p>
            <SLAProgress createdAt={req.createdAt} />
          </li>
        ))}
        {requests.length === 0 && <p>Nenhuma requisição criada ainda.</p>}
      </ul>
    </div>
  );
}

export default RequestPanel;
