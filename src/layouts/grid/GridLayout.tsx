import { useEffect, useState } from 'react'
import EditGrid from '../../components/edit-grid/EditGrid'
import Grid from '../../components/graph-types/grid/Grid'
import Header from '../../components/header/Header'
import PathInfo from '../../components/path-info/PathInfo'
import IGrid from '../../config/interfaces/IGrid'
import EditingInfo from '../../config/interfaces/IEditingInfo'
import unMarkPathSpaces from '../../helpers/unMarkPathSpaces'
import generateBaseGridHelper from '../../helpers/generateBaseGrid'
import bfs from '../../algorithm/bfs'
import './gridlayout.css'

const defaultEditInfo : EditingInfo = {
    editing: false,
    notify: null,
    mode: "blocker"
}

const GridLayout = () => {
    const [grid, setGrid] = useState<IGrid | null>(null)
    const [editingInfo, setEditingInfo] = useState<EditingInfo>(defaultEditInfo)
  
    const [pathFinderInfo, setPathFinderInfo] = useState({pathFound: false, pathLength: 0, algorithm: "bfs"});
  
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
      const newGrid: IGrid = generateBaseGridHelper(rows, cols);
  
      setPathFinderInfo({
        ...pathFinderInfo,
        pathFound: false
      })
  
      setGrid(grid => newGrid)
    }
  
    const findPath = () => {
      if(grid) {
        const {updatedGridWithPath, lengthOfPath } = bfs(grid);
        if (!updatedGridWithPath) return
  
        setGrid({
          ...grid, 
          rows: updatedGridWithPath.rows
        })
  
        setPathFinderInfo({
          ...pathFinderInfo, 
          pathFound: true,
          pathLength: lengthOfPath
        })
      }
    }
  
    const resetGrid = () => {
      if(grid) {
        const unMarkedSpaces = unMarkPathSpaces(grid?.rows);
  
        setPathFinderInfo({
          ...pathFinderInfo,
          pathFound: false,
          pathLength: 0
        })
      }
    }
  
    return (
      <div className="gridLayout">
        {(editingInfo.editing && grid) ? <EditGrid grid={grid} setEditing={setEditingInfo} editingInfo={editingInfo} setGrid={setGrid} generateGrid={generateBaseGrid} /> : <button onClick={toggleEditing}>Edit</button>}
        { grid && <Grid grid={grid} editingInfo={editingInfo}/> }
        {(grid && !editingInfo.editing && !pathFinderInfo.pathFound) && <button onClick={findPath}>Find Path</button>}
        {pathFinderInfo.pathFound && <PathInfo pathFinderInfo={pathFinderInfo} />}
        {!editingInfo.editing && <button onClick={resetGrid}>Reset Grid</button>}
      </div>
    )
}

export default GridLayout