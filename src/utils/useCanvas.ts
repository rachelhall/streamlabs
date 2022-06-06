import { useEffect, useRef, useState } from "react";

import img1 from "../assets/cat.png";

const SCALE = 0.1;
const OFFSET = 80;
export const canvasWidth = window.innerWidth * 0.5;
export const canvasHeight = window.innerHeight * 0.5;

export interface ICoordinate {
  x: number;
  y: number;
}

export function draw(context: CanvasRenderingContext2D) {
  // context.fillStyle = "red";
  // context.shadowColor = "blue";
  // context.shadowBlur = 15;
  // context.save();
  // context.scale(SCALE, SCALE);
  // context.translate(location.x / SCALE - OFFSET, location.y / SCALE - OFFSET);
  // context.rotate((225 * Math.PI) / 180);
  const image = new Image();
  image.src = img1;
  image.onload = () => {
    context?.drawImage(image, 220, 0);
  };
  // .restore(): Canvas 2D API restores the most recently saved canvas state
  context.restore();
}

export const useCanvas = (image: string) => {
  const [coordinates, setCoordinates] = useState<ICoordinate[]>([]);
  const canvasImageRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasImageRef.current;
    const context = canvas?.getContext("2d");

    context?.clearRect(0, 0, canvasWidth, canvasHeight);
    if (context) {
      draw(context);
    }
  }, [coordinates, image]);

  return [
    coordinates,
    setCoordinates,
    canvasImageRef,
    canvasWidth,
    canvasHeight,
  ] as const;
};
