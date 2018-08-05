import { GET_SCHEDULES } from '../actions/schedule.js'

export default function scheduleReducer(
    state = {
        schedules: []
    },
    action
  ) {
    switch (action.type) {
    case GET_SCHEDULES:
      return Object.assign({}, state, {
        schedules: action.schedules
      })
    default:
      return state
    }
  }