import ISpace from "../config/interfaces/ISpace";

const removeWallsHelper = (rows: Array<Array<ISpace>>) => {
    const updatedRows = [];

    for(let r = 0; r < rows.length; r++) {
        const newRow = []
        
        for(let c = 0; c < rows[0].length; c++) {
            const updatedSpace = rows[r][c]
            if(updatedSpace.blocked) updatedSpace.blocked = false
            newRow.push(updatedSpace)
        }

        updatedRows.push(newRow)
    }

    return updatedRows
}

export default removeWallsHelper