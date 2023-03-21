import { useEffect, useState } from 'react'
import EditGrid from './components/edit-grid/EditGrid'
import Grid from './components/grid/Grid'
import IGrid from './config/interfaces/IGrid'
import ISpace from './config/interfaces/ISpace'
import EditingInfo from './config/interfaces/IEditingInfo'
import './app.css'
import bfs from './algorithm/bfs'

const defaultEditInfo : EditingInfo = {
  editing: false,
  notify: null,
  mode: "blocker"
}

function App() {
  const [grid, setGrid] = useState<IGrid | null>(null)
  const [editingInfo, setEditingInfo] = useState<EditingInfo>(defaultEditInfo)

  useEffect(() => {
    generateBaseGrid(10, 10);
  },[])

  const toggleEditing = () => {
    if(editingInfo.editing === true) setEditingInfo({
      ...editingInfo,
      editing: false
    })
    else setEditingInfo({
      ...editingInfo,
      editing: true
    })
  }

  const generateBaseGrid = (rows: number, cols: number) => {
    const generatedRows = [];

    for(let r = 0; r < rows; r++) {
      const row = [];

      for(let c = 0; c < cols; c++) {
        const newSpace : ISpace = {
          row: r,
          col: c,
          id: r + c,
          blocked: false,
        }
        row.push(newSpace)
      }

      generatedRows.push(row)
    }

    const newGrid : IGrid = {
      start: [0, 0],
      end: [rows - 1, cols - 1],
      rowsAmount: rows,
      colsAmount: cols,
      rows: generatedRows
    }

    setGrid(grid => newGrid)
  }

  const addColumn = () => {
    if(grid != null) {
      
    }
  }


  const findPath = () => {
    if (grid) console.log(bfs(grid))
  }


  return (
    <div className="App">
      {editingInfo.editing ? <EditGrid grid={grid} setEditing={setEditingInfo} editingInfo={editingInfo} setGrid={setGrid} /> : <button onClick={toggleEditing}>Edit</button>}
      { grid && <Grid grid={grid} editingInfo={editingInfo}/> }
      {(grid && !editingInfo.editing) && <button onClick={findPath}>Find Path</button>}
    </div>
  )
}

export default App
