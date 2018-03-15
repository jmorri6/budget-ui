import React, { Component } from 'react'
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hideConfirmation } from '../../../../actions/confirmation-modal'

class Confirmation extends Component {

    handleClose = () => {
      this.props.hideConfirmation()
    };

  render() {
    return(
        <Dialog
        open={this.props.showConfirmation.isOpen}
        disableBackdropClick
        disableEscapeKeyDown
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">{this.props.showConfirmation.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {this.props.showConfirmation.text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={this.props.showConfirmation.okCallback} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        showConfirmation : state.showConfirmation
    }
  }
  
function mapDispatchToProps(dispatch) {
return bindActionCreators({
    hideConfirmation }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Confirmation)
