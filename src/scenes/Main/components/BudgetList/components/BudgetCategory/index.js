import React, { Component } from 'react'
import GridList, { GridListTile } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import style from './budget-category.jss.js'
import BudgetCard from './components/BudgetCard';


class BudgetCategory extends Component {

  render() {
      let data = [{"id":1,"name":"internet", "perMonth":100,"spent":80,"balance":20, "requireDesc": false},
        {"id":2,"name":"water", "perMonth":100,"spent":80,"balance": -10, "requireDesc": false },
        {"id":3,"name":"electrictiy", "perMonth":100,"spent":80,"balance":40.01 ,"requireDesc": false},
        {"id":4,"name":"verizon","perMonth":100,"spent":80,"balance":0, "requireDesc": false},
        {"id":5,"name":"abc", "perMonth":100,"spent":80,"balance":20, "requireDesc": false},
        {"id":6,"name":"def", "perMonth":100,"spent":80,"balance":20, "requireDesc": false},
        {"id":7,"name":"ghi", "perMonth":100,"spent":80,"balance":20, "requireDesc": false},
        {"id":8,"name":"jkl", "perMonth":100,"spent":80,"balance":20, "requireDesc": false},
        {"id":9,"name":"mno", "perMonth":100,"spent":80,"balance":20, "requireDesc": true}]
    return(
        <div className={style.root}>
          <GridList cellHeight={150} cols={12}>
            <GridListTile key="Subheader" cols={12} style={{ height: 'auto' }}>
              <Subheader component="div">{this.props.category}</Subheader>
            </GridListTile>
            {data.map(tile => (
                <BudgetCard key={tile.name} {...tile} />
            ))}
          </GridList>
        </div>
    )
  }
}

export default BudgetCategory




