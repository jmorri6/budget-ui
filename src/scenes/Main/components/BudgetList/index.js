import React, { Component } from 'react'
import BudgetCategory from '../BudgetCategory'

class BudgetList extends Component {

  render() {
      let data = [{"category":"bills"}]

    return(
      <div> 
        {data.map((data) => (
            <BudgetCategory key={data.category} category={data.category} xs={12} />
        ))}
      </div>
    )
  }
}

export default BudgetList
