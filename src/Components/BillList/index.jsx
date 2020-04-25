import React, { useEffect, useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppContext } from '../../context'
import './bill-list.css'


const BillList = () => {
  const {
    getBillsForPayment
  } = useContext(AppContext)
  const billers = useSelector(state => state)
  const [bills, setBills] = useState(billers)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(bills)
    setBills(getBillsForPayment(bills, 42000))
  }, [billers])

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
                  <div className="bill-item" key={`${index}_elem`}>
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