import { useAtom } from "jotai";
import { splitAtom } from "jotai/utils";
import { uniqueId } from "lodash";
import { atomWithLocalStorage } from "./persistence";

export type LayerDescription = {
  id: string;
  color: string;
  flip: boolean; // whether to flip the image radially
  direction: 1 | -1; // clockwise or counterclockwise
  repetitions: number; // how many times to repeat the line
  speed: number; // speed in radians per second
  line: [number, number, number, number];
};

export function makeLayer(): LayerDescription {
  return {
    id: uniqueId("layer_"),
    color: "#ff0000",
    direction: 1,
    flip: false,

    repetitions: 4,
    speed: 0.5,
    line: [0, 0, 1, 1],
  };
}

export const prettyDefaultState: LayerDescription[] = [
  {
    id: "1",
    color: "#ffffff",
    direction: 1,
    flip: false,
    repetitions: 16,
    speed: 0.5,
    line: [0, 1.25, 1, -0.25],
  },
  {
    id: "2",
    color: "#ffffff",
    direction: -1,
    flip: true,
    repetitions: 16,
    speed: 0.5,
    line: [0, 1.25, 1, -0.25],
  },
];

export const layersAtom = atomWithLocalStorage<LayerDescription[]>(
  "layers",
  prettyDefaultState
);

export const useLayers = () => useAtom<LayerDescription[]>(layersAtom);

export const splitLayersAtom = splitAtom(layersAtom);
