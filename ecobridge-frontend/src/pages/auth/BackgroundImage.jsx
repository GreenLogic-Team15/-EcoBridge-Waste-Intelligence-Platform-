import React from "react";

const BackgroundImage = () => {
  return (
    <>
      <img
        src={`${import.meta.env.BASE_URL}/images/Ecobridge.jpg`}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        loading="lazy"
        decoding="async"
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
      <div className="absolute inset-0 bg-[#2E5C47]/80"></div>
    </>
  );
};

export default BackgroundImage;
