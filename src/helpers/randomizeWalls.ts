import IGrid from "../config/interfaces/IGrid";
import ISpace from "../config/interfaces/ISpace";

const randomizeWalls = (grid: IGrid, rowsAmount: number, colsAmount: number) => {
    const rowsWithRandomWalls = [];
    const start = grid.start;
    const end = grid.end;

    for(let r = 0; r < rowsAmount; r++) {
        const newRow = []

        for(let c = 0; c < colsAmount; c++) {
            const space = grid.rows[r][c]
            
            // If space is the start or end space, just append it to new row and continue loop
            if((start[0] == r && start[1] == c) || (end[0] == r && end[1] == c)) {
                newRow.push(space)
                continue
            }
            
            const randomInt = Math.floor(Math.random() * 3);
            if(randomInt == 0) space.blocked = true;
            else space.blocked = false
            
            newRow.push(space)
        }

        rowsWithRandomWalls.push(newRow)
    }

    return rowsWithRandomWalls
}

export default randomizeWalls