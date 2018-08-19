import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import { addTxn, toNumericString } from '../../../../services/index';
import {CREDIT, DEBIT} from '../../../../services/txn-type'
import { find } from 'lodash';
import BudgetDropDown from '../../../../components/BudgetDropDown';

class ManageIncome extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fromBudget: 0,
            toBudget: 0,
            transferAmount: '',
            amountDisabled: true,
            canTransfer: false
        }
    }
    
    fromBudgetChanged = (event) => {
        if (event.target.value > 0) {
            this.setState({ amountDisabled: false });
        } else {
            this.setState({ amountDisabled: true });
        }
        this.setState({ fromBudget: event.target.value });
        this.updateCanTransfer(event.target.value, this.state.toBudget, this.state.transferAmount);
    }
    toBudgetChanged = (event) => {
        this.setState({ toBudget: event.target.value });
        this.updateCanTransfer(this.state.fromBudget, event.target.value, this.state.transferAmount);
    }

    getBudgetBalance = (id) => {
        let budget = find(this.props.budgets, ['id', id]);
        if (budget) {
            return budget.balance;
        }
        return 0;
    }

    transferAmountChanged = (event) => {
        let value = parseFloat(event.target.value);
        let max = this.getBudgetBalance(this.state.fromBudget);
        if (value >= max) {
            this.setState({ transferAmount: toNumericString(max) });
            this.updateCanTransfer(this.state.fromBudget, this.state.toBudget, max)
        } else {
            this.setState({ transferAmount: toNumericString(value) });
            this.updateCanTransfer(this.state.fromBudget, this.state.toBudget, value)
        }

    }

    updateCanTransfer = (from, to, amount) => {
        if (from  > 0 && to > 0 && amount > 0) {
            this.setState({ canTransfer: true });
        } else {
            this.setState({ canTransfer: false });
        }
    }

    transferFunds = () => {
        this.addTransaction(this.state.fromBudget, this.state.transferAmount, 'transfer', DEBIT)
        this.addTransaction(this.state.toBudget, this.state.transferAmount, 'transfer', CREDIT);
        this.setState({fromBudget: -1, toBudget: -1, transferAmount: '', desc: ''})
    }
    
    addTransaction = (budgetId, amount, desc, txnType) => {
        let balance = this.getBudgetBalance(budgetId);
        let payload = {
            budget: {id: budgetId, balance: balance},
            amount: amount,
            desc: desc || '',
            type: txnType
        }
        addTxn(payload).then(() => {
            //TODO: show success..handle error
        })
    }
    

    render() {
        return(
        <Grid container justify='center' style={{marginTop:'30px'}}>
            <Grid item xs={8}>
                <Paper elevation={5} style={{padding:'20px'}}>
                    <Typography variant="headline" component="h2">Transfer Funds</Typography>
                    <Grid container alignItems='center' justify="space-around" style={{marginTop:'30px'}}>
                        <Grid item xs={4}>
                            <BudgetDropDown
                            label="From Budget"
                            value={this.state.fromBudget}
                            onChange={this.fromBudgetChanged}
                            inputProps={{ id: 'fromBudget' }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <BudgetDropDown
                            label="To Budget"
                            value={this.state.toBudget}
                            onChange={this.toBudgetChanged}
                            inputProps={{ id: 'toBudget' }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl>
                                <InputLabel htmlFor="amount">Amount</InputLabel>
                                <Input
                                margin="dense"
                                id="amount"
                                type="number"
                                fullWidth
                                value={this.state.transferAmount}
                                onChange={this.transferAmountChanged}
                                disabled={this.state.amountDisabled}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid style={{marginTop: 20}} container justify="flex-end">
                        <Button disabled={!this.state.canTransfer} variant="raised" color="primary" onClick={this.transferFunds}>
                            Transfer
                        </Button>
                    </Grid>
                </Paper>
            </Grid> 
        </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        budgets: state.budgets.budgets
    }
}
  
export default connect( mapStateToProps )(ManageIncome)
