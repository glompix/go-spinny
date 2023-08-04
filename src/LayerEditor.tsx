import {} from "@react-three/fiber";
import { BezierCurveEditor } from "react-bezier-curve-editor";
import { LayerDescription, layersAtom } from "./state";
import { WritableAtom, useAtom } from "jotai";

export function LayerEditor({
  layerAtom,
  rank,
}: {
  layerAtom: WritableAtom<LayerDescription, [LayerDescription], void>;
  rank: number;
}) {
  const [layerList, setLayerList] = useAtom(layersAtom);
  const [layer, setLayer] = useAtom(layerAtom);
  return (
    <div className="layer-editor">
      <div className="title-row">
        <h4>Layer {rank}</h4>
        <div className="controls">
          <button
            title="Duplicate this layer"
            onClick={() => setLayerList([...layerList, { ...layer }])}
          >
            c
          </button>
          <button
            className="delete"
            title="Delete this layer"
            onClick={() =>
              setLayerList(layerList.filter((l) => l.id !== layer.id))
            }
          >
            &mdash;
          </button>
        </div>
      </div>
      <label>
        Color
        <input
          type="color"
          value={layer.color}
          onChange={(e) => setLayer({ ...layer, color: e.target.value })}
        />
      </label>
      <label>
        Repetions
        <input
          type="range"
          min="1"
          max="16"
          step="1"
          value={layer.repetitions}
          onChange={(e) =>
            setLayer({
              ...layer,
              repetitions: parseInt(e.target.value),
            })
          }
        />
      </label>
      <label>
        Speed
        <input
          type="range"
          min="0.01"
          max="1"
          step="0.01"
          value={layer.speed}
          onChange={(e) =>
            setLayer({
              ...layer,
              speed: parseFloat(e.target.value),
            })
          }
        />
      </label>

      <div className="radio-container">
        Direction
        <label>
          <input
            type="radio"
            radioGroup="direction"
            checked={layer.direction === 1}
            onChange={() => setLayer({ ...layer, direction: 1 })}
          />
          clockwise
        </label>
        <label>
          <input
            type="radio"
            radioGroup="direction"
            checked={layer.direction === -1}
            onChange={() => setLayer({ ...layer, direction: -1 })}
          />
          counter-clockwise
        </label>
      </div>

      <label>
        Flip
        <input
          type="checkbox"
          checked={layer.flip}
          onChange={() => setLayer({ ...layer, flip: !layer.flip })}
        />
      </label>
      <BezierCurveEditor
        value={layer.line}
        onChange={(line) => {
          setLayer({ ...layer, line });
        }}
      />
    </div>
  );
}
