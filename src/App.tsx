import './index.css'
import { MapView } from './components/MapView'
import { SideBar } from './components/SideBar'

function App() {


  return (
    <div className="relative min-h-screen flex">
      <SideBar />
      <div className="min-h-screen w-full">
      <MapView />
      </div>
    </div>

  )
}

export default App
