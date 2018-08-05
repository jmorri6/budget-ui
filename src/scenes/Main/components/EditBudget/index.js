import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';
import Input from 'material-ui/Input';
import Switch from 'material-ui/Switch';
import { findIndex } from 'lodash'
import { getAvailableIncome } from '../../../../actions/income'
import { editBudget, toNumericString } from '../../../../services/index'
import { getBudgets } from '../../../../actions/budgets'

class EditBudget extends Component {
    constructor(props) {
        super(props)
        let id = this.getCategoryId(this.props.category.name);
        this.state = {
            name: this.props.name,
            allocation: this.props.allocation,
            category: this.props.category.name,
            categoryId: id,
            txnRequireDesc: this.props.txnRequireDesc
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

    getCategoryId = (category) => {
        let idx = findIndex(this.props.categories, ['name', category])
        return this.props.categories[idx].id;
    }

    categoryChanged = event => {
        let category = event.target.value;
        let id = this.getCategoryId(category);
        this.setState( {
            categoryId: id,
            category: category
        })
        this.checkCanSave(this.state.name, this.state.allocation, id);
    }

    txnRequireDesc = (event) => {
        this.setState({ txnRequireDesc: event.target.checked });
    }

    saveBudget = () => {
        let self = this;
        let payload = {
            id: this.props.id,
            name: this.state.name,
            allocation: this.state.allocation,
            category: { id: this.state.categoryId },
            txnRequireDesc: this.state.txnRequireDesc
        }
        editBudget(payload)
        .then(function (response) {  
            self.props.getBudgets();
            self.props.getAvailableIncome();
            self.props.close()
        })
        .catch(function (error) {
            //TODO: show notifaction
        });

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
        <Dialog
        open={this.props.isOpen}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Edit Budget</DialogTitle>
            <DialogContent>

            <Grid container justify='center' >
                <Grid item xs={8}>
                    <Input
                    id="name"
                    placeholder="Name"
                    onChange={this.nameChanged}
                    value={this.state.name}
                    />
                    <br />
                    <br />
                    <Input
                    id="allocation"
                    placeholder="Amount per month"
                    onChange={this.allocationChanged}
                    value={this.state.allocation}
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
                <Grid item xs={4}>
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
            </DialogContent>
            <DialogActions>
                <Button onClick={this.props.close} color="primary">
                    Cancel
                </Button>
                {this.props.okText !== '' &&
                <Button onClick={this.saveBudget} variant="raised" color="primary">
                    Save
                </Button>
                }
            </DialogActions>
        </Dialog>
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
  
export default connect( mapStateToProps, mapDispatchToProps )(EditBudget)
