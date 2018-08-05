import React, { Component } from 'react'
import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';

class Notes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name,
            allocation: this.props.allocation,
            category: this.props.category,
        }
    }
  render() {
    return(
    <Drawer open={this.props.isOpen}>
    <div
      tabIndex={0}
      role="button"
    >
    note
    </div>
  </Drawer>
    )
  }
}

export default Notes
