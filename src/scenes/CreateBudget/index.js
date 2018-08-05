import React, { Component } from 'react'
import { browserHistory } from 'react-router';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Header from '../../components/Header'
import Button from 'material-ui/Button';
import style from './create-budget.jss.js'
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Input from 'material-ui/Input';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import { addBudget, toNumericString } from '../../services/index'
import { findIndex } from 'lodash'
import { getAvailableIncome } from '../../actions/income'
import { getBudgets } from '../../actions/budgets'

class CreateBudget extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            allocation: 0,
            categoryId: -1,
            caregory: '',
            saveDisabled: true,
        }
    }

    nameChanged = (event) => {
        let input = event.target.value
        
        this.setState( {
            name: input.trim()
        })
        this.checkCanSave(input.trim(), this.state.allocation, this.state.categoryId);
    }

    allocationChanged = (event) => {
        let input = event.target.value
        this.setState( {
            allocation: input
        })
        this.checkCanSave(this.state.name, input, this.state.categoryId);
    }

    categoryChanged = event => {
        let category = event.target.value;
        let idx = findIndex(this.props.categories, ['name', category])
        let id = this.props.categories[idx].id;
        this.setState( {
            categoryId: id,
            category: category
        })
        this.checkCanSave(this.state.name, this.state.allocation, id);
    }

    saveBudget = () => {
        let payload = {
            name: this.state.name,
            allocation: this.state.allocation,
            category: { id: this.state.categoryId },
            txnRequireDesc: this.state.txnRequireDesc
        }
        addBudget(payload)
        .then(function (response) {  
            this.props.getAvailableIncome();
            this.props.getBudgets();
            browserHistory.push('/');
        })
        .catch(function (error) {
            //TODO: show notification
        });

    }

    txnRequireDesc =(event) => {
        this.setState({ txnRequireDesc: event.target.checked });
    }

    checkCanSave = (name, allocation, categoryId) => {

        if (categoryId !== -1 &&
            name !== '' && 
            allocation > 0) {
                this.setState({ saveDisabled: false })
            } else {
                this.setState({ saveDisabled: true })
            }
    }
    
    render() {
        return(
        <div>
            <Header title="Create Budget" />
            <Grid container justify='center' style={style.gridStyle}>
                <Grid item xs={8}>
                    <Paper elevation={5} style={style.pad}>
                        <Grid container justify="space-around">
                            <Grid item xs={3}>
                                <Input
                                id="name"
                                placeholder="Name"
                                onChange={this.nameChanged}
                                />
                                <br />
                                <br />
                                <Input
                                id="allocation"
                                placeholder="Amount per month"
                                onChange={this.allocationChanged}
                                type="number"
                                />
                                <br />
                                 <p>Available Income: {toNumericString(this.props.availableIncome)}</p>
                                 <br />
                                 <br />
                                 <FormControlLabel
                                    control={
                                        <Switch
                                        checked={this.state.txnRequireDesc}
                                        onChange={this.txnRequireDesc}
                                        color="primary"
                                        />
                                    }
                                    label="Require description for transactions"
                                />
                                 
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Category</FormLabel>
                                    <RadioGroup
                                        aria-label="category"
                                        name="category"
                                        onChange={this.categoryChanged}
                                        value={this.state.category}
                                    >
                                        {this.props.categories.map((category) => (
                                            <FormControlLabel key={category.id} value={category.name} control={<Radio />} label={category.name} />
            
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container justify="flex-end">
                            <Button color="primary" disabled={this.state.saveDisabled} onClick={this.saveBudget}>
                                Save
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
      categories: state.categories.categories,
      availableIncome: state.incomes.available
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAvailableIncome,
        getBudgets
    }, dispatch)
  }
  
  export default connect( mapStateToProps, mapDispatchToProps )(CreateBudget)
