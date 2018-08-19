import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import styles from './style.jss.js';

class BudgetSelection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: -1
    }
  }

  componentWillReceiveProps(nextProps) {
    //auto select newly created budget
    if (this.state.selected === -1 && nextProps.selected.id) {
      this.setState({ selected: nextProps.selected.id });
    }
    //clear selection of deleted item
    else if (this.state.selected !== -1 && !nextProps.selected.id) {
      this.setState({ selected: -1 });
    }
  }

  selectionChanged = (id, budget) => {
    this.setState({ selected: id });
    this.props.onChange(budget);
  }

    render() {
        return(
            <List style={styles.listStyle} subheader={<li />}>
              <ListSubheader>Create</ListSubheader>
                <ListItem style={{ backgroundColor: this.state.selected === -1 ? '#eae8e9' : 'inherit' }}
                  onClick={() => this.selectionChanged(-1, 
                    {name: '', allocation: '', txnRequireDesc: false, balance: 1, category: {id: -1, name: ''}})} button>
                  <ListItemText style= {{fontWeight: this.state.selected === -1 ? 900 : 400 }}
                    disableTypography primary="New" />
                </ListItem>

              {this.props.categories.map(category => (
                <li key={`section-${category.categoryName}`} style={styles.section}>
                  <ul style={styles.subheader}>
                    <ListSubheader>{category.categoryName}</ListSubheader>
                    {category.budgets.map(budget => (
                      <ListItem style={{ backgroundColor: this.state.selected === budget.id ? '#eae8e9' : 'inherit' }}
                        onClick={() => this.selectionChanged(budget.id, budget)} 
                        button key={`item-${category.categoryName}-${budget.name}`}>
                        <ListItemText style= {{fontWeight: this.state.selected === budget.id ? 900 : 400 }} 
                        disableTypography primary={budget.name} />
                      </ListItem>
                    ))}
                  </ul>
                </li>
              ))}
            </List>
        )
    }
}
  
  export default BudgetSelection