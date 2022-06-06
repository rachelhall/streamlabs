import React, { useMemo, useRef } from "react";

import mario from "../../assets/mario-small.png";

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
    </div>
  );
};

export default Canvas;
