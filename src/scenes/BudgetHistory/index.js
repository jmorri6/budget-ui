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
            selectedBudget: -1
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
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            <TextField
                                id="to"
                                label="To"
                                type="date"
                                defaultValue={this.getDefaultToDate()}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            <FormControl>
                                <InputLabel htmlFor="budget">Budget</InputLabel>
                                <Select
                                value={this.state.selectedBudget}
                                onChange={this.budgetChanged}
                                inputProps={{ id: 'budget' }}
                                >
                                {this.props.budgets.map((budget) => (
                                    <MenuItem key={budget.id} value={budget.id}>{budget.name}</MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                            <FormControl style={{marginTop:'15px'}}>
                                <Button color="primary" variant="raised" onClick={this.search} disabled={this.state.hasErrors || this.props.history.inProgress} >
                                    Search
                                </Button>
                            </FormControl>
                        </Grid>
                        <Grid container justify='space-around'>
                            <Table>
                                <TableHead>
                                <TableRow>
                                    <TableCell>Transaction Type</TableCell>
                                    <TableCell numeric>Amount</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Date</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {this.props.history.history.map(n => {
                                    return (
                                    <TableRow key={n.id}>
                                        <TableCell>{n.type}</TableCell>
                                        <TableCell numeric>{toNumericString(n.amount)}</TableCell>
                                        <TableCell>{n.description}</TableCell>
                                        <TableCell>{n.date}</TableCell>
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
        history: state.history
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getHistory
    }, dispatch)
  }
  
  export default connect( mapStateToProps, mapDispatchToProps )(BudgetHistory)
