import React from "react";
import { ResizableBox as ReactResizableBox } from "react-resizable";
import Draggable, { DraggableCore } from 'react-draggable';
import "react-resizable/css/styles.css";

const ResizableBox = ({
  children,
  width = 500,
  height = 300,
  resizable = true,
  style = {},
  className,
}) => {
  return (
    <div>
      {resizable ? (
        <ReactResizableBox width={width} height={height}>
          <div
            style={{
              ...style,
              width: "100%",
              height: "100%"
              // top:props.data.X,
              // left:props.data.Y
            }}
            className={className}
          >
            {children}
          </div>
        </ReactResizableBox>
      ) : (
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
            ...style
          }}
          className={className}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default ResizableBox;