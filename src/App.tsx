import './index.css'
import { MapView } from './components/MapView'
import { SideBar } from './components/SideBar'
import { RecoilRoot } from 'recoil'

function App() {


  return (
    <RecoilRoot>
      <div className="relative min-h-screen flex">
        <SideBar />
        <div className="min-h-screen w-full">
          <MapView />
        </div>
      </div>
    </RecoilRoot>

  )
}

export default App
