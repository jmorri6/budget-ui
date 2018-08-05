import { GET_ALL_INCOME, GET_AVAILABLE_INCOME } from '../actions/income.js'

export default function incomeReducer(
    state = {
        allIncomes: [],
        available: 0,
    },
    action
  ) {
    switch (action.type) {
    case GET_ALL_INCOME:
      return Object.assign({}, state, {
        allIncomes: action.incomes
      })
    case GET_AVAILABLE_INCOME:
      return Object.assign({}, state, { available: action.available})
    default:
      return state
    }
  }