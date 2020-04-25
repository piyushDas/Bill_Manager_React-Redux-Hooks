import React, { useState, createContext } from 'react'

export const AppContext = createContext({})

export const AppState = ({ children }) => {
  /*
    States used in the context
  */
  const [flagToShowBills, setFlagToShowBills] = useState(false)
  const [threshold, setThreshold] = useState(50000)
  const [nextId, setNextId] = useState('')
  const getDataPoints = (bills, month) => {
    console.log(month)
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const billObj = {}
    for (const bill of bills) {
      if (billObj[bill.date]) {
        billObj[bill.date][1] += bill.amount
      } else {
        const billDate = new Date(bill.date)
        billObj[bill.date] = [billDate.getDate(), bill.amount]
      }
    }
    const sortedkeys = Object.keys(billObj).sort((d1, d2) => {
      d1 = (new Date(d1)).getTime()
      d2 = (new Date(d2)).getTime()
      return d1 - d2
    })
    const result = []
    for (const key of sortedkeys) {
      result.push(billObj[key])
    }
    // console.log(billObj)
    return result
  }  

  const initiateId = bills => {
    let next = 1
    if (bills.length) {
      for (const bill of bills) {
        if (bill.id > next) {
          next = bill.id
        }
      }
    }
    setNextId(next)
  }

  const getBillsForPayment = (bills, threshold) => {
    let result = []
    const billObj = []
    for (const bill of bills) {
      billObj.push({
       value: bill.amount,
       id: bill.id
      })
    }

    billObj.sort((a, b) => {
      return b.value - a.value
    })
    const billIds = {}
    let index = 0
    if (typeof threshold !== 'number') {
      threshold = parseInt(threshold)
    }

    while (threshold > 0 && index < billObj.length) {
      if(billObj[index].value < threshold){
        threshold = threshold - billObj[index].value
        billIds[billObj[index].id] = billObj[index].value
      }
      index++;
    }

    result = bills.map(bill => {
      if (billIds[bill.id]) {
        bill.highlight = true
      } else {
        bill.highlight = false
      }
      return bill
    })
    console.log(billObj)
    console.log(result)
    return result
  }

  return (
    <AppContext.Provider
      value={{
        flagToShowBills,
        setFlagToShowBills,
        getDataPoints,
        getBillsForPayment,
        threshold,
        setThreshold,
        nextId,
        initiateId,
        setNextId
      }}
    >
      {children}
    </AppContext.Provider>
  )
}