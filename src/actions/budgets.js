import { findIndex } from 'lodash'
import { getAllBudgets, getBalance } from '../services/index';

export const GET_WRAPPED_BUDGETS = 'GET_WRAPPED_BUDGETS'
export const GET_BALANCE = 'GET_BALANCE'
export const GET_BUDGETS = 'GET_BUDGETS'

export function getBudgets() {
    return function(dispatch) {
        getAllBudgets()
        .then(function (response) {  
            dispatch(getWrappedBudgets(response));
            dispatch(budgetsRetrieved(response));
        })
        .catch(function (error) {
            console.error(error);
        });
    }
};

function getWrappedBudgets(response) {
    const categories = [];

    response.data.map((budget) => {
        let idx = findIndex(categories, function(c) { return c.categoryName === budget.category.name });
        if (idx !== -1) {
            categories[idx].budgets.push(budget);
        } else {
            categories.push({categoryName: budget.category.name, budgets:[budget]});
        }
    });

    return {
        type: GET_WRAPPED_BUDGETS,
        categories: categories
    }
}

function budgetsRetrieved(response) {
    return {
        type: GET_BUDGETS,
        budgets: response.data
    }
}

export function getBudgetBalance() {
    return function(dispatch) {
        getBalance()
        .then(function (response) {  
            dispatch( {
                type: GET_BALANCE,
                balance: response.data
            });
        })
        .catch(function (error) {
            //TODO: DISPLAY error
            //dispatch(displayError(error));
        });
    }
}

