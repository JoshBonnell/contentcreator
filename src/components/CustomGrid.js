import React, { useState } from "react";
import DraggableComponent from "./DraggableComponent";
import TransformScale from "./TransformScale";

import Components from "./Components";

const CustomGrid = React.forwardRef(({ items }, ref) => {
  const [scale, setScale] = useState(1);

  const onScaleChange = (scale) => {
    setScale(scale / 100);
  };
  return (
    <div className="grid-wrapper" ref={ref}>
      <div className="pb-topbar">
        <TransformScale onScaleChange={onScaleChange} />
      </div>
      <div
        className="grid"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: scale > 1 ? "left top" : "center top",
        }}
      >
        {items.map((item) => {
          return (
            <DraggableComponent key={item._uid}>
              <div className="grid-item">{Components(item)}</div>
            </DraggableComponent>
          );
        })}
      </div>
    </div>
  );
});

export default CustomGrid;
