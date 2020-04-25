import React, { useState } from 'react'
// import { Redirect } from 'react-router-dom'
// import { AppContext } from '../../context'
import { useDispatch } from "react-redux"
import './biller.css'

const AddBiller = () => {
  // const {
  //   uploadComplete
  // } = useContext(AppContext)
//   const bills = useSelector(state => state)
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [formError, setFormError] = useState(false)
  const addFieldToPayload = (ev, type) => {
      let val = ev.currentTarget.value
      if (type === 'name') {
        setName(val)
      } else if (type === 'category') {
        setCategory(val)
      } else if (type === 'amount') {
        setAmount(val)
      }
  }

  const resetForm = () => {
      setAmount('')
      setCategory('')
      setName('')
  }

  const addBill = () => {
      if (name && category && amount && typeof parseInt(amount) === 'number') {
        dispatch({
            type: "ADD_BILL",
            payload: {
                name,
                category,
                amount: parseInt(amount)
            }
        })
        // resetForm()
      } else {
        setFormError(true)
      }
  }

  let template = (
    <div className="add-biller">
        <div className="bill-header">
            New Expense
        </div>
        <div className="pos-r">
            <input type="text" className={name ? 'add-biller-name' : 'add-biller-name label-top'} id="add-biller-name" value={name} onChange={e => addFieldToPayload(e, 'name')} />
            <label className="biller-label" htmlFor="add-biller-name">Describe your expense </label>
        </div>
        
        <div className="biller-row-second">
            <div>
                <select id="add-biller-category" className="add-biller-category" value={category} onChange={e => addFieldToPayload(e, 'category')}>
                    <option>Select Category</option>
                </select>
            </div>

            <div>
                <input type="text" className={amount ? 'add-biller-amount' : 'add-biller-amount label-top'} id="add-biller-amount" value={amount} onChange={e => addFieldToPayload(e, 'amount')} />
                <label htmlFor="add-biller-amount">Amount: </label>
            </div>

            <div>
                <button className="button Button--secondary" onClick={addBill}>Add Bill</button>
            </div>
        </div>
        {
            formError && <div className="error-msg">
                Uh-oh! Looks like you missed a field. Description, category or amount cannot be left empty. Please enter numeric values only for amounts
            </div>
        }
    </div>
  )

  return (
      <>
        {template}
      </>
  )
}

export default AddBiller