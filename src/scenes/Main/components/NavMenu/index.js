import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateActiveView } from '../../../../actions/active-view-state';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import BarChartIcon from '@material-ui/icons/BarChart';
import SyncIcon from '@material-ui/icons/Sync';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AssignmentIcon from '@material-ui/icons/AssignmentOutlined';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SwapHoriz from '@material-ui/icons/SwapHoriz';
import Edit from '@material-ui/icons/EditOutlined';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import styles from './nav.jss.js';


class NavMenu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            open: true
        };
    }
    
    toggleExpand = () => {
        let isOpen = this.state.open;
        this.setState({ open: !isOpen });
    }

    render() {
        return (
            <Drawer
              variant="permanent"
              style = {styles.drawerPaper}
            >
            <div style={styles.toolbar} />
              <List>
                <ListItem button onClick = {() => this.props.updateActiveView(0)}>
                    <ListItemIcon>
                    <HomeIcon color="primary"/>
                    </ListItemIcon>
                    <ListItemText primary="Budget" />
                </ListItem>
                <ListItem button onClick = {() => this.props.updateActiveView(1)}>
                    <ListItemIcon>
                    <BarChartIcon color="secondary"/>
                    </ListItemIcon>
                    <ListItemText primary="Reports" />
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem button onClick = {this.toggleExpand}>
                <ListItemIcon>
                    <AssignmentIcon color="action"/>
                </ListItemIcon>
                <ListItemText primary="Manage Budget" />
                {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} component="li" timeout="auto" unmountOnExit>
                    <List disablePadding style={styles.subList}>
                        <ListItem button onClick={() => this.props.updateActiveView(2)}>
                            <Edit />
                            <ListItemText disableTypography style={styles.smallerFont} primary="Edit Details" />
                        </ListItem> 
                        <ListItem button onClick={() => this.props.updateActiveView(3)}>
                            <SwapHoriz />
                            <ListItemText disableTypography style={styles.smallerFont} primary="Transfer Funds" />
                        </ListItem> 
                        <ListItem button onClick={() => this.props.updateActiveView(4)}>
                            <AddCircleOutline />
                            <ListItemText disableTypography style={styles.smallerFont} primary="Add Funds" />
                        </ListItem> 
                    </List>
                </Collapse>
                <ListItem button onClick = {() => this.props.updateActiveView(5)}>
                <ListItemIcon>
                    <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText primary="Manage Income" />
                </ListItem>
                <ListItem button onClick = {() => this.props.updateActiveView(6)}>
                <ListItemIcon>
                    <SyncIcon />
                </ListItemIcon>
                <ListItemText primary="Auto Debits" />
                </ListItem>
              </List>
            </Drawer>
        );
      };
}

const mapStateToProps = (state) => {
  return {
      balance: state.budgets.balance,
      activeView: state.viewState.active
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      updateActiveView
  }, dispatch)
}

export default connect( mapStateToProps, mapDispatchToProps )(NavMenu)