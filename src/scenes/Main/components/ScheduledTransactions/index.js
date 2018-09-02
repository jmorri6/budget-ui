import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AddScheduleDialog from './components/AddScheduleDialog'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { getSchedules } from '../../../../actions/schedule'
import { deleteSchedule, getFormattedDate} from '../../../../services/index';

const style = {
    buttonDiv: {
        float:'right',
        margin:'25px'
    }
}
class ScheduledTransactions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isDialogOpen: false
        }
    }
    
    componentWillMount = () => {
        this.props.getSchedules();
    }

    shoAddDialog = () => {
        this.setState( {
            isDialogOpen: true
        })
    }

    hideDialog = () => {
        this.setState({ isDialogOpen: false });
        this.props.getSchedules();
    }

    delete = (id) => {
        //TODO: show confirmation before deleting
        deleteSchedule(id);
        this.props.getSchedules();
    }

    render() {
        return(
        <div>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>Budget</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Day to Run</TableCell>
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
                        <TableCell>{n.budgetName}</TableCell>
                        <TableCell>{n.name}</TableCell>
                        <TableCell>{n.amount}</TableCell>
                        <TableCell>{n.dayToRun}</TableCell>
                        <TableCell>{n.lastRunTime ? getFormattedDate(n.lastRunTime) : ''}</TableCell>
                        <TableCell>{getFormattedDate(n.nextRunTime)}</TableCell>
                        <TableCell>
                            <IconButton aria-label="Delete" onClick={() => this.delete(n.id)}>
                                <DeleteIcon/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    );
                })}
                </TableBody>
            </Table>
            <div style={style.buttonDiv}>
                <Button variant="fab" color="primary" style={style.addButton} 
                    onClick={this.shoAddDialog}>
                    <AddIcon style={style.iconSize}/>
                </Button>
            </div>
            <AddScheduleDialog isOpen={this.state.isDialogOpen} close={this.hideDialog} />
        </div>
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

export default connect( mapStateToProps, mapDispatchToProps )(ScheduledTransactions)