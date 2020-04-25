import React, { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppContext } from '../../context'
import './bill-list.css'


const BillList = () => {
  const {
    getBillsForPayment,
    flagToShowBills,
    threshold
  } = useContext(AppContext)
  const billers = useSelector(state => state)
  const [bills, setBills] = useState(billers)
  const dispatch = useDispatch()

  useEffect(() => {
      if (flagToShowBills) {
        setBills(getBillsForPayment(bills, threshold))
      } else {
        setBills(getBillsForPayment(bills, 0))
      }
  }, [billers, flagToShowBills, threshold])

  let billList = "No bills available"

  const removeBill = description => () => {
    dispatch({
        type: "REMOVE_BILL",
        payload: {
            description
          }
      })
  }

  if (bills.length) {
    billList = (
        <>
          {
              bills.map((bill, index) => (
                  <div className={`bill-item ${bill.highlight ? 'highlight-item' : ''}`} key={`${index}_elem`}>
                      <div className="bill-details">
                        <div>
                            {bill.description}
                        </div>
                        <div>
                            {bill.category}
                        </div>
                      </div>
                      <div className="bill-price">
                        {`₹ ${bill.amount}`}
                      </div>
                      {/* <div>
                          {bill.highlight ? "Yes" : "No"}
                      </div> */}
                      <span onClick={removeBill(bill.description)}>X</span>
                  </div>
              ))
          }
        </>
    )
  }
  return (
      <>
        <div className="bill-header">
            Bills added so far
        </div>
        <div className="bills">
            {billList}
        </div>
      </>
  )
}

export default BillList