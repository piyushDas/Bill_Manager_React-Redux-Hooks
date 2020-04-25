import React from 'react'
// import { Redirect } from 'react-router-dom'
// import { AppContext } from '../../context'
import Header from '../../Components/Header'
import BillChart from '../../Components/BillChart'
import BillList from '../../Components/BillList'
import AddBiller from '../../Components/AddBiller'
import './shell.css'

const AppShell = () => {
  // const {
  //   uploadComplete
  // // } = useContext(AppContext)
  // const dispatch = useDispatch()

  let template = (
    <div className="app-shell">
        <Header />
        <div className="dashboard">
          <AddBiller />
          <BillList />
          <BillChart />
        </div>
    </div>
  )

  return (
      <>
        {template}
      </>
  )
}

export default AppShell