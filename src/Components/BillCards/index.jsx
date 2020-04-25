import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { AppContext } from '../../context'
import './bill-cards.css'
import { useContext } from 'react'


const BillCards = () => {
  const {
      flagToShowBills,
      setFlagToShowBills,
      threshold,
      setThreshold
  } = useContext(AppContext)
  const bills = useSelector(state => state)

  const getTotal = () => {
      let totalBill = 0
      if (bills.length) {
        for (const bill of bills) {
            totalBill += bill.amount
        }
      }
      return totalBill
  }
  
  const [thresholdInput, setThresholdInput] = useState('')
//   const total = "20000"

  const setMonthlyLimit = () => {
    if (threshold && typeof parseInt(threshold) === 'number') {
        setThreshold(thresholdInput)
        setThresholdInput('')
    }
  }
  
  const highlightBills = () => {
    setFlagToShowBills(!flagToShowBills)
  }

  return (
      <div className="card-box">
        <div className="card">
            <div className="label">Total expenses</div>
            <div className="values">{`₹ ${getTotal()}`}</div>
        </div>
            
        <div className="card">
            <div className="label">Monthly Limit</div>
            <div className="values">{`₹ ${threshold}`}</div>
        </div>

        <div className="card">
            <div className="half-cards">
                <input type="text" value={thresholdInput} onChange={e => setThresholdInput(e.currentTarget.value)} />
                <label>Set budget for month</label>
                <button onClick={setMonthlyLimit}>Set</button>
            </div>

            <div className="half-cards">
                <div>To see the minimum bills to be paid under the monthly limit set above, click the button below</div>
                <button type="button" onClick={highlightBills}>
                    {flagToShowBills ? 'Remove highlights' : 'Highlight bills to be paid'}
                </button>
            </div>
        </div>
      </div>
  )
}

export default BillCards