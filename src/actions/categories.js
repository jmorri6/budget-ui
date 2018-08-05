import { displayError } from './errors';
import { getCategories } from '../services/index'

export const CATEGORIES_RETRIEVED = "CATEGORIES_RETRIEVED"

export function getAllCategories() {
    return function(dispatch) {
        getCategories()
        .then(function (response) {  
            dispatch(categoriesRetrieved(response));
        })
        .catch(function (error) {
            //TODO: DISPLAY ERROR
            dispatch(displayError(error));
        });
    }
}

function categoriesRetrieved(response) {
    return {
        type: CATEGORIES_RETRIEVED,
        categories: response.data
    }
}