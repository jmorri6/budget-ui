import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import { addTxn } from '../../../../services/index';
import {CREDIT} from '../../../../services/txn-type'
import { find } from 'lodash';
import BudgetDropDown from '../../../../components/BudgetDropDown';

class ManageIncome extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedBudget: 0,
            addAmount: '',
            amountDisabled: true,
            desc: '',
            canAdd: false,
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

    getBudgetBalance = (id) => {
        let budget = find(this.props.budgets, ['id', id]);
        if (budget) {
            return budget.balance;
        }
        return 0;
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

    addFunds = () => {
        this.addTransaction(this.state.selectedBudget, this.state.addAmount, this.state.desc, CREDIT);
        this.setState({selectedBudget: -1, addAmount: '', desc: ''})
        this.setState({ canAdd: false });
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
        <Grid container justify='center'>
            <Grid item xs={8}>
                <Paper elevation={5} style={{padding:'20px'}}>
                    <Typography variant="headline" component="h2">Add Funds</Typography>
                    <Grid container justify="center" style={{marginTop:'30px'}}>
                        <Grid item xs={4}>
                            <FormControl>
                                <BudgetDropDown
                                label="Budget"
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
                                value={this.state.desc}
                                onChange={this.descChanged}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid style={{ marginTop: 20 }} container justify="flex-end">
                        <Button disabled={!this.state.canAdd} variant="raised" color="primary" onClick={this.addFunds}>
                            Add
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
