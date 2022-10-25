import "../css/App.css";
import React from "react";
import { useEffect, useState, forwardRef, useMemo } from "react";
import CustomGrid from "./CustomGrid";
import { useDrag, useDrop } from "react-dnd";
import { data } from "../data";
import ContextMenu from "./ContextMenu";

const PageBuilder = () => {
  const [items, setItems] = useState(data.content.body);

  return (
    <div className="pb-root">
      <div className="pb-sidebar">
        <ContextMenu />
      </div>
      <div className="pb-main">
        <CustomGrid items={items} />
      </div>
    </div>
  );
};

export default PageBuilder;
