import GridLayout from '../layouts/grid/GridLayout'
import Header from '../components/header/Header'
import './app.css'
import { useState } from 'react'
import WeightedGraph from '../layouts/weighted/WeightedGraph'
import NavBar from '../components/nav-bar/NavBar'

const modes = ["grid", "weighted"]
function App() {
  const [mode, setMode] = useState("grid")

  const setSelectedMode = (selectedMode : string) => {
    setMode((mode: string) => selectedMode)
  }

  return (
    <div className="App">
      <Header />
      <NavBar modes={modes} selected={mode} setSelected={setSelectedMode}/>
      {mode == "grid" && <GridLayout />}
      {mode == "weighted" && <WeightedGraph />}
    </div>
  )
}

export default App
