import React, { useMemo, useState, useContext } from 'react'
import { Chart } from 'react-charts'
import { useSelector } from 'react-redux'
import { AppContext } from '../../context'
import './bill-chart.css'

const BillChart = () => {
    const {
        getDataPoints
    } = useContext(AppContext)
        
    const bills = useSelector(state => state)
    const [month, setMonth] = useState('January')
    const dataPoints = getDataPoints(bills, month)

    const data = useMemo(
        () => [
          {
            label: 'Series 1',
            data: dataPoints || []
          }
        ],
        []
      )
    
      const axes = useMemo(
        () => [
          { primary: true, type: 'linear', position: 'bottom' },
          { type: 'linear', position: 'left' }
        ],
        []
      )

      const selectMonth = val => {
          setMonth(val)
      }
    
      const lineChart = (
        // A react-chart hyper-responsively and continuously fills the available
        // space of its parent element automatically
        <div className="bill-chart">
            <div className="bill-header">
                View my expenses this Month
            </div>
            <div className="chart-filter">
                <label htmlFor="month-selector">Select Month</label>
                <select id="month-selector" value={month} onChange={e => selectMonth(e.target.value)}>
                    <option value="January">January</option>
                    <option value="January">February</option>
                    <option value="January">March</option>
                    <option value="April">April</option>
                </select>
            </div>
            <div className="chart-box">
                <Chart data={data} axes={axes} />
            </div>
        </div>
      )

      return (
          <>
            {lineChart}
          </>
      )
}

export default BillChart