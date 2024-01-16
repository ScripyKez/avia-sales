import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import AviaSalesService from '../../services/aviasalesService'

export const fetchTickets = createAsyncThunk('transferFilter/fetchTickets', async function (id) {
  const aviasalesService = new AviaSalesService()
  const page = await aviasalesService.requestPage(id)
  return page
})

export const requestId = createAsyncThunk('tranferFilter/requestId', async function () {
  const aviasalesService = new AviaSalesService()
  const id = await aviasalesService.requestId()
  return id.searchId
})

const fetchTicketsSlice = createSlice({
  name: 'fetchTickets',
  initialState: {
    ticketList: [],
    filteredList: [],
    loading: true,
    error: false,
    completeLoading: false,
    token: null,
    sortParam: 'самый дешевый',
  },
  reducers: {
    ticketSort: (state, action) => {
      switch (action.payload) {
        case 'самый быстрый':
          state.filteredList = [...JSON.parse(JSON.stringify(state.ticketList))].sort((a, b) => a.duration - b.duration)
          state.sortParam = action.payload
          break
        case 'оптимальный':
          // eslint-disable-next-line no-case-declarations
          let tempArray = [...JSON.parse(JSON.stringify(state.ticketList))].sort((a, b) => a.price - b.price)
          tempArray = tempArray.sort((a, b) => a.duration - b.duration)
          state.filteredList = tempArray
          state.sortParam = action.payload
          break
        default:
          state.filteredList = [...JSON.parse(JSON.stringify(state.ticketList))].sort((a, b) => a.price - b.price)
          state.sortParam = action.payload
      }
    },
    ticketFilter: (state, action) => {
      const checkTransfer = (transfers) => {
        if (action.payload.alltransfers) {
          return true
        }
        if (transfers === 0 && action.payload.withoutTransfers) {
          return true
        }
        if (transfers === 1 && action.payload['1transfer']) {
          return true
        }
        if (transfers === 2 && action.payload['2transfers']) {
          return true
        }
        if (transfers === 3 && action.payload['3transfers']) {
          return true
        }
        return false
      }
      state.filteredList = state.filteredList.filter((element) => checkTransfer(element.segments[0].stops.length))
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.ticketList = [
          ...JSON.parse(JSON.stringify(state.ticketList)),
          ...JSON.parse(JSON.stringify(action.payload.tickets)),
        ]
        state.completeLoading = action.payload.stop
      })
      .addCase(fetchTickets.rejected, (state) => {
        state.error = true
      })
      .addCase(requestId.fulfilled, (state, action) => {
        state.token = action.payload
      })
  },
})

export const { ticketFilter, ticketSort } = fetchTicketsSlice.actions
export default fetchTicketsSlice.reducer
