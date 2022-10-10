import React, { useState } from "react";

const FlipCard = () => {
  const [imgUri, setImgUri] = useState(
    "https://source.unsplash.com/random/720x405"
  );
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front" style={{ padding: 10 }}>
          <img
            style={{ width: "720px", height: "auto" }}
            src={imgUri}
            alt="Avatar"
          />
        </div>
        <div className="flip-card-back">
          <h1>Lorem Ipsum</h1>
          <p style={{ padding: 10 }}>
            Portland sartorial poke yuccie, echo park chillwave blue bottle
            pitchfork heirloom try-hard microdosing enamel pin deep v pok pok
            blog.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
