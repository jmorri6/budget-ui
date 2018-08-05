import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import { getSchedules } from '../../../../actions/schedule'
import { deleteSchedule, toNumericString } from '../../../../services/index';


class ScheduleTable extends Component {

    componentDidMount() {
        this.props.getSchedules();
    }

    delete = (id) => {
        let self = this;
        //TODO: show confirmation before deleting
        deleteSchedule(id)
        .then(function () {  
            self.props.getSchedules();
        })
        .catch(function (error) {
            //TODO: show notification
        });
    }

    getFormattedDate = (date) => {
        let d = new Date(date);
        return d.toLocaleDateString();
    };

  render() {
    return(
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Budget</TableCell>
                <TableCell numeric>Day of Month</TableCell>
                <TableCell>Last Ran</TableCell>
                <TableCell>Next Run Time</TableCell>
                <TableCell>Delete</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {! this.props.schedules && <TableRow></TableRow>}
            {this.props.schedules && this.props.schedules.map(n => {
                return (
                <TableRow key={n.id}>
                    <TableCell>{n.name}</TableCell>
                    <TableCell>{n.budget}</TableCell>
                    <TableCell numeric>{n.dayToRun}</TableCell>
                    <TableCell>{n.lastRunTime ? this.getFormattedDate(n.lastRunTime) : ''}</TableCell>
                    <TableCell>{this.getFormattedDate(n.nextRunTime)}</TableCell>
                    <TableCell>
                        <IconButton aria-label="Delete" onClick={() => this.delete(n.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
                );
            })}
            </TableBody>
        </Table>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        schedules: state.schedules.schedules
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getSchedules
    }, dispatch)
  }

export default connect( mapStateToProps, mapDispatchToProps )(ScheduleTable)
