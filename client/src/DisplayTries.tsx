import { useEffect, useRef } from "react";

interface DisplayTriesProps {
  numberOfBadGuesses: number;
}

export const DisplayTries = ({ numberOfBadGuesses }: DisplayTriesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

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

    if (numberOfBadGuesses >= 1) {
      ctx.beginPath();
      ctx.arc(150, 120, 20, 0, 2 * Math.PI);
      ctx.stroke();
    }

    if (numberOfBadGuesses >= 2) {
      ctx.beginPath();
      ctx.moveTo(150, 140);
      ctx.lineTo(150, 180);
      ctx.stroke();
    }

    if (numberOfBadGuesses >= 3) {
      ctx.beginPath();
      ctx.moveTo(150, 150);
      ctx.lineTo(130, 170);
      ctx.stroke();
    }

    if (numberOfBadGuesses >= 4) {
      ctx.beginPath();
      ctx.moveTo(150, 150);
      ctx.lineTo(170, 170);
      ctx.stroke();
    }

    if (numberOfBadGuesses >= 5) {
      ctx.beginPath();
      ctx.moveTo(150, 180);
      ctx.lineTo(130, 200);
      ctx.stroke();
    }

    if (numberOfBadGuesses >= 6) {
      ctx.beginPath();
      ctx.moveTo(150, 180);
      ctx.lineTo(170, 200);
      ctx.stroke();
    }
  }, [numberOfBadGuesses]);

  return (
    <div className="display-tries">
      <canvas ref={canvasRef} width="200" height="250"></canvas>
    </div>
  );
};
