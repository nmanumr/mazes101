use crate::boards::base::BaseBoard;
use crate::{boards::base::BaseDirection, cell::Cell};

#[derive(Copy, Clone)]
pub enum Direction {
    TOP    = 0b0001,
    RIGHT  = 0b0010,
    BOTTOM = 0b0100,
    LEFT   = 0b1000,
}

impl BaseDirection for Direction {
    /// get opposing direction of given wall direction
    /// get_oppositing_wall(Direction.LEFT) -> Direction.RIGHT
    fn get_opposing_dir(&self) -> Self {
        match *self {
            Direction::TOP => Direction::BOTTOM,
            Direction::BOTTOM => Direction::TOP,
            Direction::LEFT => Direction::RIGHT,
            Direction::RIGHT => Direction::LEFT,
        }
    }

    fn get_val(&self) -> u8 {
        return *self as u8;
    }
}

#[derive(Debug)]
pub struct Position {
    x: usize,
    y: usize,
}

pub struct Size {
    width: usize,
    height: usize,
}

pub struct RectangularBoard {
    size: Size,
    cells: Vec<Cell>,
}

impl RectangularBoard {
    // -------------------------
    // Position Functions
    // -------------------------

    /// Linear index from position
    fn to_position(&self, index: usize) -> Position {
        return Position {
            x: index % self.size.width,
            y: (index as f32 / self.size.width as f32).floor() as usize,
        }
    }

    /// Position from linear index
    fn to_index(&self, pos: Position) -> usize {
        return pos.y * self.size.width + pos.x;
    }
}

impl BaseBoard<Direction> for RectangularBoard {
    fn get_nth_cell(&self, index: usize) -> Cell {
        return self.cells[index];
    }

    fn set_nth_cell(&mut self, index: usize, val: u8) {
        self.cells[index].0 = val;
    }

    fn get_relative_direciton(&self, cell_index_1: usize, cell_index_2: usize) -> Direction {
        let pos1 = self.to_position(cell_index_1);
        let pos2 = self.to_position(cell_index_2);

        if pos1.y > pos2.y { return Direction::TOP; }
        if pos1.x < pos2.x { return Direction::RIGHT; }
        if pos1.y < pos2.y { return Direction::BOTTOM; }
        if pos1.x > pos2.x { return Direction::LEFT; }

        panic!("'{:?}' and '{:?}' are not neighbours", pos1, pos2);
    }

    /// return array of rows of cells
    fn get_rows(&self) -> Vec<Vec<Cell>> {
        let mut i= 0;
        let mut rows: Vec<Vec<Cell>> = vec![];

        for _ in 1..self.size.height {
            let mut row: Vec<Cell> = vec![];

            for _1 in 1..self.size.width {
                let cell = self.get_nth_cell(i);
                if cell.is_enabled() { row.extend_from_slice(&[self.get_nth_cell(i)]) }
                i += 1;
            }

            if row.len() > 0 { rows.extend_from_slice(&[row]) }
        }

        return rows;
    }

    /// Get neighbour cells of the given position
    fn get_neighbours(&self, index: usize) -> Vec<Cell> {
        let mut neighbours: Vec<Cell> = vec![];

        // TOP
        if index >= self.size.width {
            let cell = self.get_nth_cell(index - self.size.width);
            if cell.is_enabled() { neighbours.extend_from_slice(&[cell]); }
        }
        // RIGHT
        if (index + 1) % self.size.width != 0 {
            let cell = self.get_nth_cell(index + 1);
            if cell.is_enabled() { neighbours.extend_from_slice(&[cell]); }
        }
        // BOTTOM
        if index < self.cells.len() - self.size.width {
            let cell = self.get_nth_cell(index + self.size.width);
            if cell.is_enabled() { neighbours.extend_from_slice(&[cell]); }
        }
        // LEFT
        if index % self.size.width != 0 {
            let cell = self.get_nth_cell(index - 1);
            if cell.is_enabled() { neighbours.extend_from_slice(&[cell]); }
        }

        return neighbours;
    }
}


#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_direction() {
        assert_eq!(Cell(1).0, 1);
    }
}

