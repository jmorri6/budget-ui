import React, { Component } from 'react'
import Header from '../../components/Header'
import BudgetList from './components/BudgetList'

class Main extends Component {

  render() {
    return(
      <div>
        <Header title="Morris Budget" />
        <BudgetList />
      </div>
    )
  }
}

export default Main
