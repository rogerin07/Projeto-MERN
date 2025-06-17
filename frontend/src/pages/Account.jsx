import React from "react";
import { useParams } from "react-router-dom";
import AccProfile from "../components/AccProfile";

const Account = () => {
  const { subpage } = useParams();

  const buttonClass = (button) => {
    let finalClass = "rounded-full bg-green-400 px-4 py-2 text-white";
    if (button === subpage) finalClass += " bg-green-400 text-white";

    return finalClass;
  };
  return (
    <section className="p-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8">
        <div>
          <button className={buttonClass("personal-data")}>
            Dados Pessoais
          </button>
        </div>
        {subpage === "personal-data" && <AccProfile />}
      </div>
    </section>
  );
};

export default Account;
