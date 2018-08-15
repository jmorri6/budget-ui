import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { addTxn } from '../../../../services';
import { DEBIT } from '../../../../services/txn-type';

class DebitModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      amountError: true,
      descError: this.props.requireDesc,
      amount: 0,
      desc: ''
    }
  }

  exitModal = () => {
    this.setState({ amountError: true, descError: this.props.requireDesc, amount: 0, desc: ''})
    this.props.close();
  };

  addTransaction = () => {
    if (this.state.amountError === true || this.state.descError === true) {
      return
    }
    let payload = { 
      budget: { id: this.props.id, balance: this.props.balance},
      amount: this.state.amount,
      desc: this.state.desc || "",
      type: DEBIT
    }
    addTxn(payload).then(()=> {
      this.exitModal();
    })
  }

  amtChange = (event) => {
    let amt = event.target.value;
    let error = (amt <= 0);
    this.setState({amount:amt, amountError: error})
  }

  descChange = (event) => {
    let description = event.target.value;
    let error = (this.props.requireDesc ? description.trim() === "" : false);
    this.setState({desc: description, descError:error })
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.isOpen}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {this.props.title}</DialogTitle>
          <DialogContent>
            <Input
              autoFocus
              error={this.state.amountError}
              margin="dense"
              id="amount"
              placeholder="Amount"
              type="Number"
              fullWidth
              onChange={this.amtChange}
            />
            <Input
              error={this.state.descError}
              margin="dense"
              id="description"
              placeholder="Description"
              fullWidth
              onChange={this.descChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {this.exitModal()}} color="primary">
              Cancel
            </Button>
            <Button onClick={this.addTransaction} variant="raised" color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default (DebitModal)
