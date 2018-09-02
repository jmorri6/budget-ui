import { 
    getSpendingReport, 
    searchTransactionsByDate,
    getDateString,
    getAllBudgets,
} from '../services/index'

export const AVG_DEBITS = "AVG_DEBITS";
export const AVG_CREDITS = "AVG_CREDITS";
export const BALANCE_PER_BUDGET = "BALANCE_PER_BUDGET";
export const CURRENT_MONTH_SPENDING = "CURRENT_MONTH_SPENDING";
export const CURRENT_MONTH_INCOME = "CURRENT_MONTH_INCOME";
export const AVG_SPENDING_PER_BUDGET = "AVG_SPENDING_PER_BUDGET";
export const AVG_INCOME_PER_BUDGET = "AVG_INCOME_PER_BUDGET";
export const TRENDS_RETRIEVED = "TRENDS_RETRIEVED";
export const TOP_TRENDS_RETRIEVED = "TOP_TRENDS_RETRIEVED";
export const BOTTOM_TRENDS_RETRIEVED = "BOTTOM_TRENDS_RETRIEVED";

export const CREDIT = 1;
export const DEBIT = 2;

var colors = {};

export function getAvgSpending() {
    return function(dispatch) {
        getSpendingReport(DEBIT)
        .then(function (response) {  
            dispatch(avgSpendingRetrieved(response));
        });
    }
}

export function getAvgIncome() {
    return function(dispatch) {
        getSpendingReport(CREDIT)
        .then(function(response) {
            dispatch(avgCreditRetrieved(response));
        });
    }
}

export function getAmountForCurrentMonth(txnType) {
    return function (dispatch) {
        let date = getCurrentMonth();
        let payload = {
            txnType: txnType,
            fromDate: date.fromDate,
            toDate: date.toDate
        }
        searchTransactionsByDate(payload)
        .then(function (response) {
            let amount = 0;
            if (response && response.data && response.data.length > 0) {

                amount = response.data.reduce((acc, budget) => {
                    acc += budget.amount;
                    return acc;
                }, 0);
            }
            
            if (txnType === DEBIT) {
                dispatch(currentMonthSpendingRetrieved(amount));
            } else if (txnType === CREDIT) {
                dispatch(currentMonthIncomeRetrieved(amount));
            }
        });
    }
}

export function getTrends() {
    return function(dispatch) {
        //get avg per budget, then split them for top, middle, and bottom
        getSpendingReport(DEBIT, true, false)
        .then(function(response) {
            let sorted = sortTransactions(response.data).map((budget) => {
                return budget.budgetName;
            });

            let top = sorted.slice(0, 10);
            let middle = sorted.slice(10, sorted.length - 10);
            let bottom = sorted.slice(sorted.length - 10);

            //now get the actual trends and split them up
            getSpendingReport(DEBIT, true, true)
            .then(function(response) {
                if (response.data) {
                    let topData = {labels: [], datasets: []};
                    let midData = {labels: [], datasets: []};
                    let bottomData = {labels: [], datasets: []};
    
                    topData.labels = response.data.months;
                    midData.labels = response.data.months;
                    bottomData.labels = response.data.months;
    
                    response.data.budgetAmounts.forEach((budget) => {
                        let color = getColorForBudget(budget.name);
                        let data = { label: budget.name, data: budget.amounts,       
                            fill: false,
                            lineTension: 0.1,
                            borderColor: color,
                            borderJoinStyle: 'miter',
                            pointBorderColor: color,
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: color,
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10
                        };
    
                        if (top.find((b) => { return b === budget.name} )) {
                            topData.datasets.push(data);
                        } else if( middle.find((b) => { return b === budget.name} )) {
                            midData.datasets.push(data);
                        } else if( bottom.find((b) => { return b === budget.name} )) {
                            bottomData.datasets.push(data);
                        } 
                    });
    
                    dispatch(topTrendsRetrieved(topData));
                    dispatch(trendsRetrieved(midData));
                    dispatch(bottomTrendsRetrieved(bottomData));
                }
            });
            
        });
        getSpendingReport(DEBIT, true, true)
        .then(function(response) {
            if (response.data) {
                let dataSet = {labels: [], datasets: []}

                response.data.months.forEach((month) => {
                    dataSet.labels.push(month);
                });

                response.data.budgetAmounts.forEach((budget) => {
                    let color = getColorForBudget(budget.name);
                    let data = { label: budget.name, data: budget.amounts,       
                        fill: false,
                        lineTension: 0.1,
                        borderColor: color,
                        borderJoinStyle: 'miter',
                        pointBorderColor: color,
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: color,
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10
                    };

                    dataSet.datasets.push(data);
                });

                dispatch(trendsRetrieved(dataSet));
            }
        });
    }
}

