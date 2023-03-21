import ISpace from "./ISpace";

interface IGrid {
    start: number,
    end: number,
    rowsAmount: number, 
    colsAmount: number,
    rows: Array<Array<ISpace>>
}

export default IGrid