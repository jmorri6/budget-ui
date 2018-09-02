import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { HorizontalBar } from 'react-chartjs-2';
import AveragesTab from './components/AveragesTab';
import TrendsTab from './components/TrendsTab';

class TabControl extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: 0
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
      };
    
    render() {

        return(
            <Paper style={{ flexGrow: 1 } }>
                <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
                >
                <Tab label="Balance" />
                <Tab label="Averages" />
                <Tab label="Trends" />
                </Tabs>
                <br />
                { this.state.value === 0 && this.props.report.balancePerBudget &&
                    <HorizontalBar data={this.props.report.balancePerBudget} legend={{ display : false }} />
                }
                { this.state.value === 1 &&
                    <AveragesTab />
                }
                { this.state.value === 2 &&
                    <TrendsTab />
                }
                <br />
            </Paper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        report: state.reportState,
    }
}

export default connect( mapStateToProps )(TabControl)