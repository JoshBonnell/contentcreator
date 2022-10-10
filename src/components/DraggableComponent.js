import React, { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const DraggableComponent = (props) => {
  const ref = useRef(null);
  const [dragCollect, drag, dragPreview] = useDrag(() => ({
    type: "image",
    item: {
      data: props.data,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const [hoverSide, setHoverSide] = useState(null);

  const [dropCollect, drop] = useDrop(() => ({
    accept: "image",
    // drop: (item, monitor) => {
    //   setItems([
    //     ...items,
    //     {
    //       id: uuid(),
    //       data: {
    //         ...item.data,
    //         src: `https://source.unsplash.com/random/720x405?t=${uuid()}`,
    //       },
    //     },
    //   ]);
    // },
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Get horizontal middle
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Get pixels to the left
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;

      // if (hoverClientY < hoverMiddleY) {
      //   console.log("hovering top");
      // } else {
      //   console.log("hovering bottom");
      // }

      if (hoverClientX < hoverMiddleX) {
        console.log("hovering left");
        setHoverSide("left");
      } else {
        console.log("hovering right");
        setHoverSide("right");
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  function renderHoverPreview() {
    let style = {
      display: "none",
      position: "absolute",
      top: 0,
      bottom: 0,
      width: "4px",
      background: "red",
    };
    if (dropCollect.isOver && hoverSide) {
      style = {
        ...style,
        display: "block",
        [hoverSide]: "-7px",
      };
    }
    return <div style={style}></div>;
  }

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
      }}
    >
      {props.children}
      {renderHoverPreview()}
    </div>
  );
};

export default DraggableComponent;
