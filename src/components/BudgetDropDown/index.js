import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

class BudgetDropDown extends Component {

  render() {
    return(
        <FormControl>
            <InputLabel htmlFor="budget" style={{width:'100px'}}>{this.props.label}</InputLabel>
            <Select
            value={this.props.value}
            onChange={this.props.onChange}
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
    )
  }
}


const mapStateToProps = (state) => {
    return {
        budgets: state.budgets.budgets
    }
}
  
export default connect( mapStateToProps )(BudgetDropDown)
