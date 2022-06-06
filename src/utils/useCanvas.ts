import { useCallback, useEffect, useState } from "react";

export const useCanvas = (
  image: HTMLImageElement,
  canvasContainer: HTMLDivElement | null,
  canvas: HTMLCanvasElement | null
) => {
  const context = canvas?.getContext("2d");

  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const [globalCoords, setGlobalCoords] = useState({ x: 0, y: 0 });

  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  const [draggable, setDraggable] = useState(false);

  useEffect(() => {
    const handleWindowMouseMove = (event: MouseEvent) => {
      setGlobalCoords({
        x: event.screenX,
        y: event.screenY,
      });
    };
    window.addEventListener("mousemove", handleWindowMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
    };
  }, []);

  useEffect(() => console.log({ draggable }), [draggable]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    setCoords({
      x: event.clientX - target.offsetLeft,
      y: event.clientY - target.offsetTop,
    });

    if (draggable) {
      imagePosition.x = coords.x;
      imagePosition.y = coords.y;
    }
  };

  const handleMouseDown = () => {
    if (
      coords.x <= imagePosition.x + image.width / 2 &&
      coords.x >= imagePosition.x - image.width / 2 &&
      coords.y >= imagePosition.y - image.height / 2 &&
      coords.y <= imagePosition.y + image.height / 2
    ) {
      setDraggable(true);
    }
  };

  const handleMouseUp = () => {
    setDraggable(false);
  };

  const setInitialPosition = useCallback(() => {
    if (canvas) {
      setImagePosition({ x: canvas?.width / 2, y: canvas?.height / 2 });
    }
  }, [canvas]);

  useEffect(() => setInitialPosition(), [setInitialPosition]);

  if (canvas && context) {
    image.onload = () => {
      if (canvas && image) {
        resizeCanvasToDisplaySize();
        context.clearRect(0, 0, canvas.width, canvas.height);

        context?.drawImage(
          image,
          imagePosition.x - image.width / 2,
          imagePosition.y - image.height / 2,
          100,
          200
        );
      }
    };
  }

  useEffect(() => {
    if (context && canvas) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context?.drawImage(
        image,
        imagePosition.x - image.width / 2,
        imagePosition.y - image.height / 2,
        50,
        100
      );
    }
  }, [imagePosition.x, imagePosition.y]);

  const resizeCanvasToDisplaySize = useCallback(() => {
    if (canvas && canvasContainer) {
      const { width, height } = canvasContainer.getBoundingClientRect();
      console.log({ width, height });
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
      }
    }

    return false;
  }, [canvas, canvasContainer]);

  return [handleMouseMove, handleMouseDown, handleMouseUp] as const;
};
