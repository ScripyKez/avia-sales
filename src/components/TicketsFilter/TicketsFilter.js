import React from 'react'

import Button from '../Button/Button'

import classes from './TicketsFilter.module.scss'

const TicketFilter = () => {
  return (
    <div className={classes['ticket-filter']}>
      <Button label={'самый дешевый'} />
      <Button label={'самый быстрый'} />
      <Button label={'оптимальный'} />
    </div>
  )
}

export default TicketFilter
