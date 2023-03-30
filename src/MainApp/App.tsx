import GridLayout from '../layouts/grid/GridLayout'
import Header from '../components/header/Header'
import './app.css'
import Footer from '../components/footer/footer'


function App() {
  return (
    <div className="App">
      <Header />
      <div className='mainContentContainer'>
        <GridLayout />
      </div>
      <Footer />
    </div>
  )
}

export default App
