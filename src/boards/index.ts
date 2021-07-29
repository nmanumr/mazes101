import * as circular from './circular';
import * as rectangular from './rectangular';
import * as weave from './weave';
import {BoardType} from "../base";

export default {
  [BoardType.Circular]: circular,
  [BoardType.Rectangular]: rectangular,
  [BoardType.Weave]: weave
} as Record<BoardType, typeof circular | typeof rectangular | typeof weave>;
