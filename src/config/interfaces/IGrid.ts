import ISpace from "./ISpace";

interface IGrid {
    start: Array<number>,
    end: Array<number>,
    rowsAmount: number, 
    colsAmount: number,
    rows: Array<Array<ISpace>>
}

export default IGrid