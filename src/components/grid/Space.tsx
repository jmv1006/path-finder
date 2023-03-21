import { useState } from "react"
import ISpace from "../../config/interfaces/ISpace"
import './grid.css'

type SpacePropTypes = {
    spaceInfo: ISpace
}

const Space = ( { spaceInfo } : SpacePropTypes) => {
    const [blocked, setBlocked] = useState(spaceInfo.blocked)

    const markSpace = () => {
        if(blocked == true) setBlocked(blocked => false)
        else setBlocked(blocked => true)
    }

    return(
        <div className={blocked ? "spaceBlocked" : "space"}>
            {spaceInfo.blocked ? "X" : ""}
        </div>
    )
}

export default Space