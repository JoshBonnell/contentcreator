import "../css/App.css";
import React from "react";
import { useEffect, useState, forwardRef, useMemo } from "react";
import CustomGrid from "./CustomGrid";
import TransformScale from "./TransformScale";
import { useDrag, useDrop } from "react-dnd";
import DraggableComponent from "./DraggableComponent";
import uuid from "react-uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PageBuilder = () => {
  const data = {
    content: {
      body: [
        {
          _uid: uuid(),
          component: "columnlayout",
          props: {
            cols: 3,
            items: [
              {
                _uid: uuid(),
                component: "image",
                position: 1,
                props: {
                  src: `https://source.unsplash.com/random/150x150?t=${uuid()}`,
                  alt: "some alt text",
                },
              },
            ],
          },
        },
        {
          _uid: uuid(),
          component: "image",
          props: {
            src: `https://source.unsplash.com/random/150x150?t=${uuid()}`,
            alt: "more text",
            horizontalAlignment: "center",
            verticalAlignment: "center",
          },
        },
        {
          _uid: uuid(),
          component: "image",
          props: {
            src: `https://source.unsplash.com/random/150x150?t=${uuid()}`,
            alt: "more text",
            horizontalAlignment: "end",
            verticalAlignment: "end",
          },
        },
        // {
        //   _uid: uuid(),
        //   component: "image",
        //   props: {
        //     src: `https://source.unsplash.com/random/720x405?t=${uuid()}`,
        //     alt: "some alt text",
        //   },
        // },
        // {
        //   _uid: uuid(),
        //   component: "flipcard",
        //   props: {
        //     front: {
        //       _uid: uuid(),
        //       component: "image",
        //       props: {
        //         src: `https://source.unsplash.com/random/300x300?t=${uuid()}`,
        //         alt: "some alt text",
        //       },
        //     },
        //     back: {
        //       _uid: uuid(),
        //       component: "image",
        //       props: {
        //         src: `https://source.unsplash.com/random/300x300?t=${uuid()}`,
        //         alt: "some alt text",
        //       },
        //     },
        //   },
        // },
        // {
        //   _uid: uuid(),
        //   component: "flipcard",
        //   props: {
        //     frontImgSrc: `https://source.unsplash.com/random/300x300?t=${uuid()}`,
        //     topText: "haha",
        //     middleText: "what?",
        //     bottomText: "This is a bit longer",
        //     frontImgAltText: "Some alt text",
        //   },
        // },
        // {
        //   _uid: uuid(),
        //   component: "flipcard",
        //   props: {
        //     frontImgSrc: `https://source.unsplash.com/random/300x300?t=${uuid()}`,
        //     topText: "haha",
        //     middleText: "what?",
        //     bottomText: "This is a bit longer",
        //     frontImgAltText: "Some alt text",
        //   },
        // },
        // {
        //   _uid: uuid(),
        //   component: "nonexistent_component",
        //   title: "Bar",
        // },
      ],
    },
  };

  const [items, setItems] = useState(data.content.body);

  const [scale, setScale] = useState(1);

  const onScaleChange = (scale) => {
    setScale(scale / 100);
  };

  return (
    <div className="pb-root">
      <div className="pb-topbar">
        <TransformScale onScaleChange={onScaleChange} />
      </div>
      <div className="pb-main">
        <CustomGrid items={items} scale={scale} />
      </div>
      <div
        className="pb-context-menu"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <DraggableComponent
          data={{
            type: "image",
            src: `https://source.unsplash.com/random/720x405?t=${uuid()}`,
          }}
        >
          <button className="pb-option">
            <FontAwesomeIcon icon="image" /> IMAGE
          </button>
        </DraggableComponent>
      </div>
    </div>
  );
};

export default PageBuilder;
