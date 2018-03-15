import React, { Component } from 'react'
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hideIncomeModal } from '../../../../actions/income-modal'

class Income extends Component {
    
  handleClose = () => {
    this.props.hideIncomeModal()
  };

  render() {

    return(
        <Dialog
        open={this.props.displayIncomeModal.isOpen}
        disableBackdropClick
        disableEscapeKeyDown
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Expected Income</DialogTitle>
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
                    Subscribe
                </Button>
            </DialogActions>
        </Dialog>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        displayIncomeModal : state.incomeModal
    }
  }
  
function mapDispatchToProps(dispatch) {
return bindActionCreators({
    hideIncomeModal }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Income)
