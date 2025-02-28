import React, { useState } from "react";

export default function BeerCard({ beer }) {
  const [imgSrc, setImgSrc] = useState(beer.image || "/placeholder.jpg");

  return (
    <div className="relative bg-[#A7BEAE] rounded-xl p-5 shadow-xl overflow-hidden hover:scale-105 transition-all duration-300">
      {/* Image Container with Tilted Effect */}
      <div className="relative">
        <img
          src={imgSrc}
          alt={beer.name}
          className="w-full h-56 object-cover rounded-lg transform rotate-3 shadow-md"
          loading="lazy"
          onError={() => setImgSrc("/placeholder.jpg")} // If image fails, use placeholder
        />
      </div>

      {/* Beer Info */}
      <div className="mt-5 text-center">
        <h2 className="text-xl font-bold">{beer.name}</h2>
        <p className="text-[#B85042] mt-2 text-sm">
          {beer.price || "No price available"}
        </p>
      </div>

      {/* Floating Tag */}
      <span className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
        🍺 Ale
      </span>
    </div>
  );
}
