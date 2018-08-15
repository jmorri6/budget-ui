import { RESET_HISTORY, GET_HISTORY_SUCCESS } from '../actions/get-history'

export default function historyReducer(
    state = {
      transactions: []
    },
    action
  ) {
    switch (action.type) {
    case RESET_HISTORY:
      return Object.assign({}, state, {
        transactions: []
      })
    case GET_HISTORY_SUCCESS:
      return Object.assign({}, state, { 
          transactions: action.transactions
        })
    default:
      return state
    }
  }