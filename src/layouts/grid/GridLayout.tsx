import { useEffect, useState } from 'react'
import EditGrid from '../../components/graph-types/grid/edit-grid/EditGrid'
import Grid from '../../components/graph-types/grid/Grid'
import PathInfo from '../../components/graph-types/grid/path-info/PathInfo'
import IGrid from '../../config/interfaces/IGrid'
import EditingInfo from '../../config/interfaces/IEditingInfo'
import unMarkPathSpaces from '../../helpers/unMarkPathSpaces'
import generateBaseGridHelper from '../../helpers/generateBaseGrid'
import bfs from '../../algorithm/bfs'
import removeWallsHelper from '../../helpers/removeWalls'
import Legend from '../../components/graph-types/legend/Legend'
import './gridlayout.css'

const defaultEditInfo : EditingInfo = {
    editing: false,
    notify: null,
    mode: "blocker",
    mouseEventType: "click"
}

const GridLayout = () => {
    const [grid, setGrid] = useState<IGrid | null>(null)
    const [editingInfo, setEditingInfo] = useState<EditingInfo>(defaultEditInfo)
  
    const [pathFinderInfo, setPathFinderInfo] = useState({pathFound: false, pathLength: 0, algorithm: "bfs"});
  
    useEffect(() => {
      generateBaseGrid(10, 10);
    },[])
  
    const toggleEditing = () => {
      // removing path found from grid
      resetGrid(false);

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
  
    const resetGrid = (removeWalls: boolean) => {
      if(grid) {
        if(!removeWalls) unMarkPathSpaces(grid?.rows);
        else removeWallsHelper(grid.rows)
  
        setPathFinderInfo({
          ...pathFinderInfo,
          pathFound: false,
          pathLength: 0
        })
      }
    }
  
    return (
      <div className="gridLayout">
        {(editingInfo.editing && grid) ? <EditGrid grid={grid} setEditing={setEditingInfo} editingInfo={editingInfo} setGrid={setGrid} generateGrid={generateBaseGrid} resetGrid={resetGrid}/> : <button onClick={toggleEditing} className="baseButton">Edit</button>}
        { grid && <Grid grid={grid} editingInfo={editingInfo}/> }
        {grid && <Legend />}
        {(grid && !editingInfo.editing && !pathFinderInfo.pathFound) && <button onClick={findPath} className="baseButton">Find Path</button>}
        {pathFinderInfo.pathFound && <PathInfo pathFinderInfo={pathFinderInfo} />}
        {(!editingInfo.editing && pathFinderInfo.pathFound) && <button onClick={() => resetGrid(false)} className="baseButton">Clear Path</button>}
      </div>
    )
}

export default GridLayout