import React from 'react'
import { format } from 'date-fns'

import TicketClasses from './Ticket.module.scss'

const Ticket = ({ price, carrier, segments }) => {
  return (
    <li className={TicketClasses.ticket}>
      <div className={TicketClasses.ticket__price}>{price} Р</div>
      <img className={TicketClasses.ticket__logo} alt="airline logo" src={`http://pics.avs.io/110/36/${carrier}.png`} />
      <DescriptionRow>{segments[0]}</DescriptionRow>
      <DescriptionRow>{segments[1]}</DescriptionRow>
    </li>
  )
}

const DescriptionRow = (props) => {
  const localizer = (count) => {
    switch (count) {
      case 0:
        return 'пересадок'
      case 1:
        return 'пересадка'
      default:
        return 'пересадки'
    }
  }
  const convertDuration = (time) => time * 60 * 1000
  const { origin, destination, date, duration, stops } = props.children
  const time = new Date(date)

  return (
    <>
      <TicketDescription
        headline={`${origin} - ${destination}`}
        text={`${format(time.getTime(), 'HH:mm')} - ${format(time.getTime() + convertDuration(duration), 'HH:mm')}`}
      />
      <TicketDescription headline="В пути" text={format(convertDuration(duration), 'HHч mmм')} />
      <TicketDescription headline={`${stops.length} ${localizer(stops.length)}`} text={stops.join(', ')} />
    </>
  )
}

const TicketDescription = ({ headline, text }) => {
  return (
    <div className={TicketClasses['ticket__description']}>
      <h2 className={TicketClasses['ticket__description--headline']}>{headline}</h2>
      <p className={TicketClasses['ticket__description--text']}>{text}</p>
    </div>
  )
}

export default Ticket
