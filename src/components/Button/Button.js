import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ticketSort } from '../store/fetchTicketsSlice'

import classes from './Button.module.scss'

export default function Button({ label, chosen = false }) {
  const dispatch = useDispatch()

  const tickets = useSelector((state) => state.ticketList)

  const { sortParam } = tickets

  if (sortParam === label) {
    chosen = true
  }

  const sort = (e) => {
    e.preventDefault()
    dispatch(ticketSort(label))
  }

  return (
    <button
      onClick={(e) => sort(e)}
      className={chosen ? `${classes['btn']} ${classes['btn--chosen']}` : classes['btn']}
    >
      {label}
    </button>
  )
}
