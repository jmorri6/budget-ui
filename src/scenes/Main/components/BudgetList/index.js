import React, { Component } from 'react'
import BudgetCategory from './components/BudgetCategory'
import DebitModal from './components/DebitModal'

class BudgetList extends Component {

  render() {
      let data = [{"category":"bills"}]

    return(
      <div> 
        {data.map((data) => (
            <BudgetCategory key={data.category} category={data.category} xs={12} />
        ))}

        <DebitModal />
      </div>
    )
  }
}

export default BudgetList
