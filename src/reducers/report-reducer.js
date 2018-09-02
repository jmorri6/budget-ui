import { 
    AVG_DEBITS,
    AVG_CREDITS,
    BALANCE_PER_BUDGET,
    CURRENT_MONTH_SPENDING,
    CURRENT_MONTH_INCOME,
    AVG_SPENDING_PER_BUDGET,
    AVG_INCOME_PER_BUDGET,
    TRENDS_RETRIEVED,
    TOP_TRENDS_RETRIEVED,
    BOTTOM_TRENDS_RETRIEVED
 } from '../actions/report-actions.js'

export default function reportReducer(
    state = {
        avgSpending: 0,
        avgIncome: 0,
        currentMonthSpending: 0,
        currentMonthIncome: 0,
        avgSpendingPerBudget: {},
        avgIncomePerBudget: {},
        spendingTrends: {},
        topTrends: {},
        bottomTrends: {}
    },
    action
  ) {
    switch (action.type) {
    case AVG_DEBITS:
      return Object.assign({}, state, {
        avgSpending: action.amount
      });
    case AVG_CREDITS:
    return Object.assign({}, state, {
        avgIncome: action.amount
    });
    case BALANCE_PER_BUDGET:
    return Object.assign({}, state, {
        balancePerBudget: action.data
    });
    case CURRENT_MONTH_SPENDING:
    return Object.assign({}, state, {
        currentMonthSpending: action.amount
    });
    case CURRENT_MONTH_INCOME:
    return Object.assign({}, state, {
        currentMonthIncome: action.amount
    });
    case AVG_SPENDING_PER_BUDGET: 
    return Object.assign({}, state, {
        avgSpendingPerBudget: action.data
    });
    case AVG_INCOME_PER_BUDGET:
    return Object.assign({}, state, {
        avgIncomePerBudget: action.data
    });
    case TRENDS_RETRIEVED:
    return Object.assign({}, state, {
        spendingTrends: action.data
    });
    case TOP_TRENDS_RETRIEVED:
    return Object.assign({}, state, {
        topTrends: action.data
    });
    case BOTTOM_TRENDS_RETRIEVED:
    return Object.assign({}, state, {
        bottomTrends: action.data
    })
    default:
      return state
    }
  }