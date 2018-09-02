import { findIndex } from 'lodash'
import { getAllBudgets } from '../services/index';

export const GET_WRAPPED_BUDGETS = 'GET_WRAPPED_BUDGETS'
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
    let categories = [];
    
    response.data.forEach((budget) => {
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

