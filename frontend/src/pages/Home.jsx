import React from "react";
import Item from "../components/Item";

const Home = () => {
  return (
    <section>
      <div className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6 p-8">
        <Item />
      </div>
    </section>
  );
};

export default Home;
