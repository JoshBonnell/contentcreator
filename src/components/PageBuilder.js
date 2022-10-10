import "../css/App.css";
import React from "react";
import { useEffect, useState, forwardRef, useMemo } from "react";
import CustomGrid from "./CustomGrid";
import TransformScale from "./TransformScale";
import { useDrag, useDrop } from "react-dnd";
import DraggableComponent from "./DraggableComponent";
import uuid from "react-uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PageBuilder = () => {
  const [items, setItems] = useState([
    {
      id: uuid(),
      data: {
        type: "image",
        src: `https://source.unsplash.com/random/720x405?t=${uuid()}`,
      },
    },
    {
      id: uuid(),
      data: {
        type: "image",
        src: `https://source.unsplash.com/random/720x405?t=${uuid()}`,
      },
    },
    {
      id: uuid(),
      data: {
        type: "image",
        src: `https://source.unsplash.com/random/720x405?t=${uuid()}`,
      },
    },
  ]);

  const [scale, setScale] = useState(1);

  const onScaleChange = (scale) => {
    setScale(scale / 100);
  };

  return (
    <div className="pb-root">
      <div className="pb-topbar">
        <TransformScale onScaleChange={onScaleChange} />
      </div>
      <div className="pb-main">
        <CustomGrid items={items} scale={scale} />
      </div>
      <div
        className="pb-context-menu"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <DraggableComponent
          data={{
            type: "image",
            src: `https://source.unsplash.com/random/720x405?t=${uuid()}`,
          }}
        >
          <button className="pb-option">
            <FontAwesomeIcon icon="image" /> IMAGE
          </button>
        </DraggableComponent>
      </div>
    </div>
  );
};

export default PageBuilder;
