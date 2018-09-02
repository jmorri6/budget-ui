import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import { HorizontalBar } from 'react-chartjs-2';

class AveragesTab extends Component {

    constructor(props) {
        super(props)
        this.state = {
            active: "Spending",
        }
    }

    handleChange = (clicked) => {
        this.setState({ active: clicked });
    };
    
    render() {
        return(
            <React.Fragment>
                <Grid container style={{ marginLeft: 20 }}>
                    <Chip label="Spending" 
                        color={this.state.active === "Spending" ? "secondary" : "default" }
                        clickable
                        onClick={() => this.handleChange("Spending")}
                    />
                    <Chip label="Income"
                        color={this.state.active === "Income" ? "secondary" : "default"}
                        style={{ marginLeft:10 }}
                        clickable
                        onClick={() => this.handleChange("Income")}
                     />
                </Grid>
                <br />
                { this.state.active === "Spending" &&
                <HorizontalBar data={this.props.report.avgSpendingPerBudget} legend={{ display : false }} />
                }
                { this.state.active === "Income" &&
                <HorizontalBar data={this.props.report.avgIncomePerBudget} legend={{ display : false }} />
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        report: state.reportState,
    }
}

export default connect( mapStateToProps )(AveragesTab)