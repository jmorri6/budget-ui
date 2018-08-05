import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import BudgetCategory from '../BudgetCategory'
import { getBudgets } from '../../../../actions/budgets'

class BudgetList extends Component {

  componentDidMount() {
    this.props.getBudgets()
  }

  render() {
    return(
      <div> 
        {this.props.categoriesWithBudgets.map((category) => (
            <BudgetCategory key={category.categoryName}
             categoryName={category.categoryName}
             budgets={category.budgets}
             refreshBudgets={this.props.getBudgets} xs={12} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categoriesWithBudgets: state.budgets.wrappedBudgets
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getBudgets
  }, dispatch)
}

export default connect( mapStateToProps, mapDispatchToProps )(BudgetList)
