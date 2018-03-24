import React, { Component } from 'react'
import Header from '../../components/Header'
import IncomeTable from './components/IncomeTable'
import AddIncomeDialog from './components/AddIncomeDialog'
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import style from './income.jss.js'

class Income extends Component {

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

    render() {
        let data = [];
        return(
        <div>
            <Header title="Income" />
            <IncomeTable data={data} />
                <div>
                    <Button variant="fab" color="primary"style={style.addButton} 
                        onClick={() => {this.showAddIncomeDialog()}}>
                        <AddIcon style={style.iconSize}/>
                    </Button>
                </div>
            <AddIncomeDialog isOpen={this.state.isAddIncomeOpen}/>
        </div>
        )
    }
}

export default Income
