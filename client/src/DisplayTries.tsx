import { useEffect, useMemo, useRef } from "react";

interface DisplayTriesProps {
  pressedKeys: string[];
}

export const DisplayTries = ({ pressedKeys }: DisplayTriesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const tries = useMemo(() => {
    return pressedKeys.length;
  }, [pressedKeys]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // set line color
    ctx.strokeStyle = "#fff";

    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(50, 200);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(150, 50);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(50, 200);
    ctx.lineTo(100, 200);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(150, 50);
    ctx.lineTo(150, 100);
    ctx.stroke();

    if (tries >= 1) {
      ctx.beginPath();
      ctx.arc(150, 120, 20, 0, 2 * Math.PI);
      ctx.stroke();
    }

    if (tries >= 2) {
      ctx.beginPath();
      ctx.moveTo(150, 140);
      ctx.lineTo(150, 180);
      ctx.stroke();
    }

    if (tries >= 3) {
      ctx.beginPath();
      ctx.moveTo(150, 150);
      ctx.lineTo(130, 170);
      ctx.stroke();
    }

    if (tries >= 4) {
      ctx.beginPath();
      ctx.moveTo(150, 150);
      ctx.lineTo(170, 170);
      ctx.stroke();
    }

    if (tries >= 5) {
      ctx.beginPath();
      ctx.moveTo(150, 180);
      ctx.lineTo(130, 200);
      ctx.stroke();
    }

    if (tries >= 6) {
      ctx.beginPath();

      ctx.moveTo(150, 180);
      ctx.lineTo(170, 200);
      ctx.stroke();
    }
  }, [tries]);

  return (
    <div className="display-tries">
      <canvas ref={canvasRef} width="500" height="500"></canvas>
    </div>
  );
};
