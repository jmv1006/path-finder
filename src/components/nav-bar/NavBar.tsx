import './navbar.css'

type NavBarProps = {
    modes: Array<String>,
    selected: String,
    setSelected: Function
}

const NavBar = ({ modes, selected, setSelected } : NavBarProps) => {
    const mappedModes = modes.map((mode: String) =>
        <div key={mode.length} onClick={() => setSelected(mode)}>{mode}</div>
    )

    return(
        <div className="navbar">
            {mappedModes}
        </div>
    )
}

export default NavBar