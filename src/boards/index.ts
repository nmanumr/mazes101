import * as circular from './circular';
import * as rectangular from './rectangular';
import {BoardType} from "../base";

export default {
  [BoardType.Circular]: circular,
  [BoardType.Rectangular]: rectangular
} as Record<BoardType, typeof circular | typeof rectangular>;
