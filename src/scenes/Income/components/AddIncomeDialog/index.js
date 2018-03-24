import React, { Component } from 'react'
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class AddIncomeDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: this.props.isOpen
        }
    }
    
  handleClose = () => {
    this.setState({ isOpen: false })
  };

  render() {

    return(
        <div>
            <Dialog
            open={this.state.isOpen || false}
            disableBackdropClick
            disableEscapeKeyDown
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add Income</DialogTitle>
                <DialogContent>
                    {/* <List>
                        {[0, 1, 2, 3].map(value => (
                            <ListItem
                            key={value}
                            role={undefined}
                            dense
                            >
                                <ListItemText primary={`Line item ${value + 1}`} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">
                                    <CommentIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleClose} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
  }
}

export default AddIncomeDialog
