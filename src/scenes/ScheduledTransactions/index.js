import React, { Component } from 'react'
import Header from '../../components/Header'
import ScheduleTable from './components/ScheduleTable'
import AddScheduleDialog from './components/AddScheduleDialog'
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

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

    shoAddDialog = () => {
        this.setState( {
            isDialogOpen: true
        })
    }

    hideDialog = () => {
        this.setState({ isDialogOpen: false });
    }

    render() {
        return(
        <div>
            <Header title="Scheduled Transactions" />
            <ScheduleTable />
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
  
  export default ScheduledTransactions