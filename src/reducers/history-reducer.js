import { GET_HISTORY, GET_HISTORY_SUCCESS } from '../actions/get-history'

export default function historyReducer(
    state = {
      inProgress: false,
      history: []
    },
    action
  ) {
    switch (action.type) {
    case GET_HISTORY:
      return Object.assign({}, state, {
        inProgress: true
      })
    case GET_HISTORY_SUCCESS:
      return Object.assign({}, state, { 
          inProgress: false,
          history: action.history
        })
    default:
      return state
    }
  }