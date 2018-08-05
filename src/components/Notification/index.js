import React, { Component } from 'react'
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

class Notification extends Component {
  render() {
    return(
        <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
            }}
          open={this.props.isOpen}
          onClose={this.props.close}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={this.props.message}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.props.close}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
    )
  }
}

export default Notification
