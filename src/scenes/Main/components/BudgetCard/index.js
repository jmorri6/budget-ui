import React, { Component } from 'react'
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import { GridListTile } from 'material-ui/GridList';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
import DeleteIcon from 'material-ui-icons/Delete';
import CreateIcon from 'material-ui-icons/Create';
import style from './budget-card.jss.js';
import DebitModal from '../DebitModal';
import Confirmation from '../../../../components/Confirmation'
import { deleteBudget, toNumericString } from '../../../../services/index'
import EditBudget from '../EditBudget';


//TODO: YELLOW FOR LOW BALANCE
class BudgetCard extends Component {

    constructor(props) {
        super(props)
        this.state = { 
            openDebitModal: false,
            openConfirm: false,
            openEditModal: false
        }
    }

    showConfirmation = () => {
        this.setState({ openConfirm: true });
    }
    closeConfirmation = () => {
        this.setState({ openConfirm: false });
    }

    deleteTheBudget = () => {
        let self = this;
        deleteBudget(this.props.id)
        .then(function (response) {  
            self.setState({ openConfirm: false});
            self.props.refreshBudgets();
        })
        .catch(function (error) {
            //TODO: show notifaction
        });
    }
    showDebitModal = () => {
        this.setState({ openDebitModal: true });
    }
    closeDebitModal = () => {
        this.setState( {openDebitModal: false });
        this.props.refreshBudgets();
    }

    showEditModal = () => {
        this.setState({ openEditModal: true });
    }
    closeEditModal = () => {
        this.setState( { openEditModal: false });
    }

  render() {
      let balance = toNumericString(this.props.balance);
      if (this.props.balance <= 0) {
          balance = "(" + balance + ")"
      }
    return(
        <div>
            <GridListTile key={this.props.id} style={style.tile}>
                <Card style={style.card}>
                    <CardContent style={style.content}>
                        <Typography variant="headline" component="h2">{this.props.name}</Typography>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography>Monthly:</Typography>
                                <Typography>Spent:</Typography>
                                <Typography>Balance:</Typography>
                            </Grid>
                            <Grid item xs ={6}>
                                <Typography style={style.money}>{toNumericString(this.props.allocation)}</Typography>
                                <Typography style={style.money}>{toNumericString(this.props.currentMonthSpent)}</Typography>
                                <Typography style={Object.assign({},style.money,
                                    this.props.balance <= 0 && style.red,
                                    this.props.balance > 0 && style.green)}>{balance}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4}>
                                <IconButton onClick={() => {this.showDebitModal()}}>
                                    <AddIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={4}>
                                <IconButton onClick={() => {this.showEditModal()}}>
                                    <CreateIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={4}>
                                <IconButton disabled={this.props.balance !== 0} onClick={() => {this.showConfirmation()}}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </GridListTile>

            <DebitModal 
                title={this.props.name}
                requireDesc={this.props.txnRequireDesc}
                id={this.props.id} 
                balance={this.props.balance}
                isOpen={this.state.openDebitModal}
                close={this.closeDebitModal}
            />

            <Confirmation
            isOpen={this.state.openConfirm}
            title='Confirmation'
            text={'Delete ' + this.props.name + ' budget?'}
            okText='Yes'
            cancelText='No'
            close={this.closeConfirmation}
            okCallback={this.deleteTheBudget}
            />

            <EditBudget
            isOpen={this.state.openEditModal}
            close={this.closeEditModal}
            save={this.saveBudget}
            name={this.props.name}
            allocation={this.props.allocation}
            category={this.props.category}
            id={this.props.id}
            txnRequireDesc={this.props.txnRequireDesc}
            />
        </div>
    )
  }
}
export default BudgetCard