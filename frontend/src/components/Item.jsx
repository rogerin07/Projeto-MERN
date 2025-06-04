import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = ["images/foto1.jpg", "images/foto2.png", "images/foto3.jpeg"];

const Item = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-xl bg-gray-100 shadow-md sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px]">
      <div className="absolute top-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/80 px-4 py-1 text-sm font-medium text-gray-800 shadow-sm backdrop-blur-md">
        Clicou, limpou
      </div>

      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={`Imagem ${index + 1}`}
          className="h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>

      <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-1 w-4 rounded-full transition-all ${
              i === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Item;
