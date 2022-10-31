import "../css/App.css";
import React, { useState } from "react";
import CustomGrid from "./CustomGrid";
import { data } from "../data";
import BuilderElementsMenu from "./BuilderElementsMenu";

const PageBuilder = () => {
  const [items, setItems] = useState(data.content.body);

  return (
    <div className="builder">
      <div className="sidebar">
        <BuilderElementsMenu />
      </div>
      <div className="main">
        <CustomGrid items={items} setItems={setItems} />
      </div>
    </div>
  );
};

export default PageBuilder;
