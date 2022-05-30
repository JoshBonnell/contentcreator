import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const GridLayout = (props) => {
  function generateDOM() {
    return props.layouts.lg.map(function (l, i) {
      return (
        <div key={i} className={l.static ? "static" : ""}>
          {l.static ? (
            <span
              className="text"
              title="This item is static and cannot be removed or resized."
            >
              Static - {i}
            </span>
          ) : (
            <span className="text">{i}</span>
          )}
        </div>
      );
    });
  }

  const onBreakpointChange = (breakpoint) => {
    props.setCurrentBreakpoint(breakpoint);
  };

  const onLayoutChange = (layout, layouts) => {
    props.onLayoutChange(layout, layouts);
  };

  return (
    <ResponsiveReactGridLayout
      {...props}
      layouts={props.layouts}
      onBreakpointChange={onBreakpointChange}
      onLayoutChange={onLayoutChange}
      onDrop={props.onDrop}
      // WidthProvider option
      measureBeforeMount={false}
      preventCollision={false}
      isDroppable={true}
    >
      {generateDOM()}
    </ResponsiveReactGridLayout>
  );
};

export default GridLayout;
