/// A cell is a single unit on maze board.
/// It is represented by a single byte (u8) as following:
///  - 8th bit (MSB) is disabled status of cell i.e., 0 if cell if enabled
///  - 7-1 bits can be used for passage status i.e., 0 if there is a wall
/// so technically this type of board representation can have 7 walls for each cell
#[derive(Debug, Clone, Copy)]
pub struct Cell(pub u8);

impl Cell {
    /// Checks is the 8th bit (MSB) is zero or not
    ///  - `0xxx xxxx` -> true
    ///  - `1xxx xxxx` -> false
    pub fn is_enabled(&self) -> bool {
        return (self.0 & (1 << 7)) == 0;
    }

    /// Sets the 8th bit as 1
    ///  - `0xxx xxxx` -> `1xxx xxxx`
    ///  - `1xxx xxxx` -> `1xxx xxxx`
    pub fn disable(mut self) -> Cell {
        self.0 = self.0 | (1 << 7);
        return self;
    }

    /// Sets the 8th bit as 0
    ///  - `0xxx xxxx` -> `0xxx xxxx`
    ///  - `1xxx xxxx` -> `0xxx xxxx`
    pub fn enable(mut self) -> Cell {
        self.0 = self.0 & 0b0111_1111;
        return self;
    }

    /// mark all the wall status bits (first 7 bits) as 1
    ///  - `0xxx xxxx` -> `0111 1111`
    ///  - `1xxx xxxx` -> `1111 1111`
    pub fn remove_all_walls(mut self) -> Cell {
        self.0 = self.0 | 0b111_1111;
        return self;
    }

    /// mark all the wall status bits (first 7 bits) as 0
    ///  - `0xxx xxxx` -> `0000 0000`
    ///  - `1xxx xxxx` -> `1000 0000`
    pub fn set_all_walls(mut self) -> Cell {
        self.0 = self.0 & 0b1000_0000;
        return self;
    }

    /// checks if there is a wall in given direction regarless of cell enable status
    ///  - cell: `0000 0010`, wall: `0001` -> false
    ///  - cell: `0000 0010`, wall: `0010` -> true
    pub fn has_wall(self, wall: u8) -> bool {
        let safe_wall = wall & 0b111_111;
        return safe_wall == wall && (self.0 & safe_wall) == 0;
    }

    /// removes a wall in given direction regarless of cell enable status
    ///  - cell: `0000 0010`, wall: `0001` -> 0000 0011
    ///  - cell: `0000 0010`, wall: `0010` -> 0000 0010
    pub fn remove_wall(mut self, wall: u8) -> Cell {
        let safe_wall = wall & 0b111_111;
        self.0 = self.0 | safe_wall;
        return self;
    }

    /// sets a wall in given direction regarless of cell enable status
    ///  - cell: `0000 0010`, wall: `0001` -> 0000 0010
    ///  - cell: `0000 0010`, wall: `0010` -> 0000 0000
    pub fn set_wall(mut self, wall: u8) -> Cell{
        let safe_wall = wall & 0b111_111;
        self.0 = self.0 & !safe_wall;
        return self;
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_cell() {
        assert_eq!(Cell(1).0, 1);
    }

    #[test]
    fn test_cell_toggle_enabled() {
        // Cell::is_enabled
        assert_eq!(Cell(0b0111_1111).is_enabled(), true);
        assert_eq!(Cell(0b1111_1111).is_enabled(), false);

        // Cell::disable
        assert_eq!(Cell(0b0111_1111).disable().0, 0b1111_1111);
        assert_eq!(Cell(0b1111_1111).disable().0, 0b1111_1111);

        // Cell::enable
        assert_eq!(Cell(0b0111_1111).enable().0, 0b0111_1111);
        assert_eq!(Cell(0b1111_1111).enable().0, 0b0111_1111);
    }

    #[test]
    fn test_cell_toggle_all_walls() {
        // Cell::remove_all_walls
        assert_eq!(Cell(0b0111_1111).remove_all_walls().0, 0b0111_1111);
        assert_eq!(Cell(0b1111_1111).remove_all_walls().0, 0b1111_1111);

        // Cell::set_all_walls
        assert_eq!(Cell(0b0111_1111).set_all_walls().0, 0b0000_0000);
        assert_eq!(Cell(0b1111_1111).set_all_walls().0, 0b1000_0000);
    }

    #[test]
    fn test_cell_toggle_walls() {
        let left = 0b1000;

        // Cell::has_cell_wall
        assert_eq!(Cell(0b0111_1111).has_wall(0b1000_0000), false);
        assert_eq!(Cell(0b1111_1111).has_wall(0b1000_0000), false);

        // Cell::remove_wall
        println!("{:?}", Cell(0b0000_1000).remove_wall(left));
        assert_eq!(Cell(0b0111_1111).remove_wall(left).has_wall(left), false);
        assert_eq!(Cell(0b1111_1111).remove_wall(left).has_wall(left), false);

        // Cell::set_wall
        assert_eq!(Cell(0b0111_1111).set_wall(left).has_wall(left), true);
        assert_eq!(Cell(0b1111_1111).set_wall(left).has_wall(left), true);
    }
}
