import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import Typography from 'material-ui/Typography';
import { addTxn } from '../../services/index';
import {CREDIT, DEBIT} from '../../services/txn-type'
import { find } from 'lodash';
import BudgetDropDown from '../../components/BudgetDropDown';

//TODO: convert drop downs to auto complete
class ManageIncome extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedBudget: -1,
            addAmount: '',
            fromBudget: -1,
            toBudget: -1,
            transferAmount: '',
            amountDisabled: true,
            desc: '',
            canAdd: false,
            canTransfer: false
        }
    }

    budgetChanged = (event) => {
        this.setState({ selectedBudget: event.target.value });
        this.updateCanAdd(event.target.value, this.state.amount);
    }
    addAmountChanged = (event) => {
        let value = parseFloat(event.target.value)
        this.setState({ addAmount: value });
        this.updateCanAdd(this.state.selectedBudget, event.target.value);
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
            this.setState({ transferAmount: max });
            this.updateCanTransfer(this.state.fromBudget, this.state.toBudget, max)
        } else {
            this.setState({ transferAmount: value });
            this.updateCanTransfer(this.state.fromBudget, this.state.toBudget, value)
        }

    }
    descChanged = (event) => {
        this.setState({ desc: event.target.value});
    }

    updateCanAdd = (budget, amount) => {
        if (budget > 0 && amount > 0) {
            this.setState({ canAdd: true});
        } else {
            this.setState({ canAdd: false })
        }
    }

    updateCanTransfer = (from, to, amount) => {
        if (from  > 0 && to > 0 && amount > 0) {
            this.setState({ canTransfer: true });
        } else {
            this.setState({ canTransfer: false });
        }
    }

    addFunds = () => {
        this.addTransaction(this.state.selectedBudget, this.state.addAmount, this.state.desc, CREDIT);
        this.setState({selectedBudget: -1, addAmount: '', desc: ''})
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
        <div>
            <Header title="Manage Funds" />
            <Grid container justify='center' style={{marginTop:'30px'}}>
                <Grid item xs={8}>
                    <Paper elevation={5} style={{padding:'20px'}}>
                        <Typography variant="headline" component="h2">Add Funds</Typography>
                        <Grid container justify="center" style={{marginTop:'30px'}}>
                            <Grid item xs={4}>
                                <FormControl>
                                    <InputLabel htmlFor="budget">Budget</InputLabel>
                                    <BudgetDropDown
                                    value={this.state.selectedBudget}
                                    onChange={this.budgetChanged}
                                    inputProps={{ id: 'budget' }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl>
                                    <InputLabel htmlFor="amount">Amount</InputLabel>
                                    <Input
                                    margin="dense"
                                    id="amount"
                                    type="number"
                                    fullWidth
                                    value={this.state.addAmount}
                                    onChange={this.addAmountChanged}
                                    disabled={this.state.selectedBudget <= 0}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl>
                                    <InputLabel htmlFor="description">Description</InputLabel>
                                    <Input
                                    margin="dense"
                                    id="description"
                                    fullWidth
                                    onChange={this.descChange}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container justify="flex-end">
                            <Button disabled={!this.state.canAdd} variant="raised" color="primary" onClick={this.addFunds}>
                                Add
                            </Button>
                        </Grid>
                    </Paper>
                </Grid> 
            </Grid>
            <Grid container justify='center' style={{marginTop:'30px'}}>
                <Grid item xs={8}>
                    <Paper elevation={5} style={{padding:'20px'}}>
                        <Typography variant="headline" component="h2">Transfer Funds</Typography>
                        <Grid container alignItems='center' justify="space-around" style={{marginTop:'30px'}}>
                            <Grid item xs={4}>
                                <FormControl>
                                    <InputLabel htmlFor="fromBudget" style={{width:'100px'}}>From Budget</InputLabel>
                                    <BudgetDropDown
                                    value={this.state.fromBudget}
                                    onChange={this.fromBudgetChanged}
                                    inputProps={{ id: 'fromBudget' }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl>
                                    <InputLabel htmlFor="toBudget" style={{width:'100px'}}>To Budget</InputLabel>
                                    <BudgetDropDown
                                    value={this.state.toBudget}
                                    onChange={this.toBudgetChanged}
                                    inputProps={{ id: 'toBudget' }}
                                    />
                                </FormControl>
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
                        <Grid container justify="flex-end">
                            <Button disabled={!this.state.canTransfer} variant="raised" color="primary" onClick={this.transferFunds}>
                                Transfer
                            </Button>
                        </Grid>
                    </Paper>
                </Grid> 
            </Grid>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        budgets: state.budgets.budgets
    }
}
  
export default connect( mapStateToProps )(ManageIncome)
