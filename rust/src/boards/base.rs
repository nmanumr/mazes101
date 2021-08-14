use crate::cell::Cell;

pub trait BaseDirection {
    /// get opposing direction of given wall direction
    /// get_oppositing_wall(Direction.LEFT) -> Direction.RIGHT
    fn get_opposing_dir(&self) -> Self;

    fn get_val(&self) -> u8;
}


pub trait BaseBoard<Dir: BaseDirection> {
    /// get nth cell of board
    fn get_nth_cell(&self, index: usize) -> Cell;

    /// set value of nth cell of board
    fn set_nth_cell(&mut self, index: usize, val: u8);

    /// disbale the cells of given indexes
    fn disable_cells(&mut self, indexes: &[usize]) {
        for index in indexes {
            self.get_nth_cell(*index).disable();
        }
    }

    /// get relative directive between 2 cell indexes
    fn get_relative_direciton(&self, cell_index_1: usize, cell_index_2: usize) -> Dir;

    /// is there any wall between the given cells indexes
    fn has_inter_wall(&self, cell_index_1: usize, cell_index_2: usize) -> bool {
        let cell1_dir = self.get_relative_direciton(cell_index_1, cell_index_2);
        let cell2_dir = cell1_dir.get_opposing_dir();

        let cell1_has_wall = self.get_nth_cell(cell_index_1).has_wall(cell1_dir.get_val());
        let cell2_has_wall = self.get_nth_cell(cell_index_2).has_wall(cell2_dir.get_val());

        return cell1_has_wall && cell2_has_wall;
    }

    /// set a wall between the given cells indexes
    fn set_inter_wall(&mut self, cell_index_1: usize, cell_index_2: usize) {
        let cell1_dir = self.get_relative_direciton(cell_index_1, cell_index_2);
        let cell2_dir = cell1_dir.get_opposing_dir();

        self.set_nth_cell(cell_index_1, self.get_nth_cell(cell_index_1).0 & !cell1_dir.get_val());
        self.set_nth_cell(cell_index_2, self.get_nth_cell(cell_index_2).0 & !cell2_dir.get_val());
    }

    /// remove a wall between the given cells indexes
    fn remove_inter_wall(&mut self, cell_index_1: usize, cell_index_2: usize) {
        let cell1_dir = self.get_relative_direciton(cell_index_1, cell_index_2);
        let cell2_dir = cell1_dir.get_opposing_dir();

        self.set_nth_cell(cell_index_1, self.get_nth_cell(cell_index_1).0 | cell1_dir.get_val());
        self.set_nth_cell(cell_index_2, self.get_nth_cell(cell_index_2).0 | cell2_dir.get_val());
    }

    fn get_rows(&self) -> Vec<Vec<Cell>>;

    fn get_neighbours(&self, index: usize) -> Vec<Cell>;
}