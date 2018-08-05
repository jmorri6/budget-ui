import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Header from '../../components/Header'
import BudgetList from './components/BudgetList'
import Notes from './components/Notes'
import { getBudgetBalance } from '../../actions/budgets';
import { getAllCategories } from '../../actions/categories';
import { getAvailableIncome } from '../../actions/income'
import { toNumericString } from '../../services/index'

class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showNotes: false
    }
  }

  componentDidMount() {
    this.props.getBudgetBalance();
    this.props.getAllCategories();
    this.props.getAvailableIncome();
  }

  showNotes = () => {
    this.setState({ showNotes: true });
  }

  hideNotes = () => {
      this.setState({ showNotes: false });
  }

  render() {
    return(
      <div>
        <Header title="Morris Budget" showNotes={this.showNotes} nbrOfNotes={3}/>
        <BudgetList />
        <div style={{margin:'20px'}}>Budget balance: ${toNumericString(this.props.balance) || 0}</div>
        <Notes isOpen={this.state.showNotes} close={this.hideNotes} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      balance: state.budgets.balance
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getBudgetBalance,
    getAllCategories,
    getAvailableIncome
  }, dispatch)
}

export default connect( mapStateToProps, mapDispatchToProps )(Main)
