import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Card, { CardContent } from 'material-ui/Card';
import { GridListTile } from 'material-ui/GridList';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import style from './budget-card.jss.js'
import { showAddTxnModal } from '../../../../../../../../actions/add-txn-modal'


class BudgetCard extends Component {

  showAddTxnDialog = (name, requireDesc, budgetId) => {
    let modalProps = {"name":name, "requireDesc":requireDesc, "budgetId":budgetId}
    this.props.showAddTxnModal(modalProps)
  }

  render() {
      let balance = this.props.balance;
      if (this.props.balance <= 0) {
          balance = "(" + this.props.balance + ")"
      }
    return(
        <GridListTile key={this.props.name} style={style.tile}>
            <Card style={style.card}>
                <CardContent style={style.content}>
                <Typography variant="headline" component="h2">{this.props.name}
                    <div style={{float:'right'}}>
                        <Button variant="fab" color="primary"style={style.addButton} 
                            onClick={() => {this.showAddTxnDialog(this.props.name, this.props.requireDesc, this.props.id)}}>
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
    )
  }
}
const mapStateToProps = (state) => {
    return {
        //showAddTxnModalState : state.showAddTxn
    }
  }
  
function mapDispatchToProps(dispatch) {
return bindActionCreators({
    showAddTxnModal }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(BudgetCard)