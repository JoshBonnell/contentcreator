import React, { useState } from "react";
import DraggableComponent from "./DraggableComponent";

const CustomGrid = React.forwardRef(({ items, scale }, ref) => {
  const renderItem = (item) => {
    if (item.data.type === "image") {
      return (
        <DraggableComponent key={item.id}>
          <div className="grid-item">
            <img src={item.data.src} alt="" />
          </div>
        </DraggableComponent>
      );
    }
    return null;
  };

  return (
    <div className="grid-wrapper" ref={ref}>
      <div
        className="grid"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: scale > 1 ? "left top" : "center top",
        }}
      >
        {/* <div className="grid-item" style={{ gridColumn: "1 / 3" }}>
          <img src="https://source.unsplash.com/random/1280x720" alt="" />
        </div>
        <div className="grid-item" style={{ gridColumn: "1 / 3" }}>
          <h1>Welcome to your new swamp, Shrek.</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor
            condimentum lacinia quis vel eros. Velit egestas dui id ornare arcu
            odio. Enim eu turpis egestas pretium aenean pharetra magna ac. Diam
            maecenas ultricies mi eget mauris pharetra et.
          </p>
          <p style={{ marginTop: 10 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet risus
            nullam eget felis. Velit euismod in pellentesque massa placerat. Felis
            eget nunc lobortis mattis aliquam faucibus purus. Auctor neque vitae
            tempus quam pellentesque.
          </p>
        </div> */}
        {items.map((item) => {
          return renderItem(item);
        })}
        {/* <div className="grid-item">
          <img src="https://source.unsplash.com/random/720x405" alt="" />
        </div>
        <div className="grid-item">
          <img src="https://source.unsplash.com/random/720x405" alt="" />
        </div>
        <div className="grid-item">
          <img src="https://source.unsplash.com/random/720x405" alt="" />
        </div> */}
      </div>
    </div>
  );
});

export default CustomGrid;
