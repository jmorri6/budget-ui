import axios from 'axios'

let baseUrl = 'http://192.168.1.5:8080/budget-server';

export function addBudget(payload) {
    return axios.post(baseUrl + '/budgets', payload);
}

export function editBudget(payload) {
    return axios.post(baseUrl + "/budgets/" + payload.id, payload)
}

export function deleteBudget(id) {
    return axios.get(baseUrl + "/budgets/" + id);
}

export function getAllIncome() {
    return axios.get(baseUrl + '/income');
}

export function getUnallocatedIncome() {
    return axios.get(baseUrl + "/income/unallocated");
}

export function addIncome(payload) {
    return axios.post(baseUrl + "/income", payload);
}

//delete request wouldn't work?  cross domain issue
export function deleteIncome(id) {
    return axios.get(baseUrl + "/income/" + id);
}

export function getCategories() {
    return axios.get(baseUrl + '/categories');
}

export function getAllBudgets() {
    return axios.get(baseUrl + '/budgets');
}

export function getBalance() {
    return axios.get(baseUrl + "/budgets/balance");
}

export function addTxn(payload) {
    return axios.post(baseUrl + "/transactions", payload);
}

export function searchTransactionsByDate(payload) {
    return axios.post(baseUrl + "/transactions/history", payload);
}

export function getAllSchedules() {
    return axios.get(baseUrl + "/schedules");
}

export function deleteSchedule(id) {
    return axios.get(baseUrl + "/schedules/" + id);
}

export function addSchedule(payload) {
    return axios.post(baseUrl + "/schedules", payload);
}

export function toNumericString(number) {
    return parseFloat(number).toFixed(2);
}
export function getFormattedDate(date) {
    let d = new Date(date);
    return d.toLocaleDateString();
};