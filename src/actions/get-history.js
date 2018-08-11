import { searchTransactionsByDate } from '../services/index';

export const GET_HISTORY = 'GET_HISTORY'
export const GET_HISTORY_SUCCESS = 'GET_HISTORY_SUCCESS'


export function getHistory(fromDate, toDate, budgetId) {
    return function(dispatch) {
        //yyyy-mm-dd -> MM-dd-yyyy HH:mm:ss.SSS
        let convertedFrom = fromDate.substring(5, 7) + "-" + fromDate.substring(8) + "-" + fromDate.substring(0,4) + " 00:00:00.000";
        let convertedTo = toDate.substring(5, 7) + "-" + toDate.substring(8) + "-" + toDate.substring(0,4) + " 23:59:59.999";
        let payload = {
            fromDate: convertedFrom,
            toDate: convertedTo,
            budgetId: budgetId
        }
        searchTransactionsByDate(payload)
        .then(function (response) {  
            dispatch(transactionsReceived(response));
        })
        .catch(function (error) {
            console.error(error);
        });
    }
};

function transactionsReceived(response) {
    return {
        type: GET_HISTORY_SUCCESS,
        transactions: response.data
    }
};