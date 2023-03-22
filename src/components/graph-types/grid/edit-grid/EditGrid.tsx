import { useEffect, useState } from "react"
import EditingInfo from "../../../../config/interfaces/IEditingInfo";
import IGrid from "../../../../config/interfaces/IGrid"
import randomizeWalls from "../../../../helpers/randomizeWalls";
import './editgrid.css'

type EditGridProps = {
    grid: IGrid,
    setEditing: Function,
    editingInfo: EditingInfo,
    setGrid: Function,
    generateGrid: (rows: number, cols: number) => void,
    resetGrid: (removeWalls: boolean) => void
}

const editOptions = ["blocker", "start", "end"];

const EditGrid = ({ grid, setEditing, editingInfo, setGrid, generateGrid, resetGrid } : EditGridProps) => {
    const [editMode, setEditMode] = useState("blocker")
    const [gridDimensions, setGridDimensions] = useState({w: grid?.colsAmount, h: grid?.rowsAmount})
    const [dimensionsBeingEdited, setDimensionsBeingEdited] = useState(false);

    useEffect(() => {
        setEditing({
            ...editingInfo,
            notify: handleEdit,
            mode: editMode
        })
    }, [])

    useEffect(() => {
        setEditing({
            ...editingInfo,
            notify: handleEdit,
            mode: editMode
        })
    }, [grid])

    useEffect(() => {
        setEditing({
            ...editingInfo,
            notify: handleEdit,
            mode: editMode
        })
    }, [editMode])

    const toggleEditing = () => {
        setEditing({
            ...editingInfo,
            editing: false, 
        })
    }

    const handleEdit = (row: number, column: number, mode: string) => {
        if(grid == null || dimensionsBeingEdited) return 

        const editedGrid : IGrid = {
            rows: grid.rows,
            colsAmount: grid.colsAmount,
            rowsAmount: grid.rowsAmount,
            start: grid.start,
            end: grid.end
        };

        if(mode == "blocker") {
            if ((editedGrid.start[0] == row && editedGrid.start[1] == column) || (editedGrid.end[0] == row && editedGrid.end[1] == column)) return 
            editedGrid.rows[row][column].blocked = !editedGrid.rows[row][column].blocked
        } else if(mode == "start") {
            if(editedGrid.end[0] == row && editedGrid.end[1] == column) return 
            if(!editedGrid.rows[row][column].blocked) editedGrid.start = [row, column]
        } else if(mode == "end") {
            if(editedGrid.start[0] == row && editedGrid.start[1] == column) return 
            if(!editedGrid.rows[row][column].blocked) editedGrid.end = [row, column]
        }

        setGrid({
            ...grid,
            rows: editedGrid.rows,
            start: editedGrid.start,
            end: editedGrid.end,
        })
    }

    const regenerateGrid = (e: any) => {
        e.preventDefault();
        if(gridDimensions.w > 25 || gridDimensions.h > 25) {
            alert("Maximum Grid Dimensions are 25 x 25")
            return
        }

        setDimensionsBeingEdited(dimensionsBeingEdited => false)
        generateGrid(gridDimensions.h, gridDimensions.w)
    }

    const handleChange = (e: any) => {
        const value = e.target.value;

        setGridDimensions({
            ...gridDimensions,
            [e.target.name]: parseInt(value)
        })
    }

    const toggleDimensionsEdit = () => {
        if(dimensionsBeingEdited) setDimensionsBeingEdited(dimensionsBeingEdited => false)
        else setDimensionsBeingEdited(dimensionsBeingEdited => true)
    }

    const toggleMode = (mode: string) => {
        setEditMode(editMode => mode)
    }

    const toggleMouseEventType = () => {
        const eventType = editingInfo.mouseEventType == "click" ? "hover" : "click";

        setEditing({
            ...editingInfo,
            mouseEventType: eventType
        })
    }

    const callRandomizeWalls = () => {
        const newRows = randomizeWalls(grid, grid.rowsAmount, grid.colsAmount)
        setGrid({
            ...grid,
            rows: newRows
        })
    }

    return(
        <div className="editContainer">
            <div className="inputContainer">
                <div className="buttonContainer">
                    <button onClick={toggleMouseEventType}>Toggle Mouse Event</button>
                    <button onClick={() => toggleMode("start")}>Start</button>
                    <button onClick={() => toggleMode("end")}>End</button>
                    <button onClick={() => toggleMode("blocker")}>Wall</button>
                    {!dimensionsBeingEdited && <button onClick={toggleDimensionsEdit}>Edit Dimensions</button>}
                </div>
                {dimensionsBeingEdited && 
                    <div className="dimensionsContainer">
                        Size:
                        <form onSubmit={regenerateGrid} className="dimensionsForm">
                            <input type={"number"} placeholder="Width" value={gridDimensions.w} name="w" onChange={handleChange}/>
                            <input type={"number"} placeholder="Height" value={gridDimensions.h} name="h" onChange={handleChange}/>
                            <button type="submit">Regenerate</button>
                            <button onClick={toggleDimensionsEdit}>Cancel</button>
                        </form>
                    </div>
                }
            </div>
            {!dimensionsBeingEdited && <button onClick={() => resetGrid(true)}>Remove Walls</button>}
            {!dimensionsBeingEdited && <button onClick={callRandomizeWalls}>Randomize Walls</button>}
            {!dimensionsBeingEdited && <button onClick={toggleEditing}>Close</button>}
        </div>

    )
}

export default EditGrid