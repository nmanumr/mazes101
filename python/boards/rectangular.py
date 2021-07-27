from ..base import BaseBoard

class Direction:
    TOP = 0b0001
    RIGHT = 0b0010
    BOTTOM = 0b0100
    LEFT = 0b1000

# class Position:
#     def __int__(self,x,y):
#         self.x = x
#         self.y = y
    
#     @classmethod
#     def from_index(cls,index):
        

class RectangularBoard(BaseBoard):

    def __init__(self,width,height):
        self.width = width
        self.height = height
        
        super().__init__(self.width*self.height,"rectangular")

    def to_index(self,x,y):
        return y*self.width+x
    
    def to_position(self,index):
        return index%self.width,index//self.width
    
    def get_cell_by_position(self,x,y):
        return self.cells[self.to_index(x,y)]

    def set_cell_by_position(self,x,y,value):
        self.cells[self.to_index(x,y)] = value
    
    def get_opposing_direction(self,direction):
        return ((direction << 2) | (direction >> 2)) & 0b1111

    def get_relative_direction(self,index1,index2):
        pos1x,pos1y = self.to_position(index1)
        pos2x,pos2y = self.to_position(index2)

        if (pos1y > pos2y):
            return Direction.TOP
        if (pos1x < pos2x):
            return Direction.RIGHT
        if (pos1y < pos2y):
            return Direction.BOTTOM
        if (pos1x > pos2x):
            return Direction.LEFT

        raise Exception(f"({pos1x}, {pos1y}) and ({pos2x}, {pos2y})  are not neighbours")

    def get_relative_position(self,x,y,direction):
        if (direction == Direction.TOP):
            y-=1
        if (direction == Direction.RIGHT):
            x+=1
        if (direction == Direction.BOTTOM):
            y+=1
        if (direction == Direction.LEFT):
            x-=1
        return x,y
    
    def get_neighbours(self,index):

        neighbours_cells = []
        # TOP
        if (index >= self.width):
            neighbours_cells.append(self.cells[index - self.width])
        # RIGHT
        if ((index + 1) % self.width != 0):
            neighbours_cells.append(self.cells[index + 1])
        # BOTTOM
        if (index < len(self.cells) - self.width):
            neighbours_cells.append(self.cells[index + self.width])
        # LEFT
        if (index % self.width != 0):
            neighbours_cells.append(self.cells[index - 1])

        neighbours_cells = [cell for cell in neighbours_cells if cell.is_enabled]

        return neighbours_cells
    
    def is_next_cell_enabled(self,x,y,dir_to_move,visitable_only):
        new_posx,new_posy = self.get_relative_position(x,y,dir_to_move)
        index1 = self.to_index(new_posx,new_posy)
        index2 = self.to_index(x,y)
        if visitable_only and self.has_inter_wall(index1, index2):
            return False
        return self.cells[index1].is_enabled

    def get_allowed_directions(self,x,y,visitable_only=True):
        directions = []

        if (y > 0):
            directions.append(Direction.TOP)
        if (x < self.width - 1):
            directions.append(Direction.RIGHT)
        if (y < self.height - 1):
            directions.append(Direction.BOTTOM)
        if (x > 0):
            directions.append(Direction.LEFT)

        directions = [dir for dir in directions if self.is_next_cell_enabled(x,y,dir,visitable_only)]
        
        return directions
    
    def get_rows(self):

        rows = []
        for i in range(0, len(self.cells), self.width):
            row = [cell for cell in self.cells[i:i + self.width] if cell.is_enabled]
            if row:
                rows.append(row)

        return rows

    def remove_inter_wall(self,index1,index2):
        self.set_inter_wall_value()