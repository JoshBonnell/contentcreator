import { useEffect, useState, forwardRef, useMemo } from "react";

const CustomGridItemComponent = () =>
  forwardRef(({ style, className, ...props }, ref) => {
    return (
      <div
        key={props.key}
        style={{ ...style }}
        className={className}
        ref={ref}
      ></div>
    );
  });

export default CustomGridItemComponent;
