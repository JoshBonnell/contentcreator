import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import uuid from "react-uuid";
const ResponsiveGridLayout = WidthProvider(Responsive);

const MyGridLayout = (props) => {
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
  // const [layout, setLayout] = useState([]);

  const onDrop = (newLayout, layoutItem, _event) => {
    layoutItem = {
      x: layoutItem.x,
      y: layoutItem.y,
      h: layoutItem.h,
      w: layoutItem.w,
      i: uuid(),
    };

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

  function renderGrid() {
    console.log(layouts);
    console.log(currentBreakpoint);
    return layouts[currentBreakpoint].map(function (l) {
      return (
        <div key={l.i} /*data-grid={l}*/ className={l.static ? "static" : ""}>
          <span className="text">asdf</span>
        </div>
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
      {renderGrid()}
    </ResponsiveGridLayout>
  );
};

export default MyGridLayout;
