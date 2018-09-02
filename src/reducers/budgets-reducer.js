import { GET_WRAPPED_BUDGETS, GET_BUDGETS } from '../actions/budgets.js'

export default function budgetsRetrievedReducer(
    state = {
      wrappedBudgets: [],
      budgets: []
    },
    action
  ) {
    switch (action.type) {
    case GET_WRAPPED_BUDGETS:
      return Object.assign({}, state, {
        wrappedBudgets: action.categories
      })
    case GET_BUDGETS:
      return Object.assign({}, state, { budgets: action.budgets })
    default:
      return state
    }
  }