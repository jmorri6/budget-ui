import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import IconButton from 'material-ui/IconButton'
import { Redirect } from 'react-router'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import Menu, { MenuItem } from 'material-ui/Menu';
import style from './action-menu.jss.js'
import { showIncomeModal } from '../../../../actions/income-modal'

export class ActionMenu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null
    }
  }

  openDialog = menuItem => {
    if (menuItem === "Income") {
      this.props.showIncomeModal()
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
            <MenuItem key={option} onClick={() => {this.openDialog(option)}}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
    return {
        //displayIncomeModal : state.displayIncomeModal
    }
  }
  
function mapDispatchToProps(dispatch) {
return bindActionCreators({
    showIncomeModal }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ActionMenu)