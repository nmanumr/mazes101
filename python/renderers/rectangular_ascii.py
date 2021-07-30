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
 
class Renderer:
    symbols = {
        'top','─'
        'right','│'
        'bottom','─'
        'left','│'
    }
    def __init__(self,board,cells,width):
        self.cells = board.cells
        self.width = width
        self.walls_by_row = []
        self.rows = board.get_rows()

    
    def detect_walls(self):
        for row in self.rows:
            walls_row = []
            for cell in row:
                cell_walls = []
                cell_walls.append(cell.has_cell_wall(Direction.TOP))
                cell_walls.append(cell.has_cell_wall(Direction.RIGHT))
                cell_walls.append(cell.has_cell_wall(Direction.BOTTOM))
                cell_walls.append(cell.has_cell_wall(Direction.LEFT))
                walls_row.append(cell_walls)
            self.walls_lst.append(walls_row)

    def print_symbol(self,dir_str,is_wall):
        if is_wall:
            print(self.symbols[dir_str],end='')
        else:
            print(' ',end='')

    def draw(self):
        for y,row_walls in enumerate(self.walls_by_row):
            for x,walls in enumerate(row_walls):
                self.print_symbol('top',walls[0])
                self.print_symbol('left',walls[3])
                if x == 7:
                    self.print_symbol('right',walls[1])
                if y == 7:
                    self.print_symbol('bottom',walls[2])
            print()