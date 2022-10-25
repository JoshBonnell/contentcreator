import React from "react";
import DraggableComponent from "./DraggableComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import uuid from "react-uuid";
import "../css/App.css";

const ContextMenu = (props) => {
  return (
    <div className="pb-context-menu">
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
  );
};

export default ContextMenu;
