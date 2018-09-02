import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import { Line } from 'react-chartjs-2';
import { getTrends } from '../../../../../../../../actions/report-actions';

class TrendsTab extends Component {

    constructor(props) {
        super(props)
        this.state = {
            active: "Middle",
        }
    }

    componentWillMount = () => {
        this.props.getTrends();
    }

    handleChange = (clicked) => {
        this.setState({ active: clicked });
    };
    
    render() {
        return(
            <React.Fragment>
                <Grid container style={{ marginLeft: 20 }}>
                    <Chip label="Top" 
                        color={this.state.active === "Top" ? "secondary" : "default" }
                        clickable
                        onClick={() => this.handleChange("Top")}
                    />
                    <Chip label="Middle"
                        color={this.state.active === "Middle" ? "secondary" : "default"}
                        style={{ marginLeft:10 }}
                        clickable
                        onClick={() => this.handleChange("Middle")}
                     />
                     <Chip label="Bottom"
                         color={this.state.active === "Bottom" ? "secondary" : "default"}
                         style={{ marginLeft:10 }}
                         clickable
                         onClick={() => this.handleChange("Bottom")}
                      />
                </Grid>
                <br />
                { this.state.active === "Top" &&
                <Line data={this.props.report.topTrends} legend={{ display : false }} />
                }
                { this.state.active === "Middle" &&
                <Line data={this.props.report.spendingTrends} legend={{ display : false }} />
                }
                { this.state.active === "Bottom" &&
                <Line data={this.props.report.bottomTrends} legend={{ display : false }} />
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getTrends
    }, dispatch)
  }

export default connect( mapStateToProps, mapDispatchToProps )(TrendsTab)