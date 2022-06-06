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
import { useCanvas } from "../../utils/useCanvas";

interface IProps {}

export const Canvas: React.FC<IProps> = (props) => {
  const {} = props;

  // const [draggable, setDraggable] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;

  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasContainer = canvasContainerRef.current;

  const luigiRef = useRef<HTMLCanvasElement>(null);
  const luigiCanvas = luigiRef.current;

  const image = useMemo(() => {
    const img = new Image();
    img.src = mario;
    return img;
  }, []);

  const [handleMouseMove, handleMouseDown, handleMouseUp] = useCanvas(
    image,
    canvasContainer,
    canvas
  );

  return (
    <div
      ref={canvasContainerRef}
      className="Canvas"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}
    >
      <canvas ref={canvasRef}></canvas>
      <canvas ref={luigiRef}></canvas>
      {/* ))} */}
    </div>
  );
};

export default Canvas;
