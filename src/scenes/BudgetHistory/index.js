import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Header from '../../components/Header'
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import { toNumericString } from '../../services';
import { getHistory } from '../../actions/get-history';


//used for budget drop down
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  }
}

class BudgetHistory extends Component {

    constructor(props) {
        super(props)
        this.state = {
            toDate: this.getDefaultToDate(),
            fromDate: this.getDefaultFromDate(),
            selectedBudget: 0,
            hasErrors: false
        }
    }

    getDefaultToDate = () => {
        var local = new Date();
        var month = local.getMonth() + 1;
        var day = local.getDate();
        var year = local.getFullYear();

        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;

        return year + "-" + month + "-" + day;     
    }

    getDefaultFromDate = () => {
        var local = new Date();
        var month = local.getMonth() + 1;
        var year = local.getFullYear();
        if (month < 10) month = "0" + month;

        return year + "-" + month + "-01";     
    }

    budgetChanged = (event) => {
        this.setState({ selectedBudget: event.target.value });
    }

    fromChanged = (event) => {
        if (event.target.value > this.state.toDate) {
            this.setState({hasErrors: true});
        } else {
            this.setState({hasErrors: false});
        }
        this.setState({fromDate: event.target.value});
    }

    toChanged = (event) => {
        if (event.target.value < this.state.fromDate) {
            this.setState({hasErrors: true});
        } else {
            this.setState({hasErrors: false});
        }
        this.setState({toDate: event.target.value});
    }

    search = () => {
        this.props.getHistory(this.state.fromDate, this.state.toDate, this.state.selectedBudget);
    }

    render() {
        return(
        <div>
            <Header title="History" />
            <Grid container justify='center' style={{marginTop:'30px'}}>
                <Grid item xs={10}>
                    <Paper style={{padding:'15px'}}>
                        <Grid container justify='space-around' style={{marginBottom:'30px'}}>
                            <TextField
                                id="from"
                                label="From"
                                type="date"
                                defaultValue={this.getDefaultFromDate()}
                                InputLabelProps={{ shrink: true }}
                                onChange={this.fromChanged}
                            />
                            <TextField
                                id="to"
                                label="To"
                                type="date"
                                defaultValue={this.getDefaultToDate()}
                                InputLabelProps={{ shrink: true }}
                                onChange={this.toChanged}
                            />
                            <FormControl>
                                <InputLabel htmlFor="budget">Budget</InputLabel>
                                <Select
                                value={this.state.selectedBudget}
                                onChange={this.budgetChanged}
                                inputProps={{ id: 'budget' }}
                                >
                                <MenuItem key={0} value={0}>-- Select --</MenuItem>
                                {this.props.budgets.map((budget) => {
                                    return (
                                    <MenuItem key={budget.id} value={budget.id}>{budget.name}</MenuItem>
                                    )
                                })}
                                </Select>
                            </FormControl>
                            <FormControl style={{marginTop:'15px'}}>
                                <Button color="primary" variant="raised" onClick={this.search} disabled={this.state.hasErrors} >
                                    Search
                                </Button>
                            </FormControl>
                        </Grid>
                        <Grid container justify='space-around'>
                            <Table>
                                <TableHead>
                                <TableRow>
                                    <TableCell>Budget</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell numeric>Amount</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Date</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {this.props.transactions.map(n => {
                                    let formatted = n.created.substring(4, 6) + "-" 
                                    + n.created.substring(6,8) + "-" + n.created.substring(0,4)
                                    return (
                                    <TableRow key={n.id}>
                                        <TableCell>{n.budget.name}</TableCell>
                                        <TableCell>{n.desc}</TableCell>
                                        <TableCell numeric>{toNumericString(n.amount)}</TableCell>
                                        <TableCell>{n.type}</TableCell>
                                        <TableCell>{formatted}</TableCell>
                                    </TableRow>
                                    );
                                })}
                                </TableBody>
                            </Table>
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
        budgets: state.budgets.budgets,
        transactions: state.history.transactions
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getHistory
    }, dispatch)
  }
  
  export default connect( mapStateToProps, mapDispatchToProps )(BudgetHistory)
