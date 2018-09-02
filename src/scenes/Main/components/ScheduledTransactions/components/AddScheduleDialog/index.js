import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { addSchedule } from '../../../../../../services/index';
import BudgetDropDown from '../../../../../../components/BudgetDropDown';

//TODO: Notes for deduction
class AddScheduleDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            budgetId: 0,
            name: "",
            amount: 0,
            dayToRun: 0,
            saveDisabled: true
        }
    }
    
  handleClose = () => {
    this.setState( {budgetId: 0, name: "", amount: 0, dayToRun: 0 })
    this.props.close()
  };


  budgetChanged = (event) => {
    let input = event.target.value
    this.setState({ budgetId: input });
    this.updateCanSave(input, this.state.name, this.state.amount, this.state.dayToRun)
  }

  nameChanged = (event) => {
    let input = event.target.value
    this.setState({ name: input });
    this.updateCanSave(this.state.budgetId, input, this.state.amount, this.state.dayToRun)
  }
  amountChanged = (event) => {
    let input = event.target.value
    this.setState({ amount: input });
    this.updateCanSave(this.state.budgetId, this.state.name, input, this.state.dayToRun)
  }
  dayChanged = (event) => {
    let input = event.target.value
    this.setState({ dayToRun: input });
    this.updateCanSave(this.state.budgetId, this.state.name, this.state.amount, input)
  }

  updateCanSave = (budgetId, name, amount, dayToRun) => {
      if (budgetId > 0 && name !== "" && amount > 0 && dayToRun > 0) {
          this.setState({ saveDisabled: false })
      } else {
          this.setState({ saveDisabled: true })
      }
  }

  //TODO: refresh grid when income is saved
  addScheduledTxn = () => {
    let self = this;
    let payload = {
        budgetId: this.state.budgetId,
        name: this.state.name,
        amount: this.state.amount,
        dayToRun: this.state.dayToRun
    }
    addSchedule(payload)
    .then(function () {
        self.handleClose();
    })
    .catch(function (error) {
        //TODO: show notification
    });
  }

  render() {

    return(
        <div>
            <Dialog
            open={this.props.isOpen}
            disableBackdropClick
            disableEscapeKeyDown
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add Scheduled Transaction</DialogTitle>
                <DialogContent>
                    <FormControl style={{margin:'2px'}}>
                        <BudgetDropDown value={this.state.budgetId} onChange={this.budgetChanged} />
                    </FormControl>
                    <br />
                    <FormControl style={{margin:'2px'}}>
                        <InputLabel htmlFor="desc">Name</InputLabel>
                        <Input id="desc" onChange={this.nameChanged} />
                    </FormControl>
                    <br />
                    <FormControl style={{margin:'2px'}}>
                        <InputLabel htmlFor="amount">Amount</InputLabel>
                        <Input id="amount" type="number" onChange={this.amountChanged} />
                    </FormControl>
                    <br />
                    <FormControl style={{margin:'2px'}}>
                        <InputLabel htmlFor="frequencyPerYr">Day to Run</InputLabel>
                        <Input id="dayToRun" type="number" onChange={this.dayChanged} />
                    </FormControl>
                    <br />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button disabled={this.state.saveDisabled} onClick={this.addScheduledTxn} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
  }
}

export default AddScheduleDialog
