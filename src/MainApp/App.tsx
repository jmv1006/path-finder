import GridLayout from '../layouts/grid/GridLayout'
import Header from '../components/header/Header'
import './app.css'
import { useState } from 'react'
import NavBar from '../components/nav-bar/NavBar'
import Footer from '../components/footer/footer'
import WeightedGraphLayout from '../layouts/weighted/WeightedGraphLayout'

const modes = ["grid", "weighted"]

function App() {
  const [mode, setMode] = useState("grid")

  const setSelectedMode = (selectedMode : string) => {
    setMode((mode: string) => selectedMode)
  }

  return (
    <div className="App">
      <Header />
      <div className='mainContentContainer'>
        <NavBar modes={modes} selected={mode} setSelected={setSelectedMode}/>
        {mode == "grid" && <GridLayout />}
        {mode == "weighted" && <WeightedGraphLayout />}
      </div>
      <Footer />
    </div>
  )
}

export default App
