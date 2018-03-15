import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hideAddTxnModal } from '../../../../../../actions/add-txn-modal'
import { addTxn } from '../../../../../../actions/add-txn'
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';

class DebitModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      amountError: false,
      descError: false,
      amount: '',
      desc: ''
    }
  }
  exitModal = () => {
    this.props.hideAddTxnModal()
  };

  addTxn = () => {
    if (this.state.amountError || this.state.descError) {
      return
    }

  }

  amtChange = () => {
    this.setState({amountError:this.state.amount <=0})
  }

  descChange = () => {
    this.setState({descError:this.props.showAddTxnModalState.requreDesc && this.state.desc.trim() === ''})
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.showAddTxnModalState.isOpen || false}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {this.props.showAddTxnModalState.name || ''}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              error={this.state.amountError}
              margin="dense"
              id="amount"
              label="Amount"
              type="Number"
              fullWidth
              value={this.state.amount}
              onChange={() => {this.amtChange()}}
            />
            <TextField
              required={this.props.showAddTxnModalState.requireDesc || false}
              error={this.state.descError}
              margin="dense"
              id="name"
              label="Description"
              fullWidth
              value={this.state.desc}
              onChange={() => {this.descChange()}}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {this.exitModal()}} color="primary">
              Cancel
            </Button>
            <Button onClick={() => {this.exitModal()}} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showAddTxnModalState : state.showAddTxn,
    addTxnState: state.addTxn
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    hideAddTxnModal, addTxn
  }, dispatch)
}

export default connect( mapStateToProps, mapDispatchToProps )(DebitModal)
