import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'

import transferFilterReducer from './transferFilterSlice'
import TicketListReducer from './fetchTicketsSlice'

export default configureStore(
  {
    reducer: {
      transferFilterList: transferFilterReducer,
      ticketList: TicketListReducer,
    },
  },
  composeWithDevTools(applyMiddleware(thunk))
)
