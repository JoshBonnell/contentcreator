import "../css/App.css";
import { useEffect, useState, forwardRef, useMemo } from "react";
import MyGridLayout from "./MyGridLayout";

const PageBuilder = () => {
  return (
    <div className="pb-root">
      <div className="pb-main">
        <MyGridLayout />
      </div>
      <div className="pb-context-menu">
        <div
          className="droppable-element"
          draggable={true}
          unselectable="on"
          // this is a hack for firefox
          // Firefox requires some kind of initialization
          // which we can do by adding this attribute
          // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
          onDragStart={(e) =>
            e.dataTransfer.setData(
              "dragData",
              JSON.stringify({ component: "FlipCard" })
            )
          }
        >
          Droppable Element (Drag me!)
        </div>
      </div>
    </div>
  );
};

export default PageBuilder;
