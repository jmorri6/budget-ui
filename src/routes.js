import React from 'react';
import {Route, IndexRoute, browserHistory} from 'react-router';
import App from './App';
import Main from './scenes/Main';
import Income from './scenes/Income'
import CreateBudget from './scenes/CreateBudget'
import BudgetHistory from './scenes/BudgetHistory'
import ManageIncome from './scenes/ManageIncome'
import ScheduledTransactions from './scenes/ScheduledTransactions'

export default (
    <Route path="/" histroy={browserHistory} component={App}>
        <IndexRoute component={Main} />
        <Route path="/income" component={Income} />
        <Route path="/createbudget" component={CreateBudget} />
        <Route path="/history" component={BudgetHistory} />
        <Route path="/manageIncome" component={ManageIncome} />
        <Route path="/scheduled" component={ScheduledTransactions} />
    </Route>
);