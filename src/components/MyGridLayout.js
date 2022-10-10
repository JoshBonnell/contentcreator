import React, { useState, useCallback } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import uuid from "react-uuid";
import CustomGridItem from "./CustomGridItem";
import FlipCard from "./FlipCard";
const ReactGridLayout = WidthProvider(RGL);

const MyGridLayout = (props) => {
  // TODO: items and layouts should be separate things
  // Adding and removing should be done on items
  // and layout should be updated using onLayoutChange like in example 6

  const [gridWidth, setGridWidth] = useState(1200);
  const [cols] = useState(12);
  // Each cell should be a square, so it's container width / number of columns,
  // adjusting for default margin of 10px between each column
  const [rowHeight, setRowHeight] = useState(
    (gridWidth - (cols + 1) * 10) / cols
  );
  const originalLayout = getFromLS("layout") || [];
  const [layout, setLayout] = useState(originalLayout);

  const onDrop = (newLayout, layoutItem, e) => {
    layoutItem = {
      x: layoutItem.x,
      y: layoutItem.y,
      h: 1,
      w: 1,
      i: uuid(),
    };

    let { component } = JSON.parse(e.dataTransfer.getData("dragData"));
    // if (component === "FlipCard") {
    //   layoutItem.minW = 1;
    //   layoutItem.minH = 1;
    //   layoutItem.h = 2;
    //   layoutItem.w = 2;
    // }

    newLayout[newLayout.length - 1] = layoutItem;

    setLayout(newLayout);
    saveToLS("layout", layout);
  };

  const onRemoveItem = (item) => {
    const newLayout = layout.filter((el) => el.i !== item.i);

    setLayout(newLayout);
    saveToLS("layout", layout);
  };

  function renderGridItems() {
    return layout.map(function (l, i) {
      return (
        <CustomGridItem key={l.i}>
          {/* <FlipCard /> */}
          <div></div>
          <span
            onClick={() => onRemoveItem(l)}
            style={{
              position: "absolute",
              top: "0%",
              right: "2%",
              cursor: "pointer",
            }}
          >
            x
          </span>
        </CustomGridItem>
      );
    });
  }

  function getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
      try {
        ls = JSON.parse(global.localStorage.getItem("rgl")) || {};
      } catch (e) {
        /*Ignore*/
      }
    }
    return ls[key];
  }

  function saveToLS(key, value) {
    if (global.localStorage) {
      global.localStorage.setItem(
        "rgl",
        JSON.stringify({
          [key]: value,
        })
      );
    }
  }

  //resize with preserving aspect ratio
  const onResize = useCallback((l, oldLayoutItem, layoutItem, placeholder) => {
    const heightDiff = layoutItem.h - oldLayoutItem.h;
    const widthDiff = layoutItem.w - oldLayoutItem.w;
    const changeCoef = oldLayoutItem.w / oldLayoutItem.h;
    if (Math.abs(heightDiff) < Math.abs(widthDiff)) {
      layoutItem.h = layoutItem.w / changeCoef;
      placeholder.h = layoutItem.w / changeCoef;
    } else {
      layoutItem.w = layoutItem.h * changeCoef;
      placeholder.w = layoutItem.h * changeCoef;
    }
  }, []);

  return (
    <div className="grid-wrapper" style={{ width: gridWidth }}>
      <ReactGridLayout
        layout={layout}
        cols={cols}
        rowHeight={rowHeight}
        onDrop={onDrop}
        preventCollision={false}
        isDroppable={true}
        compactType={"vertical"}
        className="layout"
        autoSize={true}
        isBounded={true}
        onResize={onResize}
        // transformScale={1}
      >
        {renderGridItems()}
      </ReactGridLayout>
    </div>
  );
};

export default MyGridLayout;
