import React, { Component } from 'react'
import { Link } from 'react-router'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui-icons/ArrowBack'
import style from './header.jss.js'
import ActionMenu from './components/ActionMenu'

export class Header extends Component {
  render() {

    let leftButton = <div />
    let rightButton = <div />
    if(this.props.title !== 'Morris Budget') {
      leftButton = 
        <Link to={"/"}>
          <IconButton style={style.menuButton} aria-label="ArrowBack">
            <ArrowBack />
          </IconButton>
        </Link>
    }
    else{
      rightButton = <ActionMenu style={style.moreVertButton}/>
    }

    return(
      <div className={style.root}>
        <AppBar position="static" color={"primary"}>
          <Toolbar>
            {leftButton}
            <div style={style.flex}>{this.props.title}</div>
            {rightButton}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default Header
