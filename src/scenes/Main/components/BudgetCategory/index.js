import React, { Component } from 'react'
import GridList, { GridListTile } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import style from './budget-category.jss.js'
import BudgetCard from '../BudgetCard';


class BudgetCategory extends Component {

  render() {
    return(
        <div className={style.root}>
          <GridList cellHeight={150} cols={12}>
            <GridListTile key="Subheader" cols={12} style={{ height: 'auto' }}>
              <Subheader component="div">{this.props.categoryName}</Subheader>
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