export function getAvgAmountPerBudget(txnType) {
    return function(dispatch) {
        getSpendingReport(txnType, true, false)
        .then(function(response) {
            if (response.data && response.data.length > 0) {
                let dataSet = getEmptyDataSet();
                let budgets = sortTransactions(response.data);
                budgets.forEach(function(budget) {
                    if (budget.amount && budget.amount > 0) {
                        dataSet.labels.push(budget.budgetName);
                        dataSet.datasets[0].data.push(budget.amount);
                        dataSet.datasets[0].backgroundColor.push(getColorForBudget(budget.budgetName));
                        dataSet.datasets[0].hoverBackgroundColor.push(getColorForBudget(budget.budgetName));
                    }
                });

                if (txnType === DEBIT) {
                    dispatch(avgSpendingPerBudgetRetrieved(dataSet));
                } else if (txnType === CREDIT) {
                    dispatch(avgIncomePerBudgetRetrieved(dataSet));
                } 
            }
        });
    }
}

export function getBalancePerBudget() {
    return function(dispatch) {
        let dataSet = getEmptyDataSet();
        getAllBudgets()
        .then(function(response) {
            if (response.data && response.data.length > 0) {
                let budgets = sortBudgets(response.data);
                budgets.forEach(function(budget) {
                    dataSet.labels.push(budget.name);
                    dataSet.datasets[0].data.push(budget.balance);
                    dataSet.datasets[0].backgroundColor.push(getColorForBudget(budget.name));
                    dataSet.datasets[0].hoverBackgroundColor.push(getColorForBudget(budget.name));
                });
                dispatch(balancePerBudgetRetrieved(dataSet));
            }
        });
    }
}

function getEmptyDataSet() {
    return { labels: [], datasets: [{data:[], backgroundColor:[], hoverBackgroundColor:[]}]};
}

function sortTransactions(transactions) {
    return transactions.sort(((a, b) => {
        if (a.amount > b.amount) {
            return -1;
        } else if (a.amount < b.amount) {
            return 1;
        }
        return 0;
    }));
}

function sortBudgets(budgets) {
    return budgets.sort(((a,b) => {
        if (a.balance > b.balance) {
            return -1;
        } else if (a.balance < b.balance) {
            return 1;
        }
        return 0;
    }));
}

function getCurrentMonth() {
    let date = new Date();
    date.setHours(23,59,59,999);

    return {
        fromDate: getDateString(new Date(date.getFullYear(), date.getMonth(), 1)),
        toDate: getDateString(date)
    };
}

function getColorForBudget(budgetName) {
    
    if (colors[budgetName] !== undefined) {
        return colors[budgetName];
    }
    
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    colors[budgetName] = "#" + randomColor;
    return randomColor;
}

function avgSpendingRetrieved(response) {
    return {
        type: AVG_DEBITS,
        amount: response.data[0].amount
    }
}

function avgCreditRetrieved(response) {
    return {
        type: AVG_CREDITS,
        amount: response.data[0].amount
    }
}

function currentMonthSpendingRetrieved(amount) {
    return {
        type: CURRENT_MONTH_SPENDING,
        amount: amount
    }
}

function currentMonthIncomeRetrieved(amount) {
    return {
        type: CURRENT_MONTH_INCOME,
        amount: amount
    }
}

function balancePerBudgetRetrieved(data) {
    return {
        type: BALANCE_PER_BUDGET,
        data: data
    }
}

function avgSpendingPerBudgetRetrieved(data) {
    return {
        type: AVG_SPENDING_PER_BUDGET,
        data: data
    }
}

function avgIncomePerBudgetRetrieved(data) {
    return {
        type: AVG_INCOME_PER_BUDGET,
        data: data
    }
}

function topTrendsRetrieved(data) {
    return {
        type: TOP_TRENDS_RETRIEVED,
        data: data
    }
}

function trendsRetrieved(data) {
    return {
        type: TRENDS_RETRIEVED,
        data: data
    }
}

function bottomTrendsRetrieved(data) {
    return {
        type: BOTTOM_TRENDS_RETRIEVED,
        data: data
    }
}