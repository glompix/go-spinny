import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LayerDescription } from "./state";
import { range } from "lodash";

export function Preview({
  layers,
  width,
  height,
}: {
  layers: LayerDescription[];
  width: number;
  height: number;
}) {
  const radius = useMemo(() => Math.min(width, height) / 3, [width, height]);
  return (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      {layers.map((l) => (
        <Layer key={l.id} layer={l} width={width} height={height} radius={radius} />
      ))}
    </svg>
  );
}

function Layer({
  layer,
  width,
  height,
  radius,
}: {
  layer: LayerDescription;
  width: number;
  height: number;
  radius: number;
}) {
  const [dt, setDt] = useState(0);
  useAnimationFrame((dt: number) => {
    setDt(dt / 16);
  });
  const { color, direction, flip, line, repetitions, speed } = layer;
  const degPerRepetition = 360 / repetitions;
  const baseAngle = (direction * speed * dt) % 360;
  const p1x = (flip ? line[2] : line[0]) * radius
  const p1y = (flip ? line[3] : line[1]) * radius
  const p2x = (flip ? line[0] : line[2]) * radius
  const p2y = (flip ? line[1] : line[3]) * radius
  return range(repetitions).map((i) => (
    <path
    key={i}
      style={{
        transform: `rotate(${baseAngle + i * degPerRepetition}deg)`,
        transformOrigin: "50% 50%",
      }}
      d={`M ${width / 2} ${height / 2} c ${p1x} ${p1y}, ${p2x} ${p2y}, ${radius} ${radius}`}
      strokeWidth="5"
      stroke={color}
      fill="transparent"
    />
  ));
}

function useAnimationFrame(callback) {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const animate = useCallback(
    (time: number) => {
      if (previousTimeRef.current != undefined) {
        const deltaTime = time;
        callback(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [callback]
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]); // Make sure the effect runs only once
}
