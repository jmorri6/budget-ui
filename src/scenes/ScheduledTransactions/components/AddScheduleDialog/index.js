import React, { Component } from 'react'
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { addSchedule } from '../../../../services/index';

//TODO: Notes for deduction
class AddScheduleDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            desc: "",
            amount: 0,
            frequencyPerYr: 0,
            monthlyDeduction: 0,
            saveDisabled: true
        }
    }
    
  handleClose = () => {
    this.props.close()
  };

  nameChanged = (event) => {
    let input = event.target.value
    this.setState({ desc: input });
    this.updateCanSave(input, this.state.amount, this.state.frequencyPerYr)
  }
  amountChanged = (event) => {
    let input = event.target.value
    this.setState({ amount: input });
    this.updateCanSave(this.state.desc, input, this.state.frequencyPerYr)
  }
  frequencyChanged = (event) => {
    let input = event.target.value
    this.setState({ frequencyPerYr: input });
    this.updateCanSave(this.state.desc, this.state.amount, input)
  }
  deductionChanged = (event) => {
    let input = event.target.value
    this.setState({ monthlyDeduction: input })
  }

  updateCanSave = (desc, amount, frequency) => {
      if (desc !== "" && amount > 0 && frequency > 0) {
          this.setState({ saveDisabled: false })
      } else {
          this.setState({ saveDisabled: true})
      }
  }

  //TODO: refresh grid when income is saved
  saveIncome = () => {
    let self = this;
    let payload = {
        desc: this.state.desc,
        amount: this.state.amount,
        frequencyPerYr: this.state.frequencyPerYr,
        monthlyDeduction: this.state.monthlyDeduction
    }
    addSchedule(payload)
    .then(function () {
        self.props.close();
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
                        <InputLabel htmlFor="frequencyPerYr">Frequency per year</InputLabel>
                        <Input id="frequencyPerYr" type="number" onChange={this.frequencyChanged} />
                    </FormControl>
                    <br />
                    <FormControl style={{margin:'2px'}}>
                        <InputLabel htmlFor="monthlyDeduction">Monthly Deduction</InputLabel>
                        <Input id="monthlyDeduction" type="number" onChange={this.deductionChanged} />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button disabled={this.state.saveDisabled} onClick={this.saveIncome} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
  }
}

export default AddScheduleDialog
