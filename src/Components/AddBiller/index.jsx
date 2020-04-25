import React, { useState, useContext } from 'react'
import { AppContext } from '../../context'
import { useDispatch } from "react-redux"
import './biller.css'

const AddBiller = () => {
  const {
    nextId,
    setNextId
  } = useContext(AppContext)
//   const bills = useSelector(state => state)
  const dispatch = useDispatch()
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [formError, setFormError] = useState(false)
  const addFieldToPayload = (ev, type) => {
      let val = ev.currentTarget.value
      if (type === 'description') {
        setDescription(val)
      } else if (type === 'category') {
        val = ev.target.value
        setCategory(val)
      } else if (type === 'amount') {
        setAmount(val)
      }
      setFormError(false)
  }

  const resetForm = () => {
      setAmount('')
      setCategory('')
      setDescription('')
  }

  const addBill = () => {
      if (description && category && amount && typeof parseInt(amount) === 'number') {
        const dateObj = new Date()
        const dateStr = `${(dateObj.getMonth() + 1) > 9 ? `0${(dateObj.getMonth() + 1)}` : (dateObj.getMonth() + 1)}-${dateObj.getDate() > 9 ? dateObj.getDate() : `0${dateObj.getDate()}`}-${dateObj.getFullYear()}`
        dispatch({
            type: "ADD_BILL",
            payload: {
                description,
                category,
                amount: parseInt(amount),
                date: dateStr,
                id: nextId+1
            }
        })
        setNextId(nextId+1)
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
            <input type="text" className={description ? 'add-biller-name label-top' : 'add-biller-name'} id="add-biller-name" value={description} onChange={e => addFieldToPayload(e, 'description')} />
            <label className="biller-label" htmlFor="add-biller-name">Describe your expense </label>
        </div>
        
        <div className="biller-row-second">
            <div>
                <select id="add-biller-category" className="add-biller-category" value={category} onChange={e => addFieldToPayload(e, 'category')}>
                    <option value="">Select Category</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Education">Education</option>
                    <option value="Personal Care">Personal Care</option>
                    <option value="Travel">Travel</option>
                    <option value="Utility">Utility</option>
                </select>
            </div>

            <div>
                <input type="text" className={amount ? 'add-biller-amount label-top' : 'add-biller-amount'} id="add-biller-amount" value={amount} onChange={e => addFieldToPayload(e, 'amount')} />
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