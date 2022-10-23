import React from "react";
import ColumnLayout from "./ColumnLayout";
import FlipCard from "./FlipCard";
import Image from "./Image";

const Components = {
  image: {
    type: Image,
  },
  flipcard: {
    type: FlipCard,
    validChildComponents: [Image],
  },
  columnlayout: {
    type: ColumnLayout,
  },
};

// TODO: need a map of what components can be children of what other components,
// and throw an error or ignore if invalid, ie: flipcard's child can't be another flipcard.

// Get the props for a component. Recursively handle nested sub-components
const getProps = (item) => {
  const props = {
    key: item._uid,
  };

  for (const [key, value] of Object.entries(item.props)) {
    console.log(key, value);
    const isChildComponent =
      value !== null &&
      typeof value === "object" &&
      value.hasOwnProperty("component");

    const isArrayOfChildComponents = value !== null &&
    typeof value === "array" &&
    value.some((item) => )

    if (isChildComponent) {
      // TODO: make sure its children are valid children (maybe put this in getProps)
      // if (Components[item.component].validChildComponents) {
      //   console.log(
      //     Components[item.component].validChildComponents.includes(
      //       Components[item.component].type
      //     )
      //   );
      // }

      props[key] = React.createElement(
        Components[value.component].type,
        getProps(value)
      );
    } else {
      props[key] = value;
    }
  }

  return props;
};

export default (item) => {
  if (typeof Components[item.component].type !== "undefined") {
    return React.createElement(Components[item.component].type, getProps(item));
  }

  return React.createElement(
    () => <div>The component {item.component} has not been created yet.</div>,
    { key: item._uid }
  );
};
