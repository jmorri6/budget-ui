import { GET_WRAPPED_BUDGETS, GET_BALANCE, GET_BUDGETS } from '../actions/budgets.js'

export default function budgetsRetrievedReducer(
    state = {
      wrappedBudgets: [],
      balance: 0,
      budgets: []
    },
    action
  ) {
    switch (action.type) {
    case GET_WRAPPED_BUDGETS:
      return Object.assign({}, state, {
        wrappedBudgets: action.categories
      })
    case GET_BALANCE:
      return Object.assign({}, state, { balance: action.balance })
    case GET_BUDGETS:
      return Object.assign({}, state, { budgets: action.budgets })
    default:
      return state
    }
  }