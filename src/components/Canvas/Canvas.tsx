import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import mario from "../../assets/mario-small.png";
import luigi from "../../assets/luigi-small.png";
import background from "../../assets/background.png";

import "./Canvas.scss";

interface IProps {}

export const Canvas: React.FC<IProps> = (props) => {
  const {} = props;

  const [draggable, setDraggable] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;

  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasContainer = canvasContainerRef.current;

  const context = canvas?.getContext("2d");

  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const [globalCoords, setGlobalCoords] = useState({ x: 0, y: 0 });

  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // 👇️ get global mouse coordinates
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

  const handleMouseMove = (event: any) => {
    setCoords({
      x: event.clientX - event.target.offsetLeft,
      y: event.clientY - event.target.offsetTop,
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
    console.log({ x: imagePosition.x, y: imagePosition.y });
  };

  const image = useMemo(() => {
    const img = new Image();
    img.src = mario;
    return img;
  }, []);

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
        100,
        200
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

  return (
    <div
      ref={canvasContainerRef}
      className="Canvas"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}
    >
      {/* {images.map((image, index) => ( */}
      <canvas ref={canvasRef}></canvas>
      <canvas></canvas>
      {/* ))} */}
    </div>
  );
};

export default Canvas;
