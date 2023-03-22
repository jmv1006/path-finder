import ISpace from "../config/interfaces/ISpace";

const unMarkPathSpaces = (rows: Array<Array<ISpace>>) => {
    const updatedRows = [];

    for(let r = 0; r < rows.length; r++) {
        const newRow = []
        
        for(let c = 0; c < rows[0].length; c++) {
            const updatedSpace = rows[r][c]
            if(updatedSpace.isPartOfPath) updatedSpace.isPartOfPath = false
            newRow.push(updatedSpace)
        }

        updatedRows.push(newRow)
    }

    return updatedRows
}

export default unMarkPathSpaces