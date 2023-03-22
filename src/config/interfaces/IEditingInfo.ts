interface EditingInfo {
    editing: boolean,
    notify: null | ((row: number, column: number, mode: string) => void),
    mode: string,
    mouseEventType: string
}

export default EditingInfo