import React, { Component } from 'react'
import Header from '../../components/Header'
import BudgetList from './components/BudgetList'
import Income from './components/Income'

class Main extends Component {

  render() {
    return(
      <div>
        <Header title="Morris Budget" />
        <BudgetList />
        <Income />
      </div>
    )
  }
}

export default Main
