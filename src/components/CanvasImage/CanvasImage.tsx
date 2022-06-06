import React, { useCallback, useEffect, useRef, useState } from "react";

import "./CanvasImage.scss";
import img1 from "../../assets/cat.png";
import { useCanvas } from "../../utils/useCanvas";

interface IProps {
  src?: string;
  location?: ICoordinate;
  totalNumberOfImages: number;
  index: number;
}

export interface ICoordinate {
  x: number;
  y: number;
}

export const CanvasImage: React.FC<IProps> = (props) => {
  const { src = img1, index } = props;
  const canvasImageRef = useRef<HTMLCanvasElement>(null);
  const [canvasHeight, setCanvasHeight] = useState(500);
  const [canvasWidth, setCanvasWidth] = useState(500);

  const createImage = useCallback(() => {
    const canvas = canvasImageRef.current;

    let draggable = false;

    if (canvas) {
      let currentX = canvas?.width / 2;
      let currentY = canvas?.height / 2;
      const context = canvas.getContext("2d");
      const image = new Image();

      // setCanvasHeight(image.naturalHeight);
      // setCanvasWidth(image.naturalWidth);

      if (context) {
        context.canvas.width = canvasWidth;
        context.canvas.height = canvasHeight;
      }
      image.src = src;

      image.onload = () => {
        context?.drawImage(
          image,
          currentX - image.width / 2,
          currentY - image.height / 2
        );
      };

      canvas.onmousedown = (e) => {
        if (
          e.screenX <= currentX + image.width / 2 &&
          e.screenX >= currentX - image.width / 2
        ) {
          draggable = true;
          console.log("clicked image");
        }
        draggable = false;
      };

      canvas.onmousemove = (e) => {
        if (draggable) {
          currentX = e.screenX;
          currentY = e.screenY;
        }
      };
      canvas.onmouseup = (e) => {
        if (
          e.screenY <= currentY + image.height / 2 &&
          e.screenY >= currentY - image.height / 2
        ) {
          draggable = true;
          console.log("clicked image");
        }
        draggable = false;
      };
      context?.save();
    }
  }, [canvasHeight, canvasWidth, src]);

  useEffect(() => {
    createImage();
  }, [createImage]);

  // useEffect(() => {
  //   createImage();
  // });

  return (
    <canvas className="CanvasImage" id="canvas" ref={canvasImageRef}>
      ⚠️ Canvas is not supported in this browser.
    </canvas>
  );
};

export default CanvasImage;
