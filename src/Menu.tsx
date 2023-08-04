import { makeLayer, prettyDefaultState } from "./state";
import { useAtom } from "jotai";
import { layersAtom } from "./state";

export function Menu() {
  const [layers, setLayers] = useAtom(layersAtom);
  return (
    <nav>
      <button
        onClick={() => {
          setLayers((layers) => [...layers, makeLayer()]);
        }}
      >
        + Add Layer
      </button>
      <button
        onClick={() => {
          (async () => {
            await navigator.clipboard.writeText(JSON.stringify(layers));
            alert("Copied to clipboard!");
          })();
        }}
      >
        Copy
      </button>
      <button
        onClick={() => {
          (async () => {
            let pastedValue = "hmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm";
            try {
              pastedValue = await navigator.clipboard.readText();
              const parsedValue = JSON.parse(pastedValue);
              if (!Array.isArray(parsedValue)) {
                throw new Error("Not an array");
              }
              setLayers(() => parsedValue);
              alert("Pasted from clipboard!");
            } catch (e) {
              alert("Failed to paste. Probaby garbage in your clipboard.");
              console.error(pastedValue);
            }
          })();
        }}
      >
        Paste
      </button>
      <button
        onClick={() => {
          setLayers(() => prettyDefaultState);
        }}
      >
        Reset
      </button>
    </nav>
  );
}
