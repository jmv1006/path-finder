import IGrid from "../../config/interfaces/IGrid"

type EditGridProps = {
    grid: IGrid | null,
    setEditing: Function
}

const EditGrid = ({ grid, setEditing } : EditGridProps) => {
    
    const toggleEditing = () => {
        setEditing((editing: boolean) => false)
    }

    return(
        <>
            Edit Component
            <button onClick={toggleEditing}>Close</button>
        </>

    )
}

export default EditGrid