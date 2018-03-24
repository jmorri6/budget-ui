import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import { Redirect } from 'react-router'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import Menu, { MenuItem } from 'material-ui/Menu';
import style from './action-menu.jss.js'

export class ActionMenu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      path: "",
    }
  }

  redirect = menuItem => {
    if (menuItem === "Income") {
      this.setState({ path: "/income" })
    } else if (menuItem === "Allocations") {

    } else if (menuItem === "Transfer") {

    } else if (menuItem === "History") {

    } else if (menuItem === "Manual Add") {

    }
    this.setState({ anchorEl: null })
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };



  render() {
    if (this.state.path !== "") {
      return <Redirect to={this.state.path} />
    }

    let menuItems = ["Income", "Allocations", "Transfer", "History", "Manual Add"]
    const { anchorEl } = this.state;

    return(
      <div>
        <IconButton aria-label="MoreVert" style={style.white} onClick={this.handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              width: 200,
            },
          }}
        >
          {menuItems.map(option => (
            <MenuItem key={option} onClick={() => {this.redirect(option)}}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    )
  }
}

export default ActionMenu