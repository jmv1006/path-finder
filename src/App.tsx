import { useEffect, useState } from 'react'
import EditGrid from './components/edit-grid/EditGrid'
import Grid from './components/grid/Grid'
import IGrid from './config/interfaces/IGrid'
import ISpace from './config/interfaces/ISpace'
import './app.css'

function App() {
  const [grid, setGrid] = useState<IGrid | null>(null)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    generateBaseGrid(10, 10);
  },[])

  const toggleEditing = () => {
    if(editing === true) setEditing(editing => false)
    else setEditing(editing => true)
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
          blocked: false
        }
        row.push(newSpace)
      }

      generatedRows.push(row)
    }

    const newGrid : IGrid = {
      start: 0,
      end: 0,
      rowsAmount: 10,
      colsAmount: 10,
      rows: generatedRows
    }

    setGrid(grid => newGrid)
  }

  return (
    <div className="App">
      {editing ? <EditGrid grid={grid} setEditing={setEditing} /> : <button onClick={toggleEditing}>Edit</button>}
      <button>Find Path</button>

      <Grid grid={grid}/>
    </div>
  )
}

export default App
