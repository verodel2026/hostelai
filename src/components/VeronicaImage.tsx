import React from 'react';

const VeronicaImage = () => {
  return (
    <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl shadow-lg bg-white group">
      <img 
        src="https://i.postimg.cc/v8nVMf3x/Gemini-Generated-Image-ttt0rjttt0rjttt0.png"
        alt="Verónica Delgado Neira" 
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 scale-[1.1] origin-bottom"
        style={{ objectPosition: 'center 20%' }}
        referrerPolicy="no-referrer"
      />
      {/* Overlay to hide the star in the bottom right if it's still visible */}
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-white pointer-events-none" style={{ clipPath: 'polygon(100% 100%, 100% 0, 0 100%)' }} />
    </div>
  );
};

export default VeronicaImage;
