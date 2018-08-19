import { UPDATE_VIEW } from '../actions/active-view-state.js'

export default function activeViewReducer(
    state = {
        active: 0
    },
    action
  ) {
    switch (action.type) {
    case UPDATE_VIEW:
      return Object.assign({}, state, {
          active: action.active
      })
    default:
      return state
    }
  }