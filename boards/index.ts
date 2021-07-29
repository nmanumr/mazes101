import * as circular from "./circular.ts";
import * as rectangular from "./rectangular.ts";
import * as weave from "./weave.ts";
import { BoardType } from "../base.ts";
export default {
    [BoardType.Circular]: circular,
    [BoardType.Rectangular]: rectangular,
    [BoardType.Weave]: weave
} as Record<BoardType, typeof circular | typeof rectangular | typeof weave>;
