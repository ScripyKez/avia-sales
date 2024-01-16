import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Alert, Spin } from 'antd'

import { fetchTickets, requestId, ticketFilter, ticketSort } from '../store/fetchTicketsSlice'
import Ticket from '../Ticket'

import classes from './TicketsList.module.scss'

export default function TicketsList() {
  const tickets = useSelector((state) => state.ticketList)
  const filters = useSelector((state) => state.transferFilterList)
  const { completeLoading, error, ticketList, token, filteredList } = tickets
  const dispatch = useDispatch()

  const [listLength, setListLength] = useState(4)

  useEffect(() => {
    if (!token) {
      dispatch(requestId())
    }
  }, [dispatch, token])

  useEffect(() => {
    if (!completeLoading && token) {
      dispatch(fetchTickets(token))
      dispatch(ticketSort('самый дешевый'))
      dispatch(ticketFilter(filters))
    }
  }, [token, dispatch, ticketList, completeLoading, error])

  useEffect(() => {
    dispatch(ticketSort(tickets.sortParam))
    dispatch(ticketFilter(filters))
  }, [filters, dispatch])

  const moreTickets = (e) => {
    e.preventDefault()
    setListLength(listLength + 5)
  }

  if (filteredList.length > 0) {
    return (
      <>
        <ul className={classes['ticket-list']}>
          {filteredList.map((element, index) =>
            index > listLength ? null : (
              <Ticket price={element.price} carrier={element.carrier} segments={element.segments} key={`${index}`} />
            )
          )}
        </ul>
        <button className={classes['btn']} onClick={(e) => moreTickets(e)}>
          Показать еще 5 билетов
        </button>
      </>
    )
  } else if (completeLoading) {
    return (
      <Alert
        message="Рейсов, подходящих под заданные фильтры, не найдено."
        type="info"
        style={{
          marginTop: '20px',
        }}
      />
    )
  } else {
    return (
      <Spin
        size="large"
        style={{
          marginTop: '20px',
        }}
      />
    )
  }
}
