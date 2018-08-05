import { getAllIncome, getUnallocatedIncome } from '../services/index'

export const GET_AVAILABLE_INCOME = "GET_AVAILABLE_INCOME"
export const GET_ALL_INCOME = "GET_ALL_INCOME"

export function getIncomes() {
    return function(dispatch) {
        getAllIncome()
        .then(function (response) {  
            dispatch( {
                type: GET_ALL_INCOME,
                incomes: response.data
            });
        })
        .catch(function (error) {
            //TODO: display error
            //dispatch(displayError(error));
        });
    }
}

export function getAvailableIncome() {
    return function(dispatch) {
        getUnallocatedIncome()
        .then(function (response) {  
            dispatch( {
                type: GET_AVAILABLE_INCOME,
                available: response.data
            })
        })
        .catch(function (error) {
            //TODO: display error
            //dispatch(displayError(error));
        });
    }

}