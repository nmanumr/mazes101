import * as circular from "./circular.ts";
import * as rectangular from "./rectangular.ts";
import { BoardType } from "../base.ts";
export default {
    [BoardType.Circular]: circular,
    [BoardType.Rectangular]: rectangular
} as Record<BoardType, typeof circular | typeof rectangular>;
