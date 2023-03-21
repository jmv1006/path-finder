import IGrid from "../../config/interfaces/IGrid"
import ISpace from "../../config/interfaces/ISpace"
import Row from "./Row"

type GridPropTypes = {
    grid: IGrid | null
}

const Grid = ({ grid } : GridPropTypes) => {

    const rowsMapped = grid?.rows.map((row: Array<ISpace>, index: number) => 
        <Row key={index} grid={grid} rowIndex={index} />
    )
    
    return(
        <div className="GridContainer">
            {rowsMapped}
        </div>
    )
}

export default Grid