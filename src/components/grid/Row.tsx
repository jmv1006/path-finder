import { useEffect, useState } from "react"
import EditingInfo from "../../config/interfaces/IEditingInfo"
import IGrid from "../../config/interfaces/IGrid"
import ISpace from "../../config/interfaces/ISpace"
import './grid.css'
import Space from "./Space"

type RowPropTypes = {
    grid: IGrid | null,
    rowIndex: number,
    editingInfo: EditingInfo
}

const Row = ({ grid, rowIndex, editingInfo } : RowPropTypes) => {

    const spacesMapped = grid?.rows[rowIndex].map((space: ISpace) =>
        <Space key={space.id} spaceInfo={space} editingInfo={editingInfo} grid={grid}/>
    )

    return(
        <div className="Row">
            {spacesMapped}
        </div>
    )
}

export default Row