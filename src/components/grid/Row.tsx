import { useEffect, useState } from "react"
import IGrid from "../../config/interfaces/IGrid"
import ISpace from "../../config/interfaces/ISpace"
import './grid.css'
import Space from "./Space"

type RowPropTypes = {
    grid: IGrid | null,
    rowIndex: number
}

const Row = ({ grid, rowIndex } : RowPropTypes) => {

    const spacesMapped = grid?.rows[rowIndex].map((space: ISpace) =>
        <Space key={space.id} spaceInfo={space} />
    )

    return(
        <div className="Row">
            {spacesMapped}
        </div>
    )
}

export default Row