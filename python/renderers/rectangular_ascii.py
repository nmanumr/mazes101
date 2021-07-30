from ..boards.rectangular import Direction
import numpy as np

# ┌───────────────────────────────────┐ 
# │ ───── │   │ ─── │ ─── ─── │ │   │ │
# │ │   │ │─│ │── │ │─│ ──│──── │ │ │ │
# │ │ │ │─────────│── │────── │───│─│ │
# │ │─│   │ ─────── │────── │   │ ────┤
# │ ─── │ │──── │ │────── │ │─│ │──── │
# ├───│─│──── │ │   ─── │ │──────── │ │
# │   ────────│ │ │── │ │────── │ │ │ │
# │ │ │ ────────│ │ ──│──── │ │ │ ──│ │
# │─│ │── │   │ ──│── │ ────│ │ │─│ ──│
# │   ────│ │ │──── │ │── │   │── │── │
# │ │───────│───────│───│───│───│─────│

class Symbols:
    top = '─'
    bottom = '─'
    left = '│'
    top = '│'

class Renderer:

    def __init__(self,board,cells,width):
        self.cells = board.cells
        self.width = width
        self.walls_by_row = []
        self.rows = board.get_rows()

    
    def detect_walls(self):
        for row in self.rows:
            walls_row = []
            top_lst = []
            right_lst = []
            left_lst = []
            bottom_lst = []
            for cell in row:
                top_lst.append(cell.has_cell_wall(Direction.TOP))
                right_lst.append(cell.has_cell_wall(Direction.RIGHT))
                left_lst.append(cell.has_cell_wall(Direction.BOTTOM))
                bottom_lst.append(cell.has_cell_wall(Direction.LEFT))
            self.walls_lst.append([top_lst,right_lst,left_lst,bottom_lst])

    def draw(self):
        for row_walls in self.walls_by_row:
            row_walls_arr = np.array(row_walls)
