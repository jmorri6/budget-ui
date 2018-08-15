import React, { Component } from 'react'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import style from './budget-category.jss.js'
import BudgetCard from '../BudgetCard';


class BudgetCategory extends Component {

  render() {
    return(
        <div className={style.root}>
          <GridList cellHeight={150} cols={12}>
            <GridListTile key="Subheader" cols={12} style={{ height: 'auto' }}>
              <ListSubheader component="div">{this.props.categoryName}</ListSubheader>
            </GridListTile>
            {this.props.budgets && this.props.budgets.map(tile => (
                <BudgetCard key={tile.name} refreshBudgets={this.props.refreshBudgets} {...tile} />
            ))}
          </GridList>
        </div>
    )
  }
}

export default BudgetCategory




