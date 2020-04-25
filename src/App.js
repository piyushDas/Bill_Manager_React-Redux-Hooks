import React, { useEffect, useContext } from 'react'
import {
  checkMobileDevice
} from './utils'
import { AppState, AppContext } from './context'
import AppShell from './Containers/AppShell'
import './App.css'

const AppView = () => {
  // const [isMobileDevice, updateMobileDeviceFlag] = useState(false)
  const {
    updateMobileDeviceFlag
  } = useContext(AppContext)

  useEffect(() => {
    updateMobileDeviceFlag(checkMobileDevice())
  }, [])

  return (
    <div>
      <AppShell />
    </div>
  )
}

const App = () => (
  <AppState>
    <AppView />
  </AppState>
)

export default App
