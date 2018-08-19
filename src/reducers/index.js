import { combineReducers } from 'redux';
import categoriesReducer from './categories-reducer';
import budgetsReducer from './budgets-reducer';
import incomeReducer from './income-reducer';
import historyReducer from './history-reducer';
import scheduleReducer from './schedule-reducer';
import activeViewReducer from './active-view-reducer';


const rootReducer = combineReducers({
  categories: categoriesReducer,
  budgets: budgetsReducer,
  incomes: incomeReducer,
  history: historyReducer,
  schedules: scheduleReducer,
  viewState: activeViewReducer,
})
  
export default rootReducer