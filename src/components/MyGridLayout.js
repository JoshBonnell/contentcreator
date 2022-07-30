import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import uuid from "react-uuid";
import CustomGridItem from "./CustomGridItem";
import FlipCard from "./FlipCard";
const ResponsiveGridLayout = WidthProvider(Responsive);

const MyGridLayout = (props) => {
  // TODO: items and layouts should be separate things
  // Adding and removing should be done on items
  // and layout should be updated using onLayoutChange like in example 6

  const originalLayouts = getFromLS("layouts") || { lg: [], md: [], sm: [] };
  const [layouts, setLayouts] = useState(
    JSON.parse(JSON.stringify(originalLayouts))
  );
  const [breakpoints] = useState({
    lg: 769,
    md: 481,
    sm: 0,
  });
  const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");
  const [cols] = useState({ lg: 12, md: 6, sm: 1 });

  const onDrop = (newLayout, layoutItem, e) => {
    layoutItem = {
      x: layoutItem.x,
      y: layoutItem.y,
      h: layoutItem.h,
      w: layoutItem.w,
      i: uuid(),
    };

    let { component } = JSON.parse(e.dataTransfer.getData("dragData"));
    console.log(component);
    if (component === "FlipCard") {
      layoutItem.minW = 2;
      layoutItem.minH = 2;
      layoutItem.h = 2;
      layoutItem.w = 2;
    }

    newLayout[newLayout.length - 1] = layoutItem;

    setLayouts({ ...layouts, [currentBreakpoint]: newLayout });
    saveToLS("layouts", layouts);
  };

  const onBreakpointChange = (newBreakpoint, newCols) => {
    setCurrentBreakpoint(newBreakpoint);
  };

  const onLayoutChange = (currentLayout, allLayouts) => {
    setLayouts(allLayouts);
    saveToLS("layouts", allLayouts);
  };

  const onRemoveItem = (item) => {
    const newLayout = layouts[currentBreakpoint].filter(
      (el) => el.i !== item.i
    );

    setLayouts({ ...layouts, [currentBreakpoint]: newLayout });
    saveToLS("layouts", layouts);
  };

  function renderGridItems() {
    return layouts[currentBreakpoint].map(function (l, i) {
      return (
        <CustomGridItem key={l.i}>
          <FlipCard />
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

  return (
    <ResponsiveGridLayout
      {...props}
      layouts={layouts}
      breakpoints={breakpoints}
      onBreakpointChange={onBreakpointChange}
      onLayoutChange={onLayoutChange}
      cols={cols}
      onDrop={onDrop}
      preventCollision={false}
      isDroppable={true}
      compactType={null}
      className="layout"
      rowHeight={60}
      autoSize={true}
      isBounded={true}
      // measureBeforeMount={true}
      // transformScale={1}
    >
      {renderGridItems()}
    </ResponsiveGridLayout>
  );
};

export default MyGridLayout;
