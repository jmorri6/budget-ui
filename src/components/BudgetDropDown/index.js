import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

class BudgetDropDown extends Component {
  render() {
    return(<Select
        value={this.props.value}
        onChange={this.props.onChange}
        inputProps={this.props.inputProps}
        style={{width:'100px'}}
        >
            {this.props.budgets.map((budget) => (
                <MenuItem key={budget.id} value={budget.id}>{budget.name}</MenuItem>
            ))}
        </Select>
    )
  }
}


const mapStateToProps = (state) => {
    return {
        budgets: state.budgets.budgets
    }
}
  
export default connect( mapStateToProps )(BudgetDropDown)
