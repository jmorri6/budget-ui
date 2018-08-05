import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import { getIncomes } from '../../../../actions/income'
import { deleteIncome, toNumericString } from '../../../../services/index';


class IncomeTable extends Component {

    componentDidMount() {
        this.props.getIncomes();
    }

    delete = (id) => {
        let self = this;
        //TODO: show confirmation before deleting
        deleteIncome(id)
        .then(function () {  
            self.props.getIncomes();
        })
        .catch(function (error) {
            //TODO: show notification
        });
    }

  render() {
    return(
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>Source</TableCell>
                <TableCell numeric>Amount</TableCell>
                <TableCell numeric>Frequence per year</TableCell>
                <TableCell numeric>Monthly Deduction</TableCell>
                <TableCell numeric>Monthly Income</TableCell>
                <TableCell>Delete</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {! this.props.incomes && <TableRow></TableRow>}
            {this.props.incomes && this.props.incomes.map(n => {
                return (
                <TableRow key={n.id}>
                    <TableCell>{n.desc}</TableCell>
                    <TableCell numeric>{toNumericString(n.amount)}</TableCell>
                    <TableCell numeric>{n.frequencyPerYr}</TableCell>
                    <TableCell numeric>{toNumericString(n.monthlyDeduction)}</TableCell>
                    <TableCell numeric>{toNumericString((((n.amount * n.frequencyPerYr) / 12) - n.monthlyDeduction))}</TableCell>
                    <TableCell>
                        <IconButton aria-label="Delete" onClick={() => this.delete(n.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
                );
            })}
            </TableBody>
        </Table>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        incomes: state.incomes.allIncomes
    }
}

//TODO: delete income
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getIncomes,
        deleteIncome
    }, dispatch)
  }

export default connect( mapStateToProps, mapDispatchToProps )(IncomeTable)
