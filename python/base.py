class Cell:

    def __init__(self, val=0b0000_0000):
        self.val = val

    @property
    def is_enabled(self):
        return (self.val & (1 << 7)) == 0

    def enable(self):
        self.val = self.val & (0 << 7)

    def disable(self):
        self.val = self.val | (1 << 7)

    def remove_all_walls(self):
        if not(self.is_enabled):
            self.val = self.val | 0b0111_1111

    def set_all_walls(self):
        if not(self.is_enabled):
            self.val = self.val | 0b0000_0000

    def has_cell_wall(self, wall):
        return not(self.isEnabled(self.val)) or (self.val & 1 << wall) == 0

    def set_wall(self, wall):
        return self.val if not(self.isEnabled(self.val)) else self.val | (1 << wall)

    def remove_wall(self, wall):
        return self.val if not(self.isEnabled(self.val)) else self.val & ~(1 << wall)


class BaseBoard:

    def __init__(self, size, board_type):
        self.cells = [Cell() for _ in range(size)]
        self.board_type = board_type
        self.size = size

    def disable_cells(self, indexes):
        for index in indexes:
            self.cells[index].disable()

    def relative_direction_fn(self, index1, index2):
        raise NotImplementedError("Subclasses should implement this!")

    def opposing_wall_fn(self, dir):
        raise NotImplementedError("Subclasses should implement this!")

    def cell_value_fn(self, cell, dir):
        raise NotImplementedError("Subclasses should implement this!")

    def has_inter_wall(self, index1, index2):
        cell1_dir = self.relative_direction_fn(index1, index2)
        cell2_dir = self.opposing_wall_fn(cell1_dir)
        return self.cells[index1].has_cell_wall(cell1_dir) and self.cells[index2].has_cell_wall(cell2_dir)

    def set_inter_wall_value(self, index1, index2):
        cell1_dir = self.relative_direction_fn(index1, index2)
        cell2_dir = self.opposing_wall_fn(cell1_dir)

        if self.cells[index1].is_enabled:
            self.cell_value_fn(self.cells[index1], cell1_dir)
        if self.cells[index2].is_enabled:
            self.cell_value_fn(self.cells[index2], cell2_dir)
