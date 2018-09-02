import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import BudgetSelection from './components/BudgetSelection';
import BudgetDetails from './components/BudgetDetails';
import { getBudgets } from '../../../../actions/budgets';
import { getAvailableIncome } from '../../../../actions/income';
import { addBudget, editBudget, deleteBudget } from '../../../../services/index';
import styles from './style.jss.js';

class ManageBudget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedBudget: {}
        }
    }

    componentDidMount() {
        this.props.getBudgets();
        this.props.getAvailableIncome();
    }

    budgetChanged = (selectedBudget) => {
        this.setState({ selectedBudget: selectedBudget });
    }

    saveBudget = (payload) => {
        addBudget(payload).then(() => {
            this.props.getBudgets();
            this.props.getAvailableIncome();
        });
    }

    updateBudget = (payload) => {
        editBudget(payload).then(() => {
            this.props.getBudgets();
            this.props.getAvailableIncome();
        });
    }
    deleteBudget = (budgetId) => {
        deleteBudget(budgetId).then(() => {
            this.props.getBudgets();
            this.props.getAvailableIncome();
            this.setState({selectedBudget: {name: '', allocation: '', txnRequireDesc: false, balance: 1, category: {id: -1, name: ''}}});
        });
    }

    render() {
        return(
            <Paper>
                <Grid style={styles.grid} container justify="space-around">
                    <Grid item xs={2}>
                        <BudgetSelection 
                            categories={this.props.categoriesWithBudgets} 
                            onChange={this.budgetChanged}
                            selected={this.state.selectedBudget} />
                    </Grid>
                    <Grid item>
                        <BudgetDetails
                        budget={this.state.selectedBudget}
                        save={this.saveBudget}
                        update={this.updateBudget}
                        delete={this.deleteBudget}
                        />
                    </Grid>
                </Grid>
            </Paper>
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
      getBudgets,
      getAvailableIncome
    }, dispatch)
  }

export default connect( mapStateToProps, mapDispatchToProps )(ManageBudget)