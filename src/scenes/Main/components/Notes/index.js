import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

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
