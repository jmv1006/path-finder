import { useEffect, useState } from "react"
import EditingInfo from "../../config/interfaces/IEditingInfo"
import IGrid from "../../config/interfaces/IGrid"
import ISpace from "../../config/interfaces/ISpace"
import './grid.css'

type SpacePropTypes = {
    spaceInfo: ISpace,
    editingInfo: EditingInfo,
    grid: IGrid
}

const Space = ( { spaceInfo, editingInfo, grid } : SpacePropTypes) => {
    const [isStart, setIsStart] = useState(false);
    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {
        handleStartEnd()
    }, [grid.start, grid.end])

    const notifyEdit = () => {
        if (!editingInfo.notify || !editingInfo.editing) return;
        editingInfo.notify(spaceInfo.row, spaceInfo.col, editingInfo.mode)
    }

    const handleStartEnd = () => {
        const startPosition = grid.start;
        const endPosition = grid.end;

        if(spaceInfo.row == startPosition[0] && spaceInfo.col == startPosition[1]) setIsStart(isStart => true)
        else setIsStart(isStart => false)

        if (spaceInfo.row == endPosition[0] && spaceInfo.col == endPosition[1]) {
            setIsEnd(isEnd => true)
        }
        else setIsEnd(isEnd => false)
    }


    return(
        <>
            {spaceInfo.isPartOfPath ?
                <div className="spacePath" />
                :
                <>
                    {spaceInfo.blocked && <div className="spaceBlocked" onClick={notifyEdit} />}
                    {isStart && <div className="spaceStart" onClick={notifyEdit} />}
                    {isEnd && <div className="spaceEnd" onClick={notifyEdit} />}
                    {(!spaceInfo.blocked && !isStart && !isEnd) && <div className="space" onClick={notifyEdit} />}
                </>
            }
        </>
        
    )
}

export default Space