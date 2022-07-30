import React from "react";

const FlipCard = () => {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img
            style={{ width: "100%", height: "100%" }}
            src="https://images.unsplash.com/photo-1597589827317-4c6d6e0a90bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=500&q=80"
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
