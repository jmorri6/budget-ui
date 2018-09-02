import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from '@material-ui/core/Grid';
import BalanceCard from './components/BalanceCard';
import TabControl from './components/TabControl';
import { getBalance } from '../../../../services';
import { 
    CREDIT, DEBIT,
    getAvgSpending,
    getAvgIncome,
    getAmountForCurrentMonth,
    getAvgAmountPerBudget,
    getBalancePerBudget,
 } from '../../../../actions/report-actions';

class Reports extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isDialogOpen: false,
            budgetBalance: 0,
            avgIncome: 0
        }
    }
    
    componentWillMount = () => {
        this.getBudgetBalance();
        this.props.getAvgSpending();
        this.props.getAvgIncome();
        this.props.getAmountForCurrentMonth(DEBIT);
        this.props.getAmountForCurrentMonth(CREDIT);
        this.props.getBalancePerBudget();
        this.props.getAvgAmountPerBudget(DEBIT);
        this.props.getAvgAmountPerBudget(CREDIT);
    }

    getBudgetBalance = () => {
        let self = this;
        getBalance()
        .then(function (response) {  
            self.setState({ budgetBalance: response.data });
        });
    }

    render() {

        return(
            <React.Fragment>
                <Grid container>
                    <Grid item xs={2}>
                        <BalanceCard title="Budget Balance" balance={ this.state.budgetBalance } />
                    </Grid>
                    <Grid item xs={3}>
                        <BalanceCard title="Average Monthly Income" balance={ this.props.report.avgIncome } />
                    </Grid>
                    <Grid item xs={3}>
                        <BalanceCard title="Average Monthly Spending" balance={ this.props.report.avgSpending } />
                    </Grid>
                    <Grid item xs={2}>
                        <BalanceCard title="Current Income" balance={ this.props.report.currentMonthIncome } />
                    </Grid>
                    <Grid item xs={2}>
                        <BalanceCard title="Current Spending" balance={ this.props.report.currentMonthSpending } />
                    </Grid>
                </Grid>
                <TabControl />
            </React.Fragment>
        );
    }
}
  

const mapStateToProps = (state) => {
    return {
        report: state.reportState,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAvgSpending,
        getAvgIncome,
        getAmountForCurrentMonth,
        getAvgAmountPerBudget,
        getBalancePerBudget,
    }, dispatch)
  }

export default connect( mapStateToProps, mapDispatchToProps )(Reports)