import React, { Component } from 'react';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import styles from './header.jss.js';


class Header extends Component {

    render() {
        return (
            <AppBar position="fixed" style={styles.appBar}>
                <Toolbar>
                <TrendingUpIcon style={styles.icon} />
                <Typography variant="title" color="inherit" noWrap>
                    Morris Budget
                </Typography>
                </Toolbar>
            </AppBar>
        );
      };
}

export default Header;