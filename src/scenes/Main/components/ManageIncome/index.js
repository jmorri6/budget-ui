import React, { Component } from 'react'
import IncomeTable from './components/IncomeTable'
import AddIncomeDialog from './components/AddIncomeDialog'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import style from './income.jss.js'

class ManageIncome extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isAddIncomeOpen: false
        }
    }

    showAddIncomeDialog = () => {
        this.setState( {
            isAddIncomeOpen: true
        })
    }

    hideAddIncomeDialog = () => {
        this.setState({ isAddIncomeOpen: false });
    }

    render() {
        return(
        <div>
            <IncomeTable />
            <div style={style.buttonDiv}>
                <Button variant="fab" color="primary" style={style.addButton} 
                    onClick={this.showAddIncomeDialog}>
                    <AddIcon style={style.iconSize}/>
                </Button>
            </div>
            <AddIncomeDialog isOpen={this.state.isAddIncomeOpen} close={this.hideAddIncomeDialog} />
        </div>
        )
    }
}
  
  export default ManageIncome