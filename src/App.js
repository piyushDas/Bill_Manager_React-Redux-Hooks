import React from 'react'
import { AppState } from './context'
import AppShell from './Containers/AppShell'
import './App.css'

const AppView = () => {
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
