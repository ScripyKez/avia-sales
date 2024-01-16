import { createSlice } from '@reduxjs/toolkit'

const transferFilterSlice = createSlice({
  name: 'transferFilter',
  initialState: {
    withoutTransfers: true,
    '1transfer': false,
    '2transfers': false,
    '3transfers': false,
    allTransfers: false,
  },
  reducers: {
    checkTransfer(state, action) {
      const { id, value } = action.payload
      const turnAll = (state, value) => {
        for (let key in state) {
          state[key] = value
        }
      }
      const isAllActive = (state) => {
        let flag = true
        for (let key in state) {
          if (!state[key] && key !== 'allTransfers') flag = false
        }
        return flag
      }
      switch (id) {
        case 'allTransfers': {
          if (value) {
            turnAll(state, true)
          } else {
            turnAll(state, false)
          }
          break
        }
        default:
          state[id] = value
          state.allTransfers = false
          if (isAllActive(state)) state.allTransfers = true
          break
      }
    },
  },
})

export const { checkTransfer } = transferFilterSlice.actions

export default transferFilterSlice.reducer
