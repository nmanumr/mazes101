class BaseBoard:

    def __init__(self, size, board_type):
        self.cells = [0]*size
        self.board_type = board_type

    def isEnabled(self, cell):
        return (cell & 1 << 7) == 0

    def disable_cell(self, index):
        self.cells[index] = self.cells[index] | (1 << 7)

    def disable_cells(self, indexes):
        for index in indexes:
            self.disable_cell(index)

    def remove_all_walls(self, cell):
        return not(self.isEnabled(cell)) if cell else cell | 0b0111_1111

    def set_all_walls(self, cell):
        return not(self.isEnabled(cell)) if cell else cell | 0b0000_0000

    def has_cell_wall(self, cell, wall):
        return not(self.isEnabled(cell)) or (cell & 1 << wall) == 0

    def setWall(self, cell, wall):
        return not(self.isEnabled(cell)) if cell else cell | (1 << wall)

    def removeWall(self, cell, wall):
        return not(self.isEnabled(cell)) if cell else cell & -(1 << wall)

#     def hasInterWall(index1, index2, board, relativeDirectionFn: (index1: number, index2: number, board: Board) = > Dir, opposingWallFn: (dir: Dir) = > Dir):


# cell1Dir = relativeDirectionFn(index1, index2, board)
#  cell2Dir = opposingWallFn(cell1Dir)

#   return hasCellWall(board.cells[index1], cell1Dir) & & hasCellWall(board.cells[index2], cell2Dir)
