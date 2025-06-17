import React from "react";

const AccProfile = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <p>Logado como roger (roger@adm.com)</p>

      <button className="min-w-44 cursor-pointer rounded-full px-4 py-2 transition hover:bg-green-400 hover:text-white">
        Logout
      </button>
    </div>
  );
};

export default AccProfile;
