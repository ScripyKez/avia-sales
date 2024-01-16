import React from 'react'
import { useSelector, Provider } from 'react-redux'

import store from '../store'
import TicketFilter from '../TicketsFilter'
import Aside from '../Aside'
import TicketList from '../TicketsList/'
import { ReactComponent as Logo } from '../../assets/img/Logo.svg'

import classes from './App.module.scss'

export default function App() {
  return (
    <>
      <Provider store={store}>
        <header className={classes.logo}>
          <a href="#">
            <Logo alt="logo" />
          </a>
        </header>
        <main className={classes.main}>
          <Loader />
          <TicketFilter />
          <Aside />
          <TicketList />
        </main>
      </Provider>
    </>
  )
}

const Loader = () => {
  const tickets = useSelector((state) => state.ticketList)
  const visible = () => (tickets.completeLoading ? 'none' : 'block')
  return (
    <div
      className={classes.loading}
      style={{
        transform: `scaleX(${(tickets.ticketList.length / 7229) * 100}%)`,
        display: visible(),
      }}
    />
  )
}
