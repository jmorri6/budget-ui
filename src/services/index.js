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

export function getSpendingReport(txnType, groupByBudget, groupByMonth) {
    let url = "/transactions/getSpendingReport?txnType=" + txnType;

    if (groupByBudget) {
        url = url + "&groupByBudget=true"
    }
    if (groupByMonth) {
        url = url + "&groupByMonth=true"
    }
    return axios.get(baseUrl + url);
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
    let num = parseFloat(number).toFixed(2);
    return parseFloat(num).toLocaleString();
}
export function getFormattedDate(date) {
    let d = new Date(date);
    return d.toLocaleDateString();
};


export function getDateString(date) {
    //05-01-2018 15:01:05.958
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    let year = date.getFullYear();
    let hour = date.getHours().toString();
    let minute = date.getMinutes().toString();
    let seconds = date.getSeconds().toString();
    let ms = date.getMilliseconds().toString();

    return padLeft(month, "0", 2) + "-" + 
           padLeft(day, "0", 2) + "-" + 
           year + " " + 
           padLeft(hour, "0", 2) + ":" + 
           padLeft(minute, "0", 2) + ":" + 
           padLeft(seconds, "0", 2) + ":" + 
           padLeft(ms, "0", 3);
}

function padLeft(string, padChar, length) {
    while (string.length < length) {
        string = padChar + string;
    }
    return string;
}