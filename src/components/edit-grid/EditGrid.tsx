import { useEffect, useState } from "react"
import EditingInfo from "../../config/interfaces/IEditingInfo";
import IGrid from "../../config/interfaces/IGrid"
import ISpace from "../../config/interfaces/ISpace";

type EditGridProps = {
    grid: IGrid | null,
    setEditing: Function,
    editingInfo: EditingInfo,
    setGrid: Function
}

const editOptions = ["blocker", "start", "end"];

const EditGrid = ({ grid, setEditing, editingInfo, setGrid } : EditGridProps) => {
    const [editMode, setEditMode] = useState("blocker")

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
    }, [editMode])

    const toggleEditing = () => {
        setEditing({
            ...editingInfo,
            editing: false, 
            mode: editMode
        })
    }

    const handleEdit = (row: number, column: number, mode: string) => {
        if(grid == null) return 
        
        const editedGrid : IGrid = {
            rows: grid.rows,
            colsAmount: grid.colsAmount,
            rowsAmount: grid.rowsAmount,
            start: grid.start,
            end: grid.end
        };

        if(mode == "blocker") {
            editedGrid.rows[row][column].blocked = !editedGrid.rows[row][column].blocked
        } else if(mode == "start") {
            if(!editedGrid.rows[row][column].blocked) editedGrid.start = [row, column]
        } else if(mode == "end") {
            if(!editedGrid.rows[row][column].blocked) editedGrid.end = [row, column]
        }

        setGrid({
            ...grid,
            rows: editedGrid.rows,
            start: editedGrid.start,
            end: editedGrid.end,
        })
    }

    const addRow = (newIndex: number | undefined) => {
        if(grid != null && newIndex != undefined) {
          const rowLength = grid?.rowsAmount
    
          const newRow = [];
    
          for(let c = 0; c < rowLength; c++) {
            const newSpace : ISpace = {
              row: newIndex,
              col: c,
              id: newIndex + c,
              blocked: false,
            }
            newRow.push(newSpace)
          }
          
          const editedGrid: IGrid = {
            rows: grid.rows,
            rowsAmount: grid.rowsAmount,
            colsAmount: grid.colsAmount,
            start: grid.start,
            end: grid.end
          }
    
          editedGrid.rows.push(newRow)
    
          setGrid({
            ...grid,
            rows: editedGrid.rows,
            rowsAmount: editedGrid.rowsAmount,
            start: editedGrid.start,
            end: editedGrid.end,
            colsAmount: editedGrid.colsAmount
          })
        }
    }

    const toggleMode = (mode: string) => {
        setEditMode(editMode => mode)
    }

    return(
        <>
            Currently Editing: {editMode}
            <div>
                <button onClick={() => toggleMode("start")}>Start</button>
                <button onClick={() => toggleMode("end")}>End</button>
                <button onClick={() => toggleMode("blocker")}>Wall</button>
            </div>
            <button onClick={toggleEditing}>Close</button>
        </>

    )
}

export default EditGrid