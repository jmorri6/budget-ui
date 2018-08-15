import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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
    this.setState({ anchorEl: null })
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    return(
      <div>
        <IconButton aria-label="MoreVert" style={style.white} onClick={this.handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              width: 200,
            },
          }}
        >
          <Link to="/createbudget" style={style.linkStyle}>
            <MenuItem >
              Create Budget
            </MenuItem>
          </Link>
          <Link to="/income" style={style.linkStyle}>
            <MenuItem >
              Income
            </MenuItem>
          </Link>
          <Link to="/history" style={style.linkStyle}>
            <MenuItem >
              History
            </MenuItem>
          </Link>
          <Link to="/manageIncome" style={style.linkStyle}>
            <MenuItem >
              Add/Transfer Funds
            </MenuItem>
          </Link>
          <Link to="/scheduled" style={style.linkStyle}>
            <MenuItem >
              Scheduled Transactions
            </MenuItem>
          </Link>

        </Menu>
      </div>
    )
  }
}

export default ActionMenu