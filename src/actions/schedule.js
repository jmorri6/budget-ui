import { getAllSchedules } from '../services/index'

export const GET_SCHEDULES = "GET_SCHEDULES"

export function getSchedules() {
    return function(dispatch) {
        getAllSchedules()
        .then(function (response) {  
            console.log(response.data);
            dispatch( {
                type: GET_SCHEDULES,
                schedules: response.data
            });
        })
        .catch(function (error) {
            //TODO: display error
            //dispatch(displayError(error));
        });
    }
}