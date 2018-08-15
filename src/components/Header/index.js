import React, { Component } from 'react'
import { Link } from 'react-router'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import style from './header.jss.js'
import ActionMenu from './components/ActionMenu'
import BubbleChartIcon from '@material-ui/icons/BubbleChartOutlined';
import Badge from '@material-ui/core/Badge';


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
    else {
      leftButton = 
        <IconButton style={style.menuButton}>
          <BubbleChartIcon />
        </IconButton>
      // leftButton = 
      // <IconButton style={style.menuButton} aria-label="Notes">
      //  { this.props.nbrOfNotes > 0 &&
      //   <Badge badgeContent={this.props.nbrOfNotes} color="secondary">
      //     <MenuIcon />
      //   </Badge>
      //  }
      //  { this.props.nbrOfNotes === 0 &&
      //   <MenuIcon />
      //  }
      // </IconButton>
      rightButton = <ActionMenu style={style.moreVertButton} />
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
