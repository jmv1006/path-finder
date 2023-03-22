import ISpace from "../config/interfaces/ISpace";
import IGrid from "../config/interfaces/IGrid";

const generateBaseGridHelper = (rows: number, cols: number) => {
    const generatedRows = [];

    for(let r = 0; r < rows; r++) {
      const row = [];

      for(let c = 0; c < cols; c++) {
        const newSpace : ISpace = {
          row: r,
          col: c,
          id: r + c,
          blocked: false,
          isPartOfPath: false
        }
        row.push(newSpace)
      }

      generatedRows.push(row)
    }

    const newGrid : IGrid = {
      start: [0, 0],
      end: [rows - 1, cols - 1],
      rowsAmount: rows,
      colsAmount: cols,
      rows: generatedRows
    }

    return newGrid
}

export default generateBaseGridHelper