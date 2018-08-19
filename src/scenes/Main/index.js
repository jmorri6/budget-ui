import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBudgetBalance } from '../../actions/budgets';
import { getAllCategories } from '../../actions/categories';
import { getAvailableIncome } from '../../actions/income';
import Header from './components/Header';
import NavMenu from './components/NavMenu';
import BudgetList from './components/BudgetList';
import ManageIncome from './components/ManageIncome';
import ManageBudget from './components/ManageBudget';
import TransferFunds from './components/TransferFunds';
import AddFunds from './components/AddFunds';
import styles from './main.jss.js';

class Main extends Component {

  componentDidMount() {
    this.props.getBudgetBalance();
    this.props.getAllCategories();
    this.props.getAvailableIncome();
  }

  render() {
    return (
      <div style={styles.root}>
        <Header />
        <NavMenu />
        <main style={styles.content}>
          {this.props.activeView === 0 && <BudgetList />}
          {/* {this.props.activeView === 1 && <Reports />} */}
          {this.props.activeView === 2 && <ManageBudget />}
          {this.props.activeView === 3 && <TransferFunds />}
          {this.props.activeView === 4 && <AddFunds />}
          {this.props.activeView === 5 && <ManageIncome />}
          {/* {this.props.activeView === 6 && <AutoDebits />} */}
          
        </main>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
      balance: state.budgets.balance,
      activeView: state.viewState.active
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
