import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Search from '@material-ui/icons/Search';
import Notes from '@material-ui/icons/Notes';
import style from './budget-card.jss.js';
import DebitModal from './components/DebitModal';
import { toNumericString } from '../../../../../../../../services/index'

class BudgetCard extends Component {

    constructor(props) {
        super(props)
        this.state = { 
            openDebitModal: false
        }
    }

    showDebitModal = () => {
        this.setState({ openDebitModal: true });
    }
    closeDebitModal = () => {
        this.setState( {openDebitModal: false });
        this.props.refreshBudgets();
    }

  render() {
      let balance = toNumericString(this.props.balance);
      if (this.props.balance <= 0) {
          balance = "(" + balance + ")"
      }
    return(
        <React.Fragment>
            <GridListTile key={this.props.id} style={style.tile}>
                <Card style={style.card} onDoubleClick={() => console.log("clicked!")}>
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
                                <IconButton onClick={this.showDebitModal}>
                                    <AddIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={4}>
                                <IconButton >
                                    <Notes />
                                </IconButton>
                            </Grid>
                            <Grid item xs={4}>
                                <IconButton >
                                    <Search />
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
        </React.Fragment>
    )
  }
}
export default BudgetCard