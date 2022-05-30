import "./App.css";
import { useEffect, useState, forwardRef, useMemo } from "react";
import GridLayout from "./GridLayout";

const CustomGridItemComponent = forwardRef(
  ({ style, className, ...props }, ref) => {
    return (
      <div
        key={props.key}
        style={{ ...style }}
        className={className}
        ref={ref}
      ></div>
    );
  }
);

function App() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");
  const [layouts, setLayouts] = useState({ lg: generateLayout() });

  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

  const onNewLayout = () => {
    setLayouts({ lg: generateLayout() });
  };

  const onLayoutChange = (layout, layouts) => {
    console.log(layout);
  };

  const onDrop = (layout, layoutItem, _event) => {
    alert(
      `Dropped element props:\n${JSON.stringify(
        layoutItem,
        ["x", "y", "w", "h"],
        2
      )}`
    );
  };

  function generateLayout() {
    return Array(25)
      .fill()
      .map(function (item, i) {
        var y = Math.ceil(Math.random() * 4) + 1;
        return {
          x: Math.round(Math.random() * 5) * 2,
          y: Math.floor(i / 6) * y,
          w: 2,
          h: y,
          i: i.toString(),
        };
      });
  }

  return (
    <div className="app">
      <div>
        Current Breakpoint: {currentBreakpoint} ({cols[currentBreakpoint]}{" "}
        columns)
      </div>
      <button onClick={onNewLayout}>Generate New Layout</button>
      <div
        className="droppable-element"
        draggable={true}
        unselectable="on"
        // this is a hack for firefox
        // Firefox requires some kind of initialization
        // which we can do by adding this attribute
        // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
        onDragStart={(e) => e.dataTransfer.setData("text/plain", "")}
      >
        Droppable Element (Drag me!)
      </div>
      <div className="grid-wrapper">
        <GridLayout
          className="layout"
          rowHeight={50}
          cols={cols}
          breakpoints={breakpoints}
          layouts={layouts}
          setCurrentBreakpoint={setCurrentBreakpoint}
          onLayoutChange={onLayoutChange}
          onDrop={onDrop}
        />
      </div>
    </div>
  );
}

export default App;
