import { useEffect } from "react"
import EditingInfo from "../../config/interfaces/IEditingInfo"
import IGrid from "../../config/interfaces/IGrid"
import ISpace from "../../config/interfaces/ISpace"
import Row from "./Row"

type GridPropTypes = {
    grid: IGrid | null,
    editingInfo: EditingInfo
}

const Grid = ({ grid, editingInfo } : GridPropTypes) => {

    const rowsMapped = grid?.rows.map((row: Array<ISpace>, index: number) => 
        <Row key={index} grid={grid} rowIndex={index} editingInfo={editingInfo}/>
    )
    
    return(
        <div className="GridContainer">
            {rowsMapped}
        </div>
    )
}

export default Grid