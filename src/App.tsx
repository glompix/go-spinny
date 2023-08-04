import "./App.css";
import { useEffect, useRef, useState, RefObject } from "react";
import { LayerEditor } from "./LayerEditor";
import { Preview } from "./Preview";
import { layersAtom, splitLayersAtom } from "./state";
import { useAtom } from "jotai";
import { Menu } from "./Menu";

export default function App() {
  const [layers] = useAtom(layersAtom);
  const [layersAtoms] = useAtom(splitLayersAtom);
  const previewElementRef = useRef(null);
  const { width, height } = useResizeObserver(previewElementRef);

  return (
    <div className="app-grid">
      <header>
        <h1>Lines Go Spinny :3</h1>
        <Menu />
      </header>
      <section className="preview" ref={previewElementRef}>
        <Preview layers={layers} width={width} height={height} />
      </section>
      <section className="sidebar">
        {layersAtoms.length === 0 ? <>No layers</> : ""}
        {layersAtoms.map((layerAtom, index) => (
          <LayerEditor key={index} layerAtom={layerAtom} rank={index + 1} />
        ))}
      </section>
    </div>
  );
}
interface Dimensions {
  width: number;
  height: number;
}

function useResizeObserver(targetRef: RefObject<HTMLElement>): Dimensions {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  const observer = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const target = targetRef.current;

    if (!target) return;

    const resizeCallback: ResizeObserverCallback = (entries) => {
      const entry = entries[0];
      if (entry) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    };

    observer.current = new ResizeObserver(resizeCallback);
    observer.current.observe(target);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
        observer.current = null;
      }
    };
  }, [targetRef]);

  return dimensions;
}
