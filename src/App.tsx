import './index.css'
import { MapView } from './components/MapView'
import { SideBar } from './components/SideBar'
import { RecoilRoot } from 'recoil'

import { Geolocator } from './components/Geolocator'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { APIProvider } from '@vis.gl/react-google-maps'
function App() {


  return (
    <RecoilRoot>
      <APIProvider apiKey={import.meta.env.VITE_MAPBOX_TOKEN}>
        <ToastContainer />
        <Geolocator />
        <div className="relative min-h-screen flex">
          <SideBar />
          <div className="min-h-screen w-full">
            <MapView />
          </div>
        </div>
      </APIProvider>
    </RecoilRoot>

  )
}

export default App
