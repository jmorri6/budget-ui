import React, { Component } from 'react'
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class Confirmation extends Component {
  render() {
    return(
        <Dialog
        open={this.props.isOpen}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {this.props.text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.props.close} color="primary">
                    {this.props.cancelText}
                </Button>
                {this.props.okText !== '' &&
                <Button onClick={this.props.okCallback} variant="raised" color="primary">
                    {this.props.okText}
                </Button>
                }
            </DialogActions>
        </Dialog>
    )
  }
}

export default Confirmation
