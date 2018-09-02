import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import Switch from '@material-ui/core/Switch';
import { findIndex } from 'lodash'
import { toNumericString } from '../../../../../../services/index'
// import Confirmation from '../../../../../../components/Confirmation';

class BudgetDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            allocation: '',
            categoryName: '',
            categoryId: -1,
            txnRequireDesc: false,
            canSave: false,
            canDelete: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.budget.category !== this.props.budget.category) {
            let id = this.getCategoryId(nextProps.budget.category.name);
            this.setState({ categoryId: id, categoryName: nextProps.budget.category.name });
        }

        if (nextProps.budget.name !== this.props.budget.name) {
            this.setState({ name: nextProps.budget.name });
        }

        if (nextProps.budget.allocation !== this.props.budget.allocation) {
            this.setState({ allocation: nextProps.budget.allocation });
        }

        if (nextProps.budget.txnRequireDesc !== this.props.budget.txnRequireDesc) {
            this.setState({ txnRequireDesc: nextProps.budget.txnRequireDesc });
        }

        this.setState({ canSave: false });

        if (nextProps.budget.balance === 0) {
            this.setState({ canDelete: true });
        } else {
            this.setState({ canDelete: false });
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
        let allocated = this.props.budget.allocation ? this.props.budget.allocation : 0;
        let max = allocated + this.props.availableIncome;
        if (input > max) {
            input = toNumericString(max);
        }

        this.setState( {
            allocation: input
        })
        this.checkCanSave(this.state.name, input, this.state.categoryId);
    }

    getCategoryId = (category) => {
        if (category !== '') {
            let idx = findIndex(this.props.categories, ['name', category]);
            return this.props.categories[idx].id;
        }
        return -1;
    }

    categoryChanged = event => {
        let category = event.target.value;
        let id = this.getCategoryId(category);
        this.setState( {
            categoryId: id,
            categoryName: category
        })
        this.checkCanSave(this.state.name, this.state.allocation, id);
    }

    txnRequireDesc = (event) => {
        this.setState({ txnRequireDesc: event.target.checked });
        this.checkCanSave(this.state.name, this.state.allocation, this.state.categoryId);
    }

    saveBudget = () => {
        let payload = {
            name: this.state.name,
            allocation: this.state.allocation,
            category: { id: this.state.categoryId },
            txnRequireDesc: this.state.txnRequireDesc
        }
        if (this.props.budget.id) {
            payload.id = this.props.budget.id
            this.props.update(payload);
        } else {
            this.props.save(payload);
        }
    }

    checkCanSave = (name, allocation, categoryId) => {

        if (categoryId !== -1 &&
            name !== '' && 
            allocation > 0) {
                this.setState({ canSave: true })
            } else {
                this.setState({ canSave: false })
            }
    }

  render() {
    return(
        <React.Fragment>
        <Grid container justify='center' style={{marginTop:10}}>
            <Grid container>
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
                            value={this.state.categoryName}
                        >
                            {this.props.categories.map((category) => (
                                <FormControlLabel key={category.id} value={category.name} control={<Radio />} label={category.name} />

                            ))}
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={2}>
                    <Button disabled={!this.state.canSave} onClick={this.saveBudget} variant="raised" color="primary">
                        Save
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <Button disabled={!this.state.canDelete} 
                        onClick={() => this.props.delete(this.props.budget.id)} 
                        variant="raised" color="secondary">
                        Delete
                    </Button>
                </Grid>
            </Grid>
        </Grid>
            {/* <Confirmation
            isOpen={this.state.openConfirm}
            title='Confirmation'
            text={'Delete ' + this.props.name + ' budget?'}
            okText='Yes'
            cancelText='No'
            close={this.closeConfirmation}
            okCallback={this.deleteTheBudget}
            /> */}
        </React.Fragment>
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
        
    }, dispatch)
}
  
export default connect( mapStateToProps, mapDispatchToProps )(BudgetDetails)
