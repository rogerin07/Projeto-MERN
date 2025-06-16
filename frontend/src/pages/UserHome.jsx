import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import RequestPanel from "../components/RequestPanel";
import NewRequestModal from "../components/NewRequestModal";
import RequestDetails from "../components/RequestDetails";

function UserHome() {
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/requests", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Falha ao buscar requisições");
        return res.json();
      })
      .then((data) => {
        setRequests(data);
      })
      .catch((err) => {
        console.error("Erro ao carregar requisições:", err);
      });
  }, []);

  const handleNewRequest = (newRequest) => {
    setRequests([...requests, newRequest]);
    setShowModal(false);
  };

  const handleUpdateRequest = (updated) => {
    const updatedList = requests.map((r) =>
      r._id === updated._id ? updated : r,
    );
    setRequests(updatedList);
    setSelectedRequest(null);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 overflow-y-auto bg-gray-100 p-4">
        <Sidebar />
      </div>
      <div className="w-3/4 overflow-y-auto p-4">
        <RequestPanel
          requests={requests}
          onNewRequest={() => setShowModal(true)}
          onSelectRequest={(req) => setSelectedRequest(req)}
        />
      </div>
      {showModal && (
        <NewRequestModal
          onClose={() => setShowModal(false)}
          onSave={handleNewRequest}
        />
      )}
      {selectedRequest && (
        <RequestDetails
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onUpdate={handleUpdateRequest}
        />
      )}
    </div>
  );
}

export default UserHome;
