import React, { Component } from 'react'
import Card, { CardContent } from 'material-ui/Card';
import { GridListTile } from 'material-ui/GridList';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import style from './budget-card.jss.js';
import DebitModal from '../DebitModal';


class BudgetCard extends Component {

    constructor(props) {
        super(props)
        this.state = { openDebitModal: false }
    }

    showDebitModal = () => {
        this.setState({ openDebitModal: true });
    }

    closeDebitModal = () => {
        this.setState( {openDebitModal: false });
    }

  render() {
      let balance = this.props.balance;
      if (this.props.balance <= 0) {
          balance = "(" + this.props.balance + ")"
      }
    return(
        <div>
            <GridListTile key={this.props.name} style={style.tile}>
                <Card style={style.card}>
                    <CardContent style={style.content}>
                    <Typography variant="headline" component="h2">{this.props.name}
                        <div style={{float:'right'}}>
                            <Button variant="fab" color="primary"style={style.addButton} 
                                onClick={() => {this.showDebitModal()}}>
                                <AddIcon style={style.iconSize}/>
                            </Button>
                        </div>
                    </Typography>
                    <Typography>Monthly:<span style={style.money}> {this.props.perMonth}</span></Typography>
                    <Typography>Spent: <span style={style.money}>{this.props.spent}</span></Typography>
                    <Typography>Balance: <span style={Object.assign({},style.money,
                        this.props.balance <= 0 && style.red,
                        this.props.balance > 0 && style.green)}>{balance}</span></Typography>
                    </CardContent>
                </Card>
            </GridListTile>

            <DebitModal 
                title={this.props.name}
                requireDesc={this.props.requireDesc}
                id={this.props.id} 
                isOpen={this.state.openDebitModal}
                close={this.closeDebitModal}
            />
        </div>
    )
  }
}
export default BudgetCard