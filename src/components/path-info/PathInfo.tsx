
interface PathFinderInfo {
    pathFound: boolean,
    pathLength: number,
    algorithm: string
}

type PathInfoProps = {
    pathFinderInfo: PathFinderInfo
}

const PathInfo = ({ pathFinderInfo } : PathInfoProps) => {

    return(
        <div>
            {pathFinderInfo.pathFound && `Found a path of length ${pathFinderInfo.pathLength} using ${pathFinderInfo.algorithm}`}
            {!pathFinderInfo.pathFound && "Could not find a path!"}
        </div>
    )
}

export default PathInfo